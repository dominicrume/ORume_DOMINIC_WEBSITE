import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { saveLead } from '@/lib/supabase';
import { addContact } from '@/lib/brevo';
import { sendLeadNotification, sendContactAck } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    const isHoneypot = Boolean(flat.fieldErrors.company_website);
    return NextResponse.json(
      { error: isHoneypot ? 'Rejected.' : 'Please check the form and try again.' },
      { status: 400 },
    );
  }

  const { name, email, org, budget, goal } = parsed.data;

  // 1) Authoritative store: Supabase. A real provider error blocks success so the
  //    user can retry; "not configured" is tolerated (site works pre-setup).
  const stored = await saveLead({
    type: 'contact',
    name,
    email,
    org,
    budget,
    goal,
    source: 'rumedominic.com/contact',
  });
  if (!stored.ok && stored.reason === 'provider_error') {
    return NextResponse.json(
      { error: 'We couldn’t save your message right now. Please retry or email directly.' },
      { status: 502 },
    );
  }

  // 2) Best-effort email/CRM sync to Brevo. Never blocks the response.
  await addContact({
    email,
    listId: Number(process.env.BREVO_CONTACT_LIST_ID) || undefined,
    attributes: {
      FIRSTNAME: name,
      COMPANY: org,
      BUDGET: budget,
      GOAL: goal.slice(0, 500),
      SOURCE: 'rumedominic.com/contact',
    },
  }).catch(() => undefined);

  // 3) Notify Rume immediately so no lead sits unseen, and acknowledge the lead
  //    so they know it landed. Both best-effort; neither blocks the response.
  await Promise.allSettled([
    sendLeadNotification({ kind: 'contact', email, name, org, budget, goal }),
    sendContactAck(name, email),
  ]);

  return NextResponse.json({ ok: true }, { status: 200 });
}
