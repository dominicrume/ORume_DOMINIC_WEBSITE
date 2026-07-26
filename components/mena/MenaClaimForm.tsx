'use client';

import { useState } from 'react';
import { MENA_CONFIG } from '@/content/mena';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function MenaClaimForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    track('mena_claim_submit');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Basic client validation
    const email = (formData.get('email') as string)?.trim();
    const whatsapp = (formData.get('whatsapp') as string)?.trim();
    const agree = formData.get('agree');

    if (!email || !whatsapp || !agree) {
      setStatus('error');
      setErrorMessage('Please complete all fields and accept the training updates consent.');
      return;
    }

    try {
      // Submit to Google Form endpoint if configured with real ID, otherwise simulate instant success
      const endpoint = MENA_CONFIG.GOOGLE_FORM_ENDPOINT;
      if (endpoint && !endpoint.includes('YOUR_FORM_ID_HERE') && !endpoint.startsWith('[MISSING:')) {
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });
      }
    } catch {
      // Never block instant scholarship access on network or CORS hiccups
    }

    // Instant delivery without email verification or waiting
    setStatus('success');
    track('mena_claim_success');
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('rd_mena_scholarship_claimed', 'true');
      }
    } catch {
      // Ignore storage errors in restricted mobile webviews
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-[#C9A227]/40 bg-[#2D0B4E]/90 p-6 sm:p-8 text-left shadow-2xl animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-4">
          🎓 Instant Access Granted
        </div>
        
        <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#F4F1EA] tracking-tight">
          Your scholarship is live. Nothing else to do.
        </h3>
        
        <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/80 font-sans">
          Start today. Reply in the group when you finish module one.
        </p>

        <div className="mt-6 grid gap-3.5 sm:grid-cols-2 font-sans">
          {/* WhatsApp Link most prominent */}
          <a
            href={MENA_CONFIG.WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('mena_click_whatsapp')}
            className="sm:col-span-2 flex items-center justify-between rounded-xl bg-[#25D366] px-6 py-4 text-base font-black text-black shadow-lg transition-transform active:scale-[0.99] hover:brightness-105 min-h-[52px]"
          >
            <span className="flex items-center gap-2.5">
              <span className="text-xl">💬</span>
              <span>Join The Bridge Community (WhatsApp)</span>
            </span>
            <span>→</span>
          </a>

          <a
            href={MENA_CONFIG.BOOK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('mena_click_book')}
            className="flex items-center justify-between rounded-xl border border-[#C9A227]/50 bg-[#C9A227]/15 px-5 py-4 text-sm font-bold text-[#F4F1EA] transition-all hover:bg-[#C9A227]/25 min-h-[48px]"
          >
            <span className="flex items-center gap-2 truncate">
              <span>📘</span>
              <span className="truncate">Book: {MENA_CONFIG.BOOK_TITLE}</span>
            </span>
            <span>→</span>
          </a>

          <a
            href={MENA_CONFIG.COURSE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('mena_click_course')}
            className="flex items-center justify-between rounded-xl border border-[#C9A227]/50 bg-[#C9A227]/15 px-5 py-4 text-sm font-bold text-[#F4F1EA] transition-all hover:bg-[#C9A227]/25 min-h-[48px]"
          >
            <span className="flex items-center gap-2 truncate">
              <span>🎓</span>
              <span className="truncate">Course: {MENA_CONFIG.COURSE_NAME}</span>
            </span>
            <span>→</span>
          </a>

          <a
            href={MENA_CONFIG.PRODUCT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('mena_click_product')}
            className="sm:col-span-2 flex items-center justify-between rounded-xl border border-[#C9A227]/50 bg-[#C9A227]/15 px-5 py-4 text-sm font-bold text-[#F4F1EA] transition-all hover:bg-[#C9A227]/25 min-h-[48px]"
          >
            <span className="flex items-center gap-2 truncate">
              <span>🛠️</span>
              <span className="truncate">Product: {MENA_CONFIG.PRODUCT_NAME}</span>
            </span>
            <span>→</span>
          </a>
        </div>

        <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs sm:text-sm text-[#F4F1EA]/90 font-sans">
          ⚠️ <strong>Nobody will ever ask you to pay a fee. That is a scam.</strong> All prizes during the 3-night live event were paid directly to winners&apos; own accounts, and all education here is 100% free.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 text-left font-sans" aria-label="Claim your scholarship">
      <div>
        <label htmlFor="mena-name" className="block text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-1.5">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          id="mena-name"
          name="entry.1000001" // Generic google form entry key, customizable
          type="text"
          required
          placeholder="Enter your full name..."
          className="w-full rounded-xl border border-[#C9A227]/30 bg-black/40 px-4 py-3.5 text-base text-[#F4F1EA] placeholder:text-[#F4F1EA]/40 focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227] min-h-[48px]"
        />
      </div>

      <div>
        <label htmlFor="mena-whatsapp" className="block text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-1.5">
          WhatsApp Number (with country code) <span className="text-red-400">*</span>
        </label>
        <input
          id="mena-whatsapp"
          name="entry.1000002"
          type="tel"
          required
          placeholder="e.g. +234 800 000 0000"
          className="w-full rounded-xl border border-[#C9A227]/30 bg-black/40 px-4 py-3.5 text-base text-[#F4F1EA] placeholder:text-[#F4F1EA]/40 focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227] min-h-[48px]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="mena-country" className="block text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-1.5">
            Country <span className="text-red-400">*</span>
          </label>
          <select
            id="mena-country"
            name="entry.1000003"
            required
            defaultValue=""
            className="w-full rounded-xl border border-[#C9A227]/30 bg-black/60 px-4 py-3.5 text-base text-[#F4F1EA] focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227] min-h-[48px]"
          >
            <option value="" disabled className="bg-[#2D0B4E] text-[#F4F1EA]/50">Select your country</option>
            <option value="Nigeria" className="bg-[#2D0B4E] text-[#F4F1EA]">Nigeria</option>
            <option value="Zimbabwe" className="bg-[#2D0B4E] text-[#F4F1EA]">Zimbabwe</option>
            <option value="Rwanda" className="bg-[#2D0B4E] text-[#F4F1EA]">Rwanda</option>
            <option value="Uganda" className="bg-[#2D0B4E] text-[#F4F1EA]">Uganda</option>
            <option value="Other" className="bg-[#2D0B4E] text-[#F4F1EA]">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="mena-email" className="block text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-1.5">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            id="mena-email"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className="w-full rounded-xl border border-[#C9A227]/30 bg-black/40 px-4 py-3.5 text-base text-[#F4F1EA] placeholder:text-[#F4F1EA]/40 focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227] min-h-[48px]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="mena-skill" className="block text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-1.5">
          Which skill do you want most? <span className="text-red-400">*</span>
        </label>
        <select
          id="mena-skill"
          name="entry.1000004"
          required
          defaultValue=""
          className="w-full rounded-xl border border-[#C9A227]/30 bg-black/60 px-4 py-3.5 text-base text-[#F4F1EA] focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227] min-h-[48px]"
        >
          <option value="" disabled className="bg-[#2D0B4E] text-[#F4F1EA]/50">Select primary skill interest</option>
          <option value="AI & Automation" className="bg-[#2D0B4E] text-[#F4F1EA]">AI &amp; Automation</option>
          <option value="Web Development" className="bg-[#2D0B4E] text-[#F4F1EA]">Web Development</option>
          <option value="Data & Analytics" className="bg-[#2D0B4E] text-[#F4F1EA]">Data &amp; Analytics</option>
          <option value="Digital Marketing" className="bg-[#2D0B4E] text-[#F4F1EA]">Digital Marketing</option>
          <option value="Blockchain & Web3" className="bg-[#2D0B4E] text-[#F4F1EA]">Blockchain &amp; Web3</option>
          <option value="Not sure yet" className="bg-[#2D0B4E] text-[#F4F1EA]">Not sure yet</option>
        </select>
      </div>

      <div className="pt-2">
        <label htmlFor="mena-agree" className="flex items-start gap-3 cursor-pointer min-h-[44px]">
          <input
            id="mena-agree"
            name="agree"
            type="checkbox"
            required
            defaultChecked
            className="mt-1 h-5 w-5 shrink-0 rounded border-[#C9A227]/50 bg-black/50 text-[#C9A227] focus:ring-[#C9A227]"
          />
          <span className="text-xs sm:text-sm text-[#F4F1EA]/90 leading-snug">
            I agree to receive training updates on WhatsApp and email.
          </span>
        </label>
      </div>

      {errorMessage && (
        <p role="alert" className="text-xs font-bold text-red-400 mt-1">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 w-full rounded-xl bg-[#C9A227] px-8 py-4 text-base sm:text-lg font-black uppercase tracking-wider text-black shadow-[0_0_25px_rgba(201,162,39,0.3)] transition-all active:scale-[0.99] hover:brightness-110 disabled:opacity-60 min-h-[54px]"
      >
        {status === 'submitting' ? 'CLAIMING INSTANT ACCESS...' : 'CLAIM MY SCHOLARSHIP — FREE'}
      </button>

      <p className="text-center text-xs text-[#F4F1EA]/60">
        🔒 100% Free. No tuition. No credit card required. Instant access on next screen.
      </p>
    </form>
  );
}
