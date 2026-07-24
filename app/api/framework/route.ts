import { NextResponse } from 'next/server';
import { frameworkSchema } from '@/lib/validation';
import { saveLead } from '@/lib/supabase';
import { addContact } from '@/lib/brevo';
import { upsertHubspotContact } from '@/lib/hubspot';
import { sendFrameworkEmail, sendLeadNotification } from '@/lib/email';
import { log } from '@/lib/logger';

export const runtime = 'nodejs';

const SOURCE = 'rumedominic.com/framework';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = frameworkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
  }

  const { email, name } = parsed.data;

  // 1) Authoritative store. Keep the known-good 'newsletter' type; the source
  //    field is what marks this as a lead-magnet capture in the data.
  const stored = await saveLead({
    type: 'newsletter',
    email,
    name,
    source: SOURCE,
  });
  if (!stored.ok && stored.reason === 'provider_error') {
    log.error('framework lead failed to store', { route: '/api/framework', email });
    return NextResponse.json({ error: 'Please try again in a moment.' }, { status: 502 });
  }

  // 2) Best-effort CRM + list sync. None of these block delivery.
  const synced = await Promise.allSettled([
    addContact({
      email,
      listId: Number(process.env.BREVO_NEWSLETTER_LIST_ID) || undefined,
      attributes: { FIRSTNAME: name, SOURCE, LEAD_MAGNET: 'KYA Framework' },
    }),
    upsertHubspotContact({ email, firstName: name, source: SOURCE, lifecycleStage: 'subscriber' }),
    sendFrameworkEmail(email, name),
    sendLeadNotification({ kind: 'framework', email, name }),
  ]);
  const steps = ['brevo', 'hubspot', 'framework_email', 'lead_notification'];
  synced.forEach((r, i) => {
    if (r.status === 'rejected') {
      log.warn('framework sync step failed', {
        route: '/api/framework',
        email,
        step: steps[i],
        reason: String(r.reason),
      });
    }
  });

  log.info('framework lead captured', { route: '/api/framework', email });
  await log.flush();
  return NextResponse.json({ ok: true }, { status: 200 });
}
