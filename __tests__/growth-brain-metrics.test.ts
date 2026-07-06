import { describe, it, expect } from 'vitest';
import { computeKpis, uniqueVisitors, topBy } from '@/growth-brain/src/metrics';
import type { BrainEvent } from '@/growth-brain/src/events';

const ev = (type: string, extra: Partial<BrainEvent> = {}): BrainEvent => ({ type, ...extra });

describe('growth-brain metrics', () => {
  it('counts unique visitors by anon_id, not raw page views', () => {
    const events: BrainEvent[] = [
      ev('page_view', { anon_id: 'a' }),
      ev('page_view', { anon_id: 'a' }), // same person, second page
      ev('page_view', { anon_id: 'b' }),
    ];
    expect(uniqueVisitors(events)).toBe(2);
  });

  it('computes lead and magnet conversion rates', () => {
    const events: BrainEvent[] = [
      ev('page_view', { anon_id: 'a' }),
      ev('page_view', { anon_id: 'b' }),
      ev('page_view', { anon_id: 'c' }),
      ev('page_view', { anon_id: 'd', source: '/framework' }),
      ev('download', { anon_id: 'd', source: '/framework' }),
      ev('lead_created', { anon_id: 'd', props: { kind: 'framework' } }),
    ];
    const k = computeKpis(events);
    expect(k.funnel.visitors).toBe(4);
    expect(k.funnel.leads).toBe(1);
    expect(k.leadConversionPct).toBe(25); // 1 of 4
    expect(k.funnel.frameworkViews).toBe(1);
    expect(k.funnel.frameworkDownloads).toBe(1);
    expect(k.magnetConversionPct).toBe(100); // 1 download of 1 view
  });

  it('ranks top CTAs by click count', () => {
    const events: BrainEvent[] = [
      ev('cta_click', { props: { event: 'offer_audit' } }),
      ev('cta_click', { props: { event: 'offer_audit' } }),
      ev('cta_click', { props: { event: 'cta_book_call' } }),
    ];
    const top = topBy(events, 'cta_click', 'event');
    expect(top[0]).toEqual({ event: 'offer_audit', count: 2 });
  });

  it('never divides by zero on an empty period', () => {
    const k = computeKpis([]);
    expect(k.leadConversionPct).toBe(0);
    expect(k.magnetConversionPct).toBe(0);
    expect(k.eventCount).toBe(0);
  });
});
