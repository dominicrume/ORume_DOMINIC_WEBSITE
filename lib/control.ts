/**
 * Control Center server layer. One place that gathers everything the founder
 * needs to see: system health, the Growth Brain's data, and the recommendations
 * awaiting approval. Server-only: it uses the Supabase service key and must never
 * reach the client. The page renders from this; the client gets plain data.
 */
import 'server-only';
import { cookies } from 'next/headers';
import { computeKpis } from '@/growth-brain/src/metrics';
import type { BrainEvent } from '@/growth-brain/src/events';
import { site } from '@/content/site';
import { books } from '@/content/books';
import type { HealthPanel, ConfigPresence, RecRow, Dashboard, MoneyDoor } from './control-types';
export type { HealthPanel, ConfigPresence, RecRow, Dashboard, MoneyDoor } from './control-types';

// ---- Auth (single-admin cookie gate) ----------------------------------------

/**
 * The Control Center is gated by CONTROL_SECRET. When it is unset the page still
 * renders (so it can be seen on a fresh deploy) but flags itself as UNPROTECTED.
 */
export async function isControlAuthed(): Promise<{ authed: boolean; isProtected: boolean }> {
  const secret = process.env.CONTROL_SECRET;
  if (!secret) {
    // In production, never expose the dashboard without a password. Lock it and
    // show the gate, so a live deploy without CONTROL_SECRET leaks nothing. In
    // development it stays open (with the unprotected banner) for convenience.
    if (process.env.NODE_ENV === 'production') return { authed: false, isProtected: true };
    return { authed: true, isProtected: false };
  }
  const store = await cookies();
  return { authed: store.get('cc')?.value === secret, isProtected: true };
}

// ---- Supabase (read/patch with the service key) -----------------------------

function adminSupabase(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

async function sbGet<T>(path: string): Promise<T | null> {
  const a = adminSupabase();
  if (!a) return null;
  try {
    const res = await fetch(`${a.url}/rest/v1/${path}`, {
      headers: { apikey: a.key, authorization: `Bearer ${a.key}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function patchRecommendation(id: string, status: string): Promise<boolean> {
  const a = adminSupabase();
  if (!a) return false;
  try {
    const res = await fetch(`${a.url}/rest/v1/recommendations?id=eq.${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: {
        apikey: a.key,
        authorization: `Bearer ${a.key}`,
        'content-type': 'application/json',
        prefer: 'return=minimal',
      },
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ---- Health (public sources, no secrets) ------------------------------------

async function pypiVersion(): Promise<string | null> {
  try {
    const res = await fetch('https://pypi.org/pypi/ai-code-quality-auditor/json', {
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    const j = (await res.json()) as { info?: { version?: string } };
    return j.info?.version ?? null;
  } catch {
    return null;
  }
}

async function github(): Promise<{ openPRs: number | null; lastCommit: HealthPanel['lastCommit'] }> {
  const repo = 'dominicrume/ORume_DOMINIC_WEBSITE';
  const headers = { accept: 'application/vnd.github+json' };
  try {
    const [prs, commits] = await Promise.all([
      fetch(`https://api.github.com/repos/${repo}/pulls?state=open&per_page=100`, {
        headers,
        next: { revalidate: 600 },
      }),
      fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, {
        headers,
        next: { revalidate: 600 },
      }),
    ]);
    const openPRs = prs.ok ? ((await prs.json()) as unknown[]).length : null;
    let lastCommit: HealthPanel['lastCommit'] = null;
    if (commits.ok) {
      const arr = (await commits.json()) as Array<{
        sha: string;
        commit: { message: string; author: { date: string } };
      }>;
      if (arr[0]) {
        lastCommit = {
          sha: arr[0].sha.slice(0, 7),
          message: arr[0].commit.message.split('\n')[0].slice(0, 80),
          date: arr[0].commit.author.date,
        };
      }
    }
    return { openPRs, lastCommit };
  } catch {
    return { openPRs: null, lastCommit: null };
  }
}

// ---- Config presence (booleans only, never values) --------------------------

function configPresence(): ConfigPresence {
  const has = (k: string) => Boolean(process.env[k] && String(process.env[k]).length > 0);
  return [
    { key: 'SUPABASE_URL', label: 'Supabase project URL', present: has('SUPABASE_URL') },
    { key: 'SUPABASE_KEY', label: 'Supabase publishable key (event capture)', present: has('SUPABASE_KEY') },
    {
      key: 'SUPABASE_SECRET_KEY',
      label: 'Supabase secret/service key (the brain reads)',
      present: has('SUPABASE_SECRET_KEY') || has('SUPABASE_SERVICE_ROLE_KEY'),
    },
    { key: 'ANTHROPIC_API_KEY', label: 'Anthropic API key (the brain thinks)', present: has('ANTHROPIC_API_KEY') },
    { key: 'BRAIN_WEEKLY_SECRET', label: 'Weekly run secret (cron auth)', present: has('BRAIN_WEEKLY_SECRET') },
    {
      key: 'BRAIN_ENABLED',
      label: 'Brain switched on (not "false")',
      present: process.env.BRAIN_ENABLED !== 'false',
    },
    { key: 'CONTROL_SECRET', label: 'Control Center password set', present: has('CONTROL_SECRET') },
  ];
}

// ---- Money doors (is there anywhere a visitor can actually pay?) ------------

/**
 * A real external checkout or booking link: https with a path beyond the bare
 * domain. "https://calendly.com" on its own is a placeholder, not a booking page,
 * so it does not count as live.
 */
function isRealDestination(url: string | undefined | null): boolean {
  if (!url) return false;
  try {
    const u = new URL(url.trim());
    if (u.protocol !== 'https:') return false;
    return u.pathname.replace(/\/+$/, '').length > 0 || u.search.length > 0;
  } catch {
    return false;
  }
}

/**
 * Check every path where money can actually change hands. This is the guard that
 * stops a dead checkout sitting silent while traffic arrives and nobody buys.
 */
function checkMoneyDoors(): MoneyDoor[] {
  const doors: MoneyDoor[] = [];

  // 1. The homepage's loudest button. It earns nothing if it points at GitHub,
  //    a repo or any page that does not ask for the sale.
  const primary = site.cta.primary;
  const primaryIsSales = ['#contact', '#work', '/assurance'].includes(primary.href);
  doors.push({
    id: 'hero_primary',
    label: 'Homepage main button asks for the sale',
    target: `${primary.label} → ${primary.href}`,
    live: primaryIsSales,
    reason: primaryIsSales
      ? `Sends visitors to ${primary.href}, where they can book or buy.`
      : `Points at ${primary.href}, which sells nothing. Point it at #contact, #work or /assurance.`,
  });

  // 2. Buy a book: the fastest working checkout, because Amazon takes the money.
  const liveBooks = books.filter((b) => isRealDestination(b.href));
  doors.push({
    id: 'books',
    label: 'Buy a book (Amazon checkout)',
    target: `${liveBooks.length} of ${books.length} books linked`,
    live: liveBooks.length > 0,
    reason:
      liveBooks.length > 0
        ? `${liveBooks.length} books link straight to a live Amazon listing.`
        : 'No book has a working buy link. Add the Amazon link to each book in content/books.ts.',
  });

  // 3. Book a strategy call: the Zoho booking page behind the contact section.
  const bookingLive = isRealDestination(site.bookingUrl);
  doors.push({
    id: 'booking',
    label: 'Book a strategy call',
    target: site.bookingUrl || '(unset)',
    live: bookingLive,
    reason: bookingLive
      ? 'Booking page is a real https scheduling link.'
      : 'Booking link is unset or a bare domain. Set NEXT_PUBLIC_BOOKING_URL to your real scheduling page.',
  });

  // 4. The KYA Method Stack checkout: Paystack. Dead if the URL is unset, in
  //    which case the buy button silently becomes a waitlist and charges nobody.
  const paystack = process.env.NEXT_PUBLIC_PAYSTACK_URL;
  const paystackLive = isRealDestination(paystack);
  doors.push({
    id: 'kya_checkout',
    label: 'KYA Method Stack checkout (Paystack)',
    target: paystackLive ? 'Paystack payment page' : '(falls back to waitlist)',
    live: paystackLive,
    reason: paystackLive
      ? 'Paystack payment page is set, so the buy button takes real payment.'
      : 'No Paystack URL, so the buy button only joins the waitlist. Create a Paystack payment page and set NEXT_PUBLIC_PAYSTACK_URL in Vercel.',
  });

  return doors;
}

// ---- The dashboard payload --------------------------------------------------

export async function gatherDashboard(): Promise<Dashboard> {
  const now = new Date();
  const since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const periodLabel = `${since.toISOString().slice(0, 10)} to ${now.toISOString().slice(0, 10)}`;
  const dataConfigured = Boolean(adminSupabase());

  const [events, recs, briefs, auditorVersion, gh] = await Promise.all([
    sbGet<BrainEvent[]>(
      `events?created_at=gte.${encodeURIComponent(since.toISOString())}&order=created_at.asc&limit=50000`,
    ),
    sbGet<RecRow[]>('recommendations?order=created_at.desc&limit=50'),
    sbGet<Array<{ markdown: string }>>('briefs?order=created_at.desc&limit=1'),
    pypiVersion(),
    github(),
  ]);

  return {
    generatedAt: now.toISOString(),
    dataConfigured,
    periodLabel: dataConfigured ? periodLabel : null,
    kpis: events ? computeKpis(events) : null,
    recommendations: recs ?? [],
    latestBrief: briefs?.[0]?.markdown ?? null,
    health: { auditorVersion, openPRs: gh.openPRs, lastCommit: gh.lastCommit },
    config: configPresence(),
    moneyDoors: checkMoneyDoors(),
  };
}
