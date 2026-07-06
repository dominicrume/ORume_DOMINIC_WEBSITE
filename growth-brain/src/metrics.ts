/**
 * The analytics engine: raw events in, KPIs out. PURE functions only (no I/O), so
 * they are trivially unit-tested and the brain can trust the numbers. This is Phase 2:
 * deterministic truth, no ML required.
 */

import type { BrainEvent } from './events';

export type Funnel = {
  visitors: number;
  leads: number;
  frameworkViews: number;
  frameworkDownloads: number;
  ctaClicks: number;
  callsBooked: number;
};

export type Kpis = {
  funnel: Funnel;
  leadConversionPct: number; // visitors -> leads
  magnetConversionPct: number; // framework views -> downloads
  ctaClickThroughPct: number; // visitors -> any CTA click
  topCtas: Array<{ event: string; clicks: number }>;
  topSources: Array<{ source: string; visitors: number }>;
  eventCount: number;
};

const isType = (e: BrainEvent, t: string) => e.type === t;

/** Count unique visitors by anon_id, falling back to session_id. */
export function uniqueVisitors(events: BrainEvent[]): number {
  const ids = new Set<string>();
  for (const e of events) {
    if (!isType(e, 'page_view')) continue;
    ids.add(e.anon_id || e.session_id || e.id || Math.random().toString());
  }
  return ids.size;
}

function countType(events: BrainEvent[], type: string): number {
  return events.reduce((n, e) => (e.type === type ? n + 1 : n), 0);
}

function frameworkViews(events: BrainEvent[]): number {
  return events.filter((e) => e.type === 'page_view' && (e.source ?? '').includes('/framework')).length;
}

function pct(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return Math.round((part / whole) * 1000) / 10; // one decimal place
}

export function topBy(
  events: BrainEvent[],
  type: string,
  key: string,
  limit = 5,
): Array<{ [k: string]: string | number }> {
  const counts = new Map<string, number>();
  for (const e of events) {
    if (e.type !== type) continue;
    const v = String(e.props?.[key] ?? e.source ?? 'unknown');
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([k, n]) => ({ [key]: k, count: n }));
}

export function computeKpis(events: BrainEvent[]): Kpis {
  const visitors = uniqueVisitors(events);
  const leads = countType(events, 'lead_created');
  const fwViews = frameworkViews(events);
  const fwDownloads = countType(events, 'download');
  const ctaClicks = countType(events, 'cta_click');
  const callsBooked = events.filter(
    (e) => e.type === 'cta_click' && String(e.props?.event ?? '').includes('book'),
  ).length;

  const topCtas = topBy(events, 'cta_click', 'event').map((r) => ({
    event: String(r.event),
    clicks: Number(r.count),
  }));

  const sources = new Map<string, Set<string>>();
  for (const e of events) {
    if (e.type !== 'page_view') continue;
    const src = e.utm_source || e.source || 'direct';
    if (!sources.has(src)) sources.set(src, new Set());
    sources.get(src)!.add(e.anon_id || e.session_id || 'x');
  }
  const topSources = [...sources.entries()]
    .map(([source, set]) => ({ source, visitors: set.size }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 5);

  return {
    funnel: {
      visitors,
      leads,
      frameworkViews: fwViews,
      frameworkDownloads: fwDownloads,
      ctaClicks,
      callsBooked,
    },
    leadConversionPct: pct(leads, visitors),
    magnetConversionPct: pct(fwDownloads, fwViews),
    ctaClickThroughPct: pct(ctaClicks, visitors),
    topCtas,
    topSources,
    eventCount: events.length,
  };
}
