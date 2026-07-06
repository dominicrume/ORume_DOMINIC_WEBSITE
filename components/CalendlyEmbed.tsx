'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';

// The build-time default. If the live URL still equals this, Calendly isn't set
// up yet, so we must NOT embed it (it renders a 404). Show a clean fallback.
const PLACEHOLDER = 'https://calendly.com/rumedominic/strategy-call';

/**
 * Calendly inline embed, LAZY-loaded. The Calendly widget pulls ~2.9MB of JS/CSS
 * (plus Stripe), so we only inject it once the widget scrolls into view. Before
 * that we render a lightweight placeholder — keeping it off the critical path
 * massively improves LCP and removes third-party cookies from initial load.
 */
export function CalendlyEmbed({ url }: { url: string }) {
  const configured = Boolean(url) && url !== PLACEHOLDER;
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Only flip to in-view when the element approaches the viewport.
  useEffect(() => {
    if (!configured) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [configured]);

  // Inject the heavy widget script only after the element is in view.
  useEffect(() => {
    if (!inView) return;
    const id = 'calendly-widget-script';
    if (document.getElementById(id)) {
      setLoaded(true);
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);
    const s = document.createElement('script');
    s.id = id;
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.onload = () => setLoaded(true);
    document.body.appendChild(s);
  }, [inView]);

  if (!configured) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm">
        <p className="font-semibold text-paper">Book your $99 strategy call</p>
        <p className="mt-2 text-muted">
          Fill the form on the left and choose “$99 strategy call” as your budget. I’ll send
          your payment and scheduling link within hours. Prefer email? Reach me at{' '}
          <a
            href={`mailto:${site.email}?subject=$99%20Strategy%20Call`}
            className="focus-ring font-semibold text-blue-glow underline"
          >
            {site.email}
          </a>
          .
        </p>
        <a
          href="#contact"
          className="focus-ring mt-4 inline-flex rounded-xl bg-gold px-5 py-2.5 text-sm font-bold text-ink shadow-gold hover:bg-gold-soft"
        >
          Request my time slot →
        </a>
      </div>
    );
  }

  return (
    <div ref={ref} className="min-h-[320px]">
      {inView ? (
        <div
          className="calendly-inline-widget h-[420px] w-full overflow-hidden rounded-xl"
          data-url={url}
        />
      ) : (
        <div className="flex h-[420px] w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-sm text-muted">
          Loading calendar…
        </div>
      )}
      {inView && !loaded && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring mt-3 inline-block text-sm font-semibold text-blue-glow underline"
        >
          Open scheduling page →
        </a>
      )}
    </div>
  );
}
