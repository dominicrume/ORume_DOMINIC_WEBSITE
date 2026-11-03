import { NextResponse } from 'next/server';
import { isControlAuthed, patchRecommendation } from '@/lib/control';
import { log } from '@/lib/logger';

export const runtime = 'nodejs';

const ALLOWED = ['proposed', 'approved', 'rejected', 'running', 'done'];

/** Approve or reject a recommendation. The brain proposes; the human disposes. */
export async function POST(req: Request) {
  const { authed } = await isControlAuthed();
  if (!authed) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let id = '';
  let status = '';
  try {
    const body = (await req.json()) as { id?: unknown; status?: unknown };
    id = typeof body.id === 'string' ? body.id : '';
    status = typeof body.status === 'string' ? body.status : '';
  } catch {
    return NextResponse.json({ ok: false, reason: 'bad_body' }, { status: 400 });
  }
  if (!id || !ALLOWED.includes(status)) {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  }

  const ok = await patchRecommendation(id, status);
  log.info('control: recommendation status change', { route: '/api/control/recommendations', id, status, ok });
  await log.flush();
  return NextResponse.json({ ok });
}
