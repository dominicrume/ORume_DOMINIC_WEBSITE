'use client';

import { useEffect, useRef, useState } from 'react';
import type { Stat } from '@/content/stats';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function format(n: number): string {
  return n.toLocaleString('en-US');
}

export function StatCounter({ stat }: { stat: Stat }) {
  const { value, suffix = '', prefix = '', label } = stat;
  const [display, setDisplay] = useState(stat.static ? value : 0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (stat.static || value === 0) return;

    // Reduced motion: jump straight to the final value.
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(eased * value));
        if (p < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, stat.static]);

  return (
    <div ref={ref} className="glass glass-blue px-5 py-6 text-center">
      {stat.static ? (
        <div className="font-display text-xl font-bold text-gold sm:text-2xl">{label}</div>
      ) : (
        <>
          <div
            className="font-display text-3xl font-bold text-gradient sm:text-4xl"
            aria-label={`${prefix}${format(value)}${suffix} ${label}`}
          >
            {prefix}
            {format(display)}
            {suffix}
          </div>
          <div className="mt-2 text-sm text-muted">{label}</div>
        </>
      )}
    </div>
  );
}
