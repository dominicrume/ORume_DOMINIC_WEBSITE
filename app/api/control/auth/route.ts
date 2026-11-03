import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

/** Set the Control Center cookie when the password matches CONTROL_SECRET. */
export async function POST(req: Request) {
  const expected = process.env.CONTROL_SECRET;
  if (!expected) {
    return NextResponse.json({ ok: false, reason: 'no_secret_set' }, { status: 400 });
  }
  let secret = '';
  try {
    const body = (await req.json()) as { secret?: unknown };
    secret = typeof body.secret === 'string' ? body.secret : '';
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (secret !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const store = await cookies();
  store.set('cc', expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return NextResponse.json({ ok: true });
}
