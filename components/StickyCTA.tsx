'use client';

import { useEffect, useState } from 'react';
import { track } from '@/lib/analytics';
import { site } from '@/content/site';

/**
 * Persistent "Book a Strategy Call" nudge that appears after the user scrolls
 * past the hero and hides again near the contact form (so it never nags at the
 * point of conversion). A classic churn-reducer: the primary action is always
 * one tap away. Mobile = full-width bottom bar; desktop = floating pill.
 */
export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const contact = document.getElementById('contact');
      const nearContact =
        contact && contact.getBoundingClientRect().top < window.innerHeight * 0.9;
      setShow(y > window.innerHeight * 0.9 && !nearContact);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 transition-all duration-300 sm:bottom-6 sm:right-6 sm:left-auto sm:justify-end sm:px-0 sm:pb-0 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <a
        href="#contact"
        onClick={() => track('cta_sticky', { source: 'sticky_bar' })}
        className="focus-ring group flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-metallic px-6 py-3.5 text-sm font-bold text-ink shadow-gold transition-all hover:brightness-110 sm:w-auto"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
        </span>
        {site.cta.primary.label}
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </a>
    </div>
  );
}
