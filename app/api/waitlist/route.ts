import { NextResponse } from 'next/server';
import { waitlistSchema } from '@/lib/validation';
import { saveLead } from '@/lib/supabase';
import { log } from '@/lib/logger';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    const isHoneypot = Boolean(parsed.error.flatten().fieldErrors.company_website);
    return NextResponse.json(
      { error: isHoneypot ? 'Rejected.' : 'Please check the form and try again.' },
      { status: 400 },
    );
  }

  const { first_name, email } = parsed.data;

  // 1) Authoritative store: Supabase, same tolerance rules as the other lead
  //    routes — a real provider error blocks success, "not configured" doesn't.
  const stored = await saveLead({
    type: 'newsletter',
    email,
    name: first_name,
    source: 'rumedominic.com/kya-waitlist',
  });
  if (!stored.ok && stored.reason === 'provider_error') {
    log.error('kya waitlist signup failed to store', { route: '/api/waitlist', email });
    return NextResponse.json({ error: 'Please try again in a moment.' }, { status: 502 });
  }

  // 2) Best-effort automation webhook (Make.com etc.). Never blocks the response.
  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        first_name,
        email,
        source: 'kya_waitlist',
        timestamp: new Date().toISOString(),
      }),
    }).catch((err: unknown) =>
      log.warn('waitlist webhook failed', { route: '/api/waitlist', email, reason: String(err) }),
    );
  }

  log.info('kya waitlist signup captured', { route: '/api/waitlist', email });
  await log.flush();
  return NextResponse.json({ success: true }, { status: 200 });
}
