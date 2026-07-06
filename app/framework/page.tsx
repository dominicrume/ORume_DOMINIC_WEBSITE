import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { FrameworkForm } from '@/components/FrameworkForm';
import { Footer } from '@/components/Footer';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'The Know Your AgenticAi Framework (free field guide)',
  description:
    'A free field guide: the 5 questions every leader must answer before letting an AI agent act on their behalf. Make your agents provable, auditable and accountable. By Rume Dominic.',
  alternates: { canonical: `${site.url}/framework` },
  openGraph: {
    type: 'article',
    url: `${site.url}/framework`,
    title: 'The Know Your AgenticAi Framework (free field guide)',
    description:
      'The 5 questions every leader must answer before letting an AI agent act on their behalf.',
  },
};

const inside = [
  'The three-part standard: provable, auditable, accountable',
  'The 5 questions every leader must answer before an agent acts',
  'A 60-second scorecard to test your own exposure',
  'The one gap that ends careers, and how to close it',
];

export default function FrameworkPage() {
  return (
    <>
      <main id="top">
        {/* Minimal top bar - one link home, no nav, to keep the page focused. */}
        <div className="border-b border-white/5">
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="focus-ring rounded-lg" aria-label="Rume Dominic home">
                <Image
                  src="/rume-logo.png"
                  alt="Rume Dominic"
                  width={510}
                  height={92}
                  className="h-7 w-auto"
                  priority
                />
              </Link>
              <Link href="/#work" className="text-sm text-muted transition-colors hover:text-paper">
                Work with me
              </Link>
            </div>
          </Container>
        </div>

        <section className="scroll-mt-24 py-16 sm:py-24">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Pitch */}
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  Free field guide
                </p>
                <h1 className="font-display text-4xl font-bold leading-tight text-paper sm:text-5xl">
                  Can you prove what your <span className="text-gold-shine">AI agent</span> did, and
                  why?
                </h1>
                <p className="mt-5 max-w-lg text-lg text-muted">
                  AI stopped waiting for instructions. It started acting. This guide is the fastest
                  way to find out whether the agents in your business are provable, auditable and
                  accountable, before a regulator, a client or a court asks you to prove it.
                </p>
                <ul className="mt-7 space-y-3">
                  {inside.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-paper/90">
                      <span className="mt-0.5 text-blue-glow">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 text-sm text-muted">
                  Written by Rume Dominic, AI engineer and founder of VOREM, from a patent-pending
                  framework filed with the UK Intellectual Property Office (GB2611754.9).
                </p>
              </div>

              {/* Capture */}
              <div className="lg:pl-6">
                <GlassCard accent="gold" className="mx-auto max-w-md">
                  <div className="mb-5 flex items-center gap-3">
                    <Image
                      src="/kya-logo.png"
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-xl"
                    />
                    <div>
                      <p className="font-display font-bold text-paper">Know Your AgenticAi</p>
                      <p className="text-xs text-muted">The 5 questions · 5-page PDF</p>
                    </div>
                  </div>
                  <p className="mb-5 text-sm text-muted">
                    Enter your email and I’ll send the guide right away. Your download appears
                    instantly, and lands in your inbox too.
                  </p>
                  <FrameworkForm />
                </GlassCard>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
