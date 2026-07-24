'use client';

import { site } from '@/content/site';

/**
 * Zoho Bookings iframe embed.
 */
export function BookingEmbed({ url }: { url: string }) {
  if (!url) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm">
        <p className="font-semibold text-paper">How booking works</p>
        <p className="mt-2 text-muted">
          Fill in the form on the left with your name, email and what you want to build. It
          lands with me straight away, and I reply within 1 to 2 business days with a time to
          talk. Prefer email? Reach me directly at{' '}
          <a
            href={`mailto:${site.email}?subject=Strategy%20Call%20Request`}
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
          Fill the form to request a time →
        </a>
      </div>
    );
  }

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-xl bg-white/[0.03]">
      <iframe
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        className="h-full w-full border-none"
      ></iframe>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring mt-3 inline-block text-sm font-semibold text-blue-glow underline"
      >
        Open scheduling page →
      </a>
    </div>
  );
}
