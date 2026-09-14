import { NextResponse } from 'next/server';
import { waitlistSchema } from '@/lib/validation';
import { saveLead } from '@/lib/supabase';
import { GATED_DOCS, issueToken } from '@/lib/download-token';
import { sendGatedDownloadEmail } from '@/lib/email';
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

  // 3) If they asked for a document, hand back a signed, expiring link and email
  //    the same link. The on-screen copy is convenient; the email is the copy of
  //    record, because closing the tab should not cost someone the thing they
  //    just gave us a phone number for.
  let download: string | undefined;
  let emailed = false;
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

    if (download) {
      const absolute = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://rumedominic.com'}${download}`;
      // Never let a mail failure cost the response: the visitor already has the
      // link on screen, and the lead is stored either way.
      const sent = await sendGatedDownloadEmail(email, first_name, GATED_DOCS[doc].label, absolute)
        .catch((err: unknown) => ({ ok: false as const, reason: String(err) }));
      emailed = sent.ok;
      if (!sent.ok) {
        log.warn('gated download email not sent', {
          route: '/api/waitlist',
          email,
          doc,
          reason: 'reason' in sent ? String(sent.reason) : 'unknown',
        });
      }
    }
  }

  log.info('kya lead captured', {
    route: '/api/waitlist',
    email,
    doc,
    has_phone: Boolean(phone),
    emailed,
  });
  await log.flush();
  // `emailed` lets the form tell the truth: "check your inbox" when we sent it,
  // "save this link" when we could not.
  return NextResponse.json({ success: true, download, emailed }, { status: 200 });
}
