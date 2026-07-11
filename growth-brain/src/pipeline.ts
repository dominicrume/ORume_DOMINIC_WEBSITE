/**
 * The weekly loop, orchestrated. Reads the last 7 days of events (service-role, server
 * only), computes KPIs, asks the brain for ranked moves, writes the Director's Brief, and
 * persists the snapshot + recommendations + brief to Supabase for the audit trail.
 *
 * Runtime entry is app/api/brain/weekly (called by a Vercel Cron). This module holds the
 * logic so it stays testable and free of framework glue.
 */

import { computeKpis, type Kpis } from './metrics';
import { proposeRecommendations, type Recommendation } from './brain';
import { generateBrief } from './report';
import type { BrainEvent } from './events';

function admin() {
  const url = process.env.SUPABASE_URL;
  // The brain must READ events, which RLS blocks for the publishable key. Use a
  // full-access key: Supabase's new secret key, or the legacy service-role key.
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

async function readEvents(sinceIso: string): Promise<BrainEvent[]> {
  const a = admin();
  if (!a) return [];
  const res = await fetch(
    `${a.url}/rest/v1/events?created_at=gte.${encodeURIComponent(sinceIso)}&order=created_at.asc&limit=50000`,
    { headers: { apikey: a.key, authorization: `Bearer ${a.key}` } },
  );
  if (!res.ok) return [];
  return (await res.json()) as BrainEvent[];
}

async function insert(table: string, row: Record<string, unknown>): Promise<void> {
  const a = admin();
  if (!a) return;
  await fetch(`${a.url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: a.key,
      authorization: `Bearer ${a.key}`,
      'content-type': 'application/json',
      prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  }).catch(() => undefined);
}

export type WeeklyResult = {
  ok: boolean;
  reason?: string;
  periodLabel: string;
  kpis: Kpis;
  recommendations: Recommendation[];
  brief: string;
};

export async function runWeekly(now = new Date()): Promise<WeeklyResult> {
  const end = now;
  const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
  const periodLabel = `${start.toISOString().slice(0, 10)} to ${end.toISOString().slice(0, 10)}`;

  const events = await readEvents(start.toISOString());
  const kpis = computeKpis(events);

  const brain = await proposeRecommendations(kpis);
  const recommendations = brain.recommendations;
  const brief = generateBrief(kpis, recommendations, periodLabel);

  // Persist the full audit trail (the KYA standard: provable, auditable, accountable).
  await insert('metrics_snapshots', {
    period_start: start.toISOString(),
    period_end: end.toISOString(),
    kpis,
  });
  await insert('briefs', { period_end: end.toISOString(), markdown: brief });
  for (const r of recommendations) {
    await insert('recommendations', {
      period_end: end.toISOString(),
      category: r.category,
      title: r.title,
      hypothesis: r.hypothesis,
      action: r.action,
      expected_impact: r.expected_impact,
      confidence: r.confidence,
      evidence: { note: r.evidence },
      owner: r.owner,
      status: 'proposed',
    });
  }

  return {
    ok: brain.ok,
    reason: brain.reason,
    periodLabel,
    kpis,
    recommendations,
    brief,
  };
}
