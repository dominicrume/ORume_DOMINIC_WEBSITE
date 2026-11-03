import { NextResponse } from 'next/server';
import { isControlAuthed, gatherDashboard } from '@/lib/control';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Fresh dashboard payload for the client to poll/refresh. Gated. */
export async function GET() {
  const { authed } = await isControlAuthed();
  if (!authed) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const data = await gatherDashboard();
  return NextResponse.json(data);
}
