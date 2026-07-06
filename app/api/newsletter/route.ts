import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validation';
import { saveLead } from '@/lib/supabase';
import { addContact } from '@/lib/brevo';
import { sendWelcomeEmail, sendLeadNotification } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
  }

  const { email } = parsed.data;

  const stored = await saveLead({
    type: 'newsletter',
    email,
    source: 'rumedominic.com/newsletter',
  });
  if (!stored.ok && stored.reason === 'provider_error') {
    return NextResponse.json({ error: 'Please try again in a moment.' }, { status: 502 });
  }

  await addContact({
    email,
    listId: Number(process.env.BREVO_NEWSLETTER_LIST_ID) || undefined,
    attributes: { SOURCE: 'rumedominic.com/newsletter' },
  }).catch(() => undefined);

  // Fire the welcome email with the free book + course steps. Best-effort:
  // delivery already happens on /access, so a mail hiccup never blocks signup.
  await sendWelcomeEmail(email).catch(() => undefined);

  // Notify Rume of the new signup. Best-effort.
  await sendLeadNotification({ kind: 'newsletter', email }).catch(() => undefined);

  return NextResponse.json({ ok: true }, { status: 200 });
}
