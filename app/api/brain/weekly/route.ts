import { NextResponse } from 'next/server';
import { runWeekly } from '@/growth-brain/src/pipeline';
import { log } from '@/lib/logger';

// The brain reads Supabase (service role) and calls Claude; give it room to run.
export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Weekly Growth Brain run. Called by a Vercel Cron (or manually with the secret).
 * Guarded by BRAIN_WEEKLY_SECRET and the BRAIN_ENABLED kill switch. It only computes
 * and proposes; it never sends, spends, or publishes. Approval stays human.
 */
export async function GET(req: Request) {
  if (process.env.BRAIN_ENABLED === 'false') {
    return NextResponse.json({ ok: false, reason: 'disabled' }, { status: 200 });
  }

  const secret = process.env.BRAIN_WEEKLY_SECRET;
  const provided =
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ??
    new URL(req.url).searchParams.get('key');
  if (!secret || provided !== secret) {
    log.warn('brain weekly run rejected: bad or missing secret', { route: '/api/brain/weekly' });
    await log.flush();
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // runWeekly calls Supabase and Claude. Either can fail, and an unguarded throw
  // here surfaces as an opaque 500 to a cron that will simply try again next week
  // with no record of what broke.
  let result: Awaited<ReturnType<typeof runWeekly>>;
  try {
    result = await runWeekly();
  } catch (err) {
    log.error('brain weekly run threw', {
      route: '/api/brain/weekly',
      reason: err instanceof Error ? err.message : String(err),
    });
    await log.flush();
    return NextResponse.json(
      { ok: false, reason: 'run_failed' },
      { status: 500 },
    );
  }

  log.info('brain weekly run finished', {
    route: '/api/brain/weekly',
    ok: result.ok,
    reason: result.reason,
    period: result.periodLabel,
    recommendations: result.recommendations.length,
  });
  await log.flush();
  // Return the brief so a manual run shows it immediately; it is also archived in Supabase.
  return NextResponse.json(
    {
      ok: result.ok,
      reason: result.reason,
      period: result.periodLabel,
      recommendations: result.recommendations.length,
      kpis: result.kpis,
      brief: result.brief,
    },
    { status: 200 },
  );
}
