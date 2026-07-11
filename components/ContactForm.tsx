'use client';

import { useState } from 'react';
import { budgetRanges } from '@/lib/validation';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const fieldClass =
  'focus-ring w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-paper placeholder:text-muted';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Honeypot: bots fill this hidden field. Fake success, never hit the backend.
    if (data.company_website) {
      setStatus('success');
      setMessage('Thanks, your message is in.');
      return;
    }

    // Client-side guard mirrors the server zod schema so users get instant feedback.
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((data.email ?? '').trim());
    if (!data.name?.trim() || !emailOk || (data.goal ?? '').trim().length < 10 || !data.budget) {
      setStatus('error');
      setMessage('Please complete every field with a valid email and a short description.');
      return;
    }

    setStatus('submitting');
    setMessage('');
    track('contact_submit');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setMessage(
          'Got it — your request is in. I’ll email you within 1 to 2 business days to set up your call.',
        );
        track('contact_success');
        form.reset();
      } else {
        setStatus('error');
        setMessage(json?.error ?? 'Something went wrong. Please try again or email directly.');
        track('contact_error', { status: res.status });
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again or email directly.');
      track('contact_error', { status: 'network' });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4" aria-label="Contact form">
      {/* Honeypot - visually hidden, must stay empty. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm text-muted">
            Name
          </label>
          <input id="name" name="name" required className={fieldClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="org" className="mb-1 block text-sm text-muted">
            Organisation <span className="text-muted/60">(optional)</span>
          </label>
          <input id="org" name="org" className={fieldClass} placeholder="Company / project" />
        </div>
        <div>
          <label htmlFor="budget" className="mb-1 block text-sm text-muted">
            Budget range
          </label>
          <select id="budget" name="budget" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select…
            </option>
            {budgetRanges.map((b) => (
              <option key={b} value={b} className="bg-ink">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="goal" className="mb-1 block text-sm text-muted">
          What do you want to build?
        </label>
        <textarea
          id="goal"
          name="goal"
          required
          rows={4}
          className={fieldClass}
          placeholder="Tell me about your AI / Web3 goal, timeline, and what success looks like."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="focus-ring inline-flex items-center justify-center rounded-xl bg-gold-metallic px-6 py-3 text-sm font-semibold text-ink shadow-gold transition-all hover:brightness-110 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Request my strategy call →'}
      </button>

      {message && (
        <p
          role="status"
          className={`text-sm ${status === 'success' ? 'text-blue-glow' : 'text-gold'}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
