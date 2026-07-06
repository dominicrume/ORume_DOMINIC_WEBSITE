'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');
    track('newsletter_submit');

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
        setMessage('You’re in. Taking you to your free book and course…');
        form.reset();
        // Instant delivery: hand them the resources right away.
        window.location.href = '/access';
      } else {
        setStatus('error');
        setMessage(json?.error ?? 'Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Try again.');
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <input name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex gap-2">
        <label htmlFor="nl-email" className="sr-only">
          Email
        </label>
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className="focus-ring w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-paper placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="focus-ring rounded-xl bg-blue-deep px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-blue disabled:opacity-60"
        >
          {status === 'submitting' ? '…' : 'Join'}
        </button>
      </div>
      {message && (
        <p role="status" className={`text-xs ${status === 'success' ? 'text-blue-glow' : 'text-gold'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
