'use client';

import { useState } from 'react';

type Doc = 'kya-method' | 'kya-architecture';

const DOCS: { id: Doc; label: string; blurb: string }[] = [
  {
    id: 'kya-method',
    label: 'The KYA Method — Detailed Edition',
    blurb: 'The original publication: the method, end to end.',
  },
  {
    id: 'kya-architecture',
    label: 'The KYA Method — Engineering Architecture',
    blurb: 'How it is built: the architecture behind the method.',
  },
];

type Status = 'idle' | 'loading' | 'done' | 'error';

export function KyaMethodGate() {
  const [open, setOpen] = useState<Doc | null>(null);
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
    const payload = {
      first_name: fd.get('first_name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      doc: open,
      company_website: fd.get('company_website') ?? '',
    };

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
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
        // The lead is saved; only the link could not be issued. Say exactly that.
        setStatus('error');
        setMessage(
          'You are on the list, but the download link could not be generated. Email me and I will send it directly.',
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

  const err = (name: string) => fields[name]?.[0];
  const doc = DOCS.find((d) => d.id === open);

  return (
    <div className="mt-12">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        {DOCS.map((d, i) => (
          <button
            key={d.id}
            type="button"
            onClick={() => {
              setOpen(d.id);
              setStatus('idle');
              setMessage('');
              setFields({});
            }}
            aria-expanded={open === d.id}
            className={`focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all ${
              i === 1
                ? 'bg-gold-metallic text-ink shadow-gold hover:brightness-110'
                : 'border border-blue/20 bg-blue/10 text-blue-glow hover:bg-blue/20'
            }`}
          >
            {i === 1 ? 'Get the Engineering Architecture' : 'Get the Original Publication'} →
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        Free. One short form and the PDF is yours.
      </p>

      {open && (
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          {status === 'done' ? (
            <div className="text-center">
              <div className="mb-2 text-2xl text-blue-glow" aria-hidden="true">
                ✓
              </div>
              <h3 className="text-lg font-bold text-paper">Here it is.</h3>
              <p className="mt-1 text-sm text-muted">
                Your copy of {doc?.label}.{' '}
                {emailed
                  ? 'A copy of this link is in your inbox too, so you will not lose it.'
                  : 'Save this link now — it is personal to you and expires in 48 hours.'}
              </p>
              <a
                href={href}
                className="focus-ring mt-5 inline-flex items-center justify-center rounded-xl bg-gold-metallic px-6 py-3 text-sm font-bold text-ink shadow-gold transition-all hover:brightness-110"
              >
                Download the PDF →
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="text-lg font-bold text-paper">{doc?.label}</h3>
              <p className="mb-5 mt-1 text-sm text-muted">{doc?.blurb}</p>

              {/* Honeypot: hidden from people, filled by bots, rejected server-side. */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <label htmlFor="g-name" className="mb-1 block text-sm text-muted">
                First name
              </label>
              <input
                id="g-name"
                name="first_name"
                type="text"
                required
                autoComplete="given-name"
                disabled={status === 'loading'}
                aria-invalid={Boolean(err('first_name'))}
                className="focus-ring mb-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-paper placeholder:text-muted disabled:opacity-60"
                placeholder="Ada"
              />
              {err('first_name') && (
                <p className="mb-3 text-xs text-red-400">{err('first_name')}</p>
              )}

              <label htmlFor="g-email" className="mb-1 mt-4 block text-sm text-muted">
                Email
              </label>
              <input
                id="g-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={status === 'loading'}
                aria-invalid={Boolean(err('email'))}
                className="focus-ring mb-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-paper placeholder:text-muted disabled:opacity-60"
                placeholder="you@company.com"
              />
              {err('email') && <p className="mb-3 text-xs text-red-400">{err('email')}</p>}

              <label htmlFor="g-phone" className="mb-1 mt-4 block text-sm text-muted">
                Phone
              </label>
              <input
                id="g-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                disabled={status === 'loading'}
                aria-invalid={Boolean(err('phone'))}
                className="focus-ring mb-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-paper placeholder:text-muted disabled:opacity-60"
                placeholder="+44 7700 900000"
              />
              {err('phone') ? (
                <p className="mb-3 text-xs text-red-400">{err('phone')}</p>
              ) : (
                <p className="mb-3 mt-1 text-xs text-muted">
                  So I can follow up properly. Include your country code.
                </p>
              )}

              {status === 'error' && message && (
                <p role="status" className="mb-4 mt-2 text-sm text-red-400">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="focus-ring mt-2 w-full rounded-xl bg-gold-metallic px-6 py-3.5 text-sm font-bold text-ink shadow-gold transition-all hover:brightness-110 disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending…' : 'Send me the PDF'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
