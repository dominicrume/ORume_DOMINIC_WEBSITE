import { NextResponse } from 'next/server';
import { waitlistSchema } from '@/lib/validation';
import { saveLead } from '@/lib/supabase';
import { issueToken } from '@/lib/download-token';
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
    const flat = parsed.error.flatten();
    const isHoneypot = Boolean(flat.fieldErrors.company_website);
    return NextResponse.json(
      {
        error: isHoneypot ? 'Rejected.' : 'Please check the form and try again.',
        // Field errors let the form mark the offending input instead of showing
        // one generic message for three different mistakes.
        fields: isHoneypot ? undefined : flat.fieldErrors,
      },
      { status: 400 },
    );
  }

  const { first_name, email, phone, doc } = parsed.data;

  // 1) Authoritative store: Supabase, same tolerance rules as the other lead
  //    routes — a real provider error blocks success, "not configured" doesn't.
  const stored = await saveLead({
    type: 'newsletter',
    email,
    name: first_name,
    phone,
    source: doc ? `rumedominic.com/kya-download/${doc}` : 'rumedominic.com/kya-waitlist',
  });
  if (!stored.ok && stored.reason === 'provider_error') {
    log.error('kya lead failed to store', { route: '/api/waitlist', email, doc });
    return NextResponse.json({ error: 'Please try again in a moment.' }, { status: 502 });
  }

  // 2) Best-effort automation webhook (Make.com etc.). Never blocks the response,
  //    and always carries the phone number even if the leads table has no column.
  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        first_name,
        email,
        phone,
        source: doc ? `kya_download_${doc}` : 'kya_waitlist',
        timestamp: new Date().toISOString(),
      }),
    }).catch((err: unknown) =>
      log.warn('waitlist webhook failed', { route: '/api/waitlist', email, reason: String(err) }),
    );
  }

  // 3) If they asked for a document, hand back a signed, expiring link. The file
  //    is not on a public URL, so this is the only way to reach it.
  let download: string | undefined;
  if (doc) {
    try {
      download = `/api/download?t=${encodeURIComponent(issueToken(email, doc))}`;
    } catch (err) {
      // No signing secret configured: the lead is captured, but we cannot
      // issue a link. Say so rather than returning a URL that will 500.
      log.error('download token could not be issued', {
        route: '/api/waitlist',
        doc,
        reason: String(err),
      });
    }
  }

  log.info('kya lead captured', { route: '/api/waitlist', email, doc, has_phone: Boolean(phone) });
  await log.flush();
  return NextResponse.json({ success: true, download }, { status: 200 });
}
