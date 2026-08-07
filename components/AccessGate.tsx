'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { CTAButton } from '@/components/CTAButton';
import { access } from '@/content/access';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'submitting' | 'success' | 'error';

function AccessGateContent() {
  const searchParams = useSearchParams();
  const [isGranted, setIsGranted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if they came from a lead capture form submission or already unlocked in this browser
    const grantedParam = searchParams?.get('granted');
    const sourceParam = searchParams?.get('source');
    const nameParam = searchParams?.get('name');
    let localGranted = null;
    try {
      localGranted = typeof window !== 'undefined' ? localStorage.getItem('rd_access_granted') : null;
    } catch {
      // Ignore storage errors in restricted mobile webviews (e.g. LinkedIn app)
    }

    if (grantedParam === 'true' || sourceParam || nameParam || localGranted === 'true') {
      setIsGranted(true);
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('rd_access_granted', 'true');
        }
      } catch {
        // Ignore storage errors in restricted mobile webviews
      }
    }
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');
    track('access_gate_submit');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('success');
        setIsGranted(true);
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('rd_access_granted', 'true');
          }
        } catch {
          // Ignore storage errors in restricted mobile webviews
        }
        track('access_gate_success');
      } else {
        setStatus('error');
        setMessage(json?.error ?? 'Please enter a valid email to unlock.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  if (!isGranted) {
    return (
      <div className="mx-auto max-w-2xl py-8">
        <GlassCard accent="gold" className="p-8 text-center shadow-2xl sm:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold mb-6">
            🔒 Instant Access Gate
          </div>
          <h1 className="font-display text-3xl font-bold text-paper sm:text-4xl">
            Enter Your Email to Unlock Instant Access
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted sm:text-base">
            To prevent lead leakage and verify your community access, please enter your email below. You will instantly unlock your free copy of <strong>&ldquo;From Code to Consciousness&rdquo; (PDF)</strong> and your <strong>9-Day AI Course</strong> right here on screen.
          </p>
          
          <form onSubmit={onSubmit} noValidate className="mt-8 mx-auto max-w-md flex flex-col gap-3">
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <input name="company_website" tabIndex={-1} autoComplete="off" />
            </div>
            <div>
              <label htmlFor="gate-email" className="sr-only">Email address</label>
              <input
                id="gate-email"
                name="email"
                type="email"
                required
                placeholder="Enter your best email address..."
                className="focus-ring w-full rounded-xl border border-gold/30 bg-ink/80 px-4 py-3.5 text-base text-paper placeholder:text-muted shadow-inner text-center"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="focus-ring w-full rounded-xl bg-gold-metallic px-6 py-4 text-base font-bold text-ink shadow-gold transition-all hover:brightness-110 disabled:opacity-60"
            >
              {status === 'submitting' ? 'Verifying & Unlocking...' : 'Unlock Instant Access Now →'}
            </button>
            {message && (
              <p role="status" className={`mt-2 text-xs font-semibold ${status === 'success' ? 'text-blue-glow' : 'text-gold'}`}>
                {message}
              </p>
            )}
            <p className="mt-3 text-xs text-muted">
              🔒 100% Secure. No spam. Instant access granted on screen immediately.
            </p>
          </form>
        </GlassCard>
      </div>
    );
  }

  return (
    <>
      <div className="text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
          Access granted
        </p>
        <h1 className="font-display text-3xl font-bold text-gradient sm:text-4xl">
          {access.heading}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">{access.sub}</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {access.resources.map((r) => (
          <GlassCard key={r.title} accent="gold" className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">{r.tag}</p>
            <h2 className="mt-2 font-display text-xl font-bold text-paper">{r.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted">{r.desc}</p>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-5 inline-flex items-center justify-center rounded-xl bg-gold-metallic px-5 py-3 text-sm font-bold text-ink shadow-gold transition-all hover:brightness-110"
            >
              {r.cta} →
            </a>
          </GlassCard>
        ))}
      </div>

      <GlassCard accent="blue" className="mt-6">
        <h2 className="font-display text-lg font-bold text-gold">
          {access.courseAccess.title}
        </h2>
        <p className="mt-1 text-sm text-muted">{access.courseAccess.note}</p>
        <ol className="mt-4 space-y-3">
          {access.courseAccess.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                {i + 1}
              </span>
              <span className="text-sm text-paper/90">{step}</span>
            </li>
          ))}
        </ol>
      </GlassCard>

      <GlassCard accent="gold" className="mt-6 text-center">
        <h2 className="font-display text-lg font-bold text-paper">{access.nextStep.title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted">{access.nextStep.body}</p>
        <div className="mt-5 flex justify-center">
          <CTAButton href="/#contact" event="access_book_call">
            Book your free strategy call
          </CTAButton>
        </div>
      </GlassCard>
    </>
  );
}

export function AccessGate() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted">Loading secure access gate...</div>}>
      <AccessGateContent />
    </Suspense>
  );
}
