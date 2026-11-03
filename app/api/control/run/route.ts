import { NextResponse } from 'next/server';
import { isControlAuthed } from '@/lib/control';
import { runWeekly } from '@/growth-brain/src/pipeline';
import { log } from '@/lib/logger';

export const runtime = 'nodejs';
export const maxDuration = 60;

/** Run the Growth Brain on demand (so the founder can see a brief right now). Gated. */
export async function POST() {
  const { authed } = await isControlAuthed();
  if (!authed) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (process.env.BRAIN_ENABLED === 'false') {
    return NextResponse.json({ ok: false, reason: 'disabled' }, { status: 200 });
  }
  try {
    const r = await runWeekly();
    log.info('control: manual brain run', {
      route: '/api/control/run',
      ok: r.ok,
      recommendations: r.recommendations.length,
      period: r.periodLabel,
    });
    await log.flush();
    return NextResponse.json({
      ok: r.ok,
      reason: r.reason,
      period: r.periodLabel,
      recommendations: r.recommendations.length,
      brief: r.brief,
    });
  } catch (err) {
    log.error('control: manual brain run threw', {
      route: '/api/control/run',
      reason: err instanceof Error ? err.message : String(err),
    });
    await log.flush();
    return NextResponse.json({ ok: false, reason: 'run_failed' }, { status: 500 });
  }
}
