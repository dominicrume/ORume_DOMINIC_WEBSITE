import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { CTAButton } from '@/components/CTAButton';
import { access } from '@/content/access';

export const metadata: Metadata = {
  title: 'Your instant access',
  description: 'Your free AI course and book from Rume Dominic.',
  robots: { index: false, follow: false },
};

export default function AccessPage() {
  return (
    <main className="min-h-screen py-20 sm:py-28">
      <Container className="max-w-3xl">
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
              Book the $99 strategy call
            </CTAButton>
          </div>
        </GlassCard>

        <p className="mt-10 text-center text-sm">
          <Link href="/" className="focus-ring text-blue-glow hover:underline">
            ← Back to rumedominic.com
          </Link>
        </p>
      </Container>
    </main>
  );
}
