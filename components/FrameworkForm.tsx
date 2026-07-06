'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const PDF_URL = '/kya-framework.pdf';
const fieldClass =
  'focus-ring w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-paper placeholder:text-muted';

export function FrameworkForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Honeypot: bots fill this. Fake success, never hit the backend or reveal the file.
    if (data.company_website) {
      setStatus('success');
      setMessage('Thanks, check your inbox for the guide.');
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((data.email ?? '').trim());
    if (!emailOk) {
      setStatus('error');
      setMessage('Enter a valid email so I can send the guide.');
      return;
    }

    setStatus('submitting');
    setMessage('');
    track('framework_submit');

    try {
      const res = await fetch('/api/framework', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setMessage('You’re in. Your download is ready below, and it’s on its way to your inbox too.');
        track('framework_success');
        form.reset();
      } else {
        setStatus('error');
        setMessage(json?.error ?? 'Something went wrong. Please try again.');
        track('framework_error', { status: res.status });
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
      track('framework_error', { status: 'network' });
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="text-lg font-semibold text-paper">You’re in.</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{message}</p>
        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('framework_download')}
          className="focus-ring mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gold-metallic px-7 py-3.5 text-sm font-bold text-ink shadow-gold transition-all hover:brightness-110"
        >
          Download the guide (PDF) →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3" aria-label="Get the framework">
      {/* Honeypot - visually hidden, must stay empty. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="fw_company_website">Leave this field empty</label>
        <input
          id="fw_company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="fw-name" className="sr-only">
          First name
        </label>
        <input
          id="fw-name"
          name="name"
          className={fieldClass}
          placeholder="First name (optional)"
          autoComplete="given-name"
        />
      </div>
      <div>
        <label htmlFor="fw-email" className="sr-only">
          Email
        </label>
        <input
          id="fw-email"
          name="email"
          type="email"
          required
          className={fieldClass}
          placeholder="you@company.com"
          autoComplete="email"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="focus-ring mt-1 inline-flex items-center justify-center rounded-xl bg-gold-metallic px-6 py-3.5 text-sm font-bold text-ink shadow-gold transition-all hover:brightness-110 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send me the free guide'}
      </button>

      {message && status === 'error' && (
        <p role="status" className="text-sm text-gold">
          {message}
        </p>
      )}
      <p className="mt-1 text-center text-xs text-muted">
        No spam. Unsubscribe anytime. The occasional sharp email on shipping AI you can prove.
      </p>
    </form>
  );
}
