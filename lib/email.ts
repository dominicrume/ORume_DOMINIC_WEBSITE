/**
 * Transactional email via Brevo (server-side only). Every email is wrapped in a
 * single branded shell (logo header + corporate footer) so the whole system
 * looks like one enterprise brand. Never throws — returns a typed result.
 *
 * Sender MUST be a verified Brevo sender or the send fails. Default is
 * dominicrume@gmail.com; set BREVO_SENDER_EMAIL to swap to hello@rumedominic.com
 * once its domain is authenticated in Brevo.
 */

export type EmailResult = { ok: true } | { ok: false; reason: 'not_configured' | 'provider_error' };

const SITE = 'https://rumedominic.com';
const LOGO = `${SITE}/rume-logo.png`;
const BOOK_URL = `${SITE}/from-code-to-consciousness.pdf`;
const FRAMEWORK_URL = `${SITE}/kya-framework.pdf`;
const COURSE_URL =
  process.env.NEXT_PUBLIC_COURSE_URL || 'https://vorem.co/courses/master-ai-in-9-days';

/** Shared, brand-consistent email frame: logo header + corporate footer. */
function emailShell(inner: string, preheader = ''): string {
  const year = new Date().getFullYear();
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"></head>
<body style="margin:0;padding:0;background:#eef1f7;font-family:'Segoe UI',Arial,Helvetica,sans-serif;color:#0A0E1A;-webkit-font-smoothing:antialiased">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${preheader}</div>` : ''}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f7"><tr><td align="center" style="padding:26px 12px">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 44px -18px rgba(13,27,53,.28)">
      <tr><td align="center" style="background:#0A0E1A;padding:24px 24px 20px">
        <img src="${LOGO}" width="170" height="31" alt="Rume Dominic" style="display:block;height:auto;border:0;outline:none;text-decoration:none;max-width:180px" />
        <div style="height:3px;width:66px;margin:14px auto 0;background:linear-gradient(90deg,#1E90FF,#D8EAF6);border-radius:2px"></div>
      </td></tr>
      <tr><td style="padding:30px 32px 10px">${inner}</td></tr>
      <tr><td style="background:#0A0E1A;padding:24px 32px 26px">
        <div style="color:#F8FAFC;font-weight:800;font-size:15px;letter-spacing:.3px">RUME DOMINIC</div>
        <div style="color:#9AA5B8;font-size:12px;margin-top:3px">AI Engineer &middot; Blockchain Architect &middot; Founder of VOREM</div>
        <div style="font-size:12px;margin-top:12px">
          <a href="https://x.com/dominicrume" style="color:#D8EAF6;text-decoration:none;font-weight:700">X</a>
          <span style="color:#3a4358">&nbsp; &middot; &nbsp;</span>
          <a href="https://www.linkedin.com/in/dominicrume/" style="color:#D8EAF6;text-decoration:none;font-weight:700">LinkedIn</a>
          <span style="color:#3a4358">&nbsp; &middot; &nbsp;</span>
          <a href="https://medium.com/@dominicrume" style="color:#D8EAF6;text-decoration:none;font-weight:700">Medium</a>
          <span style="color:#3a4358">&nbsp; &middot; &nbsp;</span>
          <a href="https://www.youtube.com/@rumedominic" style="color:#D8EAF6;text-decoration:none;font-weight:700">YouTube</a>
        </div>
        <div style="font-size:11px;color:#6b7688;margin-top:16px;line-height:1.7;border-top:1px solid #1c2540;padding-top:14px">
          Based in the UK, operating globally. You are receiving this because you connected with Rume Dominic at <a href="${SITE}" style="color:#9AA5B8">rumedominic.com</a>.<br />
          &copy; ${year} Rume Dominic &middot; VOREM. All rights reserved.
        </div>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

const btnPrimary =
  'display:inline-block;background:#1D4ED8;color:#ffffff;font-weight:800;text-decoration:none;padding:13px 26px;border-radius:12px;font-size:14px';
const btnLight =
  'display:inline-block;background:#0A0E1A;color:#ffffff;font-weight:800;text-decoration:none;padding:12px 22px;border-radius:10px;font-size:14px';

async function send(payload: Record<string, unknown>): Promise<EmailResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return { ok: false, reason: 'not_configured' };
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok ? { ok: true } : { ok: false, reason: 'provider_error' };
  } catch {
    return { ok: false, reason: 'provider_error' };
  }
}

function fromSender() {
  return { name: 'Rume Dominic', email: process.env.BREVO_SENDER_EMAIL || 'dominicrume@gmail.com' };
}

export async function sendWelcomeEmail(to: string): Promise<EmailResult> {
  const inner = `
    <h1 style="font-size:23px;font-weight:800;margin:0 0 6px;color:#0A0E1A">You’re in. Here’s your access.</h1>
    <p style="font-size:15px;line-height:1.7;margin:0 0 20px;color:#33405a">Welcome, and thank you for joining. Your free AI book and course are ready right now.</p>
    <div style="border:1px solid #e3e8f0;border-radius:14px;padding:18px 20px;margin:0 0 14px">
      <div style="font-size:11px;font-weight:800;color:#1D4ED8;text-transform:uppercase;letter-spacing:.6px">Free book</div>
      <div style="font-size:17px;font-weight:800;margin:4px 0 10px">From Code to Consciousness</div>
      <a href="${BOOK_URL}" style="${btnLight}">Download the book (PDF)</a>
    </div>
    <div style="border:1px solid #e3e8f0;border-radius:14px;padding:18px 20px;margin:0 0 20px">
      <div style="font-size:11px;font-weight:800;color:#1D4ED8;text-transform:uppercase;letter-spacing:.6px">Free course</div>
      <div style="font-size:17px;font-weight:800;margin:4px 0 8px">Master AI in 9 Days</div>
      <p style="font-size:14px;line-height:1.6;margin:0 0 10px;color:#33405a">The course lives inside Vorem. It takes about a minute to set up:</p>
      <ol style="font-size:14px;line-height:1.7;margin:0 0 14px;padding-left:18px;color:#33405a">
        <li>Register and log in at <a href="https://vorem.co" style="color:#1D4ED8">vorem.co</a> with your email.</li>
        <li>Confirm your account from the email Vorem sends you. If you don’t see it, check your spam or junk folder for the confirmation code.</li>
        <li>Once confirmed, open Explore Courses, then Free Courses, and start “Master AI in 9 Days”.</li>
      </ol>
      <a href="${COURSE_URL}" style="${btnPrimary}">Go to the course</a>
    </div>
    <p style="font-size:14px;line-height:1.6;margin:0 0 16px;color:#33405a">Want to go further, faster? Reply to this email or book a strategy call at <a href="${SITE}/#contact" style="color:#1D4ED8">rumedominic.com</a>.</p>
    <div style="background:#f0f4ff;border:1px solid #c5d3f5;border-radius:12px;padding:14px 16px;margin:0 0 6px">
      <p style="font-size:14px;line-height:1.6;margin:0;color:#1a2a4a"><strong>Know someone who needs this?</strong> Forward this email, or send them to <a href="${SITE}/master-ai" style="color:#1D4ED8;font-weight:700">rumedominic.com/master-ai</a>. The best way to learn AI is to learn it with a friend.</p>
    </div>`;
  return send({
    sender: fromSender(),
    to: [{ email: to }],
    subject: 'Your free AI book and Master AI in 9 Days course',
    htmlContent: emailShell(inner, 'Your free AI book and course are ready right now.'),
  });
}

/** Delivers the free "Know Your AgenticAi" framework PDF to a lead-magnet signup. */
export async function sendFrameworkEmail(to: string, name = ''): Promise<EmailResult> {
  const first = (name || '').trim().split(' ')[0] || 'there';
  const inner = `
    <h1 style="font-size:23px;font-weight:800;margin:0 0 6px;color:#0A0E1A">Here it is, ${first}.</h1>
    <p style="font-size:15px;line-height:1.7;margin:0 0 20px;color:#33405a">Your free field guide is ready. It is the fastest way to find out whether the AI agents in your business are provable, auditable and accountable, before a regulator, a client or a court asks you to prove it.</p>
    <div style="border:1px solid #e3e8f0;border-radius:14px;padding:18px 20px;margin:0 0 20px">
      <div style="font-size:11px;font-weight:800;color:#1D4ED8;text-transform:uppercase;letter-spacing:.6px">Free field guide</div>
      <div style="font-size:17px;font-weight:800;margin:4px 0 10px">Know Your AgenticAi: the 5 questions</div>
      <a href="${FRAMEWORK_URL}" style="${btnPrimary}">Download the guide (PDF)</a>
    </div>
    <p style="font-size:14px;line-height:1.7;margin:0 0 8px;color:#33405a">Inside you will find the three-part standard, the five questions every leader must answer before letting an agent act, and a 60-second scorecard to test your own exposure.</p>
    <p style="font-size:14px;line-height:1.7;margin:0 0 16px;color:#33405a">When you are ready to turn the checklist into certainty, the KYA Audit assesses one of your agents against the full standard. Reply to this email or book a call at <a href="${SITE}/#work" style="color:#1D4ED8">rumedominic.com</a>.</p>
    <div style="background:#f0f4ff;border:1px solid #c5d3f5;border-radius:12px;padding:14px 16px;margin:0 0 6px">
      <p style="font-size:14px;line-height:1.6;margin:0;color:#1a2a4a"><strong>Know someone deploying AI agents?</strong> Forward this to them. The best way to ship AI you can prove is to make the whole team think this way.</p>
    </div>`;
  return send({
    sender: fromSender(),
    to: [{ email: to }],
    subject: 'Your Know Your AgenticAi framework (PDF inside)',
    htmlContent: emailShell(inner, 'Your free field guide is ready to download.'),
  });
}

/** Acknowledgement to a contact-form lead. */
export async function sendContactAck(name: string, to: string): Promise<EmailResult> {
  const first = (name || '').trim().split(' ')[0] || 'there';
  const inner = `
    <h1 style="font-size:23px;font-weight:800;margin:0 0 6px;color:#0A0E1A">Thanks, ${first}. Your message is in.</h1>
    <p style="font-size:15px;line-height:1.7;margin:0 0 16px;color:#33405a">I read every message personally and I’ll reply within 1 to 2 business days with clear next steps for your AI or Web3 goal.</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 18px;color:#33405a">If it’s time-sensitive, you can grab a slot on my calendar now:</p>
    <div style="margin:0 0 20px"><a href="${SITE}/#contact" style="${btnPrimary}">Book a strategy call</a></div>
    <p style="font-size:14px;line-height:1.7;margin:0;color:#33405a">While you wait, see recent work and media on <a href="${SITE}" style="color:#1D4ED8">rumedominic.com</a>.</p>`;
  return send({
    sender: fromSender(),
    to: [{ email: to }],
    subject: 'Thanks, I’ve got your message',
    htmlContent: emailShell(inner, 'I’ll reply within 1 to 2 business days.'),
  });
}

export type LeadNotice = {
  kind: 'contact' | 'newsletter' | 'framework';
  email: string;
  name?: string;
  org?: string;
  budget?: string;
  goal?: string;
};

/** Notifies Rume the instant a lead comes in. Sends to BREVO_NOTIFY_EMAIL. */
export async function sendLeadNotification(lead: LeadNotice): Promise<EmailResult> {
  const notify = process.env.BREVO_NOTIFY_EMAIL || 'dominicrume@gmail.com';
  const rows = (
    [
      [
        'Type',
        lead.kind === 'contact'
          ? 'Strategy-call / contact form'
          : lead.kind === 'framework'
            ? 'Lead magnet / KYA framework download'
            : 'Newsletter / funnel signup',
      ],
      ['Email', lead.email],
      lead.name ? ['Name', lead.name] : null,
      lead.org ? ['Organisation', lead.org] : null,
      lead.budget ? ['Budget', lead.budget] : null,
      lead.goal ? ['Goal', lead.goal] : null,
    ].filter(Boolean) as string[][]
  )
    .map(
      (r) =>
        `<tr><td style="padding:8px 14px;color:#6b7688;font-weight:700;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eef1f7">${r[0]}</td><td style="padding:8px 14px;color:#0A0E1A;border-bottom:1px solid #eef1f7">${r[1]}</td></tr>`,
    )
    .join('');
  const inner = `
    <h1 style="font-size:22px;font-weight:800;margin:0 0 14px;color:#0A0E1A">New lead just came in</h1>
    <table role="presentation" style="width:100%;border-collapse:collapse;background:#fbfcfe;border-radius:12px;overflow:hidden;border:1px solid #e3e8f0">${rows}</table>
    <p style="font-size:13px;color:#6b7688;margin:16px 0 0;line-height:1.6">Just hit reply to reach <a href="mailto:${lead.email}" style="color:#1D4ED8">${lead.email}</a>. This lead is also saved in Supabase and Brevo.</p>`;
  return send({
    sender: fromSender(),
    to: [{ email: notify }],
    replyTo: { email: lead.email, name: lead.name || lead.email },
    subject: `New ${lead.kind} lead: ${lead.name || lead.email}`,
    htmlContent: emailShell(inner, `New ${lead.kind} lead from ${lead.name || lead.email}`),
  });
}
