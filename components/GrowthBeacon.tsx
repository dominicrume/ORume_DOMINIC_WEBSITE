'use client';

import { useEffect } from 'react';
import { sendBeacon } from '@/lib/analytics';

/**
 * Fires the passive events the Growth Brain needs: a page_view on load and
 * scroll_depth milestones. CTA clicks and form events already flow through track().
 * Zero UI. Mounted once in the root layout.
 */
export function GrowthBeacon() {
  useEffect(() => {
    sendBeacon('page_view');

    const seen = new Set<number>();
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      const depth = Math.round((el.scrollTop / max) * 100);
      for (const mark of [50, 100]) {
        if (depth >= mark && !seen.has(mark)) {
          seen.add(mark);
          sendBeacon('scroll_depth', { depth: mark });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
