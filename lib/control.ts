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
import type { HealthPanel, ConfigPresence, RecRow, Dashboard } from './control-types';
export type { HealthPanel, ConfigPresence, RecRow, Dashboard } from './control-types';

// ---- Auth (single-admin cookie gate) ----------------------------------------

/**
 * The Control Center is gated by CONTROL_SECRET. When it is unset the page still
 * renders (so it can be seen on a fresh deploy) but flags itself as UNPROTECTED.
 */
export async function isControlAuthed(): Promise<{ authed: boolean; isProtected: boolean }> {
  const secret = process.env.CONTROL_SECRET;
  if (!secret) return { authed: true, isProtected: false };
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
  };
}
