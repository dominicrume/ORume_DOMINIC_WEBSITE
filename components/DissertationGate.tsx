'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'done' | 'error';

/** Single-asset gate for the dissertation. Same contract as the KYA gate. */
export function DissertationGate() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [fields, setFields] = useState<Record<string, string[]>>({});
  const [href, setHref] = useState('');
  const [emailed, setEmailed] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setFields({});
    setMessage('');

    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          first_name: fd.get('first_name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          doc: 'dissertation',
          company_website: fd.get('company_website') ?? '',
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        download?: string;
        emailed?: boolean;
        error?: string;
        fields?: Record<string, string[]>;
      };

      if (!res.ok) {
        setStatus('error');
        setFields(data.fields ?? {});
        setMessage(data.error ?? 'Please check the form and try again.');
        return;
      }
      if (!data.download) {
        setStatus('error');
        setMessage(
          'Your details are saved, but the link could not be generated. Email me and I will send the PDF directly.',
        );
        return;
      }
      setHref(data.download);
      setEmailed(Boolean(data.emailed));
      setStatus('done');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  const err = (n: string) => fields[n]?.[0];
  const input =
    'focus-ring mb-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-paper placeholder:text-muted disabled:opacity-60';

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center sm:p-8">
        <div className="mb-2 text-2xl text-blue-glow" aria-hidden="true">
          ✓
        </div>
        <h3 className="text-lg font-bold text-paper">Here it is.</h3>
        <p className="mt-1 text-sm text-muted">
          {emailed
            ? 'A copy of this link is in your inbox too, so you will not lose it.'
            : 'Save this link now — it is personal to you and expires in 48 hours.'}
        </p>
        <a
          href={href}
          className="focus-ring mt-5 inline-flex items-center justify-center rounded-xl bg-gold-metallic px-6 py-3 text-sm font-bold text-ink shadow-gold transition-all hover:brightness-110"
        >
          Download the dissertation (PDF) →
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      <h3 className="text-lg font-bold text-paper">Read the full dissertation</h3>
      <p className="mb-5 mt-1 text-sm text-muted">
        54 pages. Free, and yours to keep.
      </p>

      {/* Honeypot: hidden from people, filled by bots, rejected server-side. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label htmlFor="d-name" className="mb-1 block text-sm text-muted">
        First name
      </label>
      <input id="d-name" name="first_name" type="text" required autoComplete="given-name"
        disabled={status === 'loading'} aria-invalid={Boolean(err('first_name'))}
        className={input} placeholder="Ada" />
      {err('first_name') && <p className="mb-3 text-xs text-red-400">{err('first_name')}</p>}

      <label htmlFor="d-email" className="mb-1 mt-4 block text-sm text-muted">
        Email
      </label>
      <input id="d-email" name="email" type="email" required autoComplete="email"
        disabled={status === 'loading'} aria-invalid={Boolean(err('email'))}
        className={input} placeholder="you@university.edu" />
      {err('email') && <p className="mb-3 text-xs text-red-400">{err('email')}</p>}

      <label htmlFor="d-phone" className="mb-1 mt-4 block text-sm text-muted">
        Phone
      </label>
      <input id="d-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel"
        disabled={status === 'loading'} aria-invalid={Boolean(err('phone'))}
        className={input} placeholder="+44 7700 900000" />
      {err('phone') ? (
        <p className="mb-3 text-xs text-red-400">{err('phone')}</p>
      ) : (
        <p className="mb-3 mt-1 text-xs text-muted">Include your country code.</p>
      )}

      {status === 'error' && message && (
        <p role="status" className="mb-4 mt-2 text-sm text-red-400">
          {message}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="focus-ring mt-2 w-full rounded-xl bg-gold-metallic px-6 py-3.5 text-sm font-bold text-ink shadow-gold transition-all hover:brightness-110 disabled:opacity-60">
        {status === 'loading' ? 'Sending…' : 'Send me the dissertation'}
      </button>
    </form>
  );
}
