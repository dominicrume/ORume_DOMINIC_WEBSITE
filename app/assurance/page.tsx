import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { Section } from '@/components/ui/Section';
import { Footer } from '@/components/Footer';
import { Offer } from '@/components/Offer';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Get your AI agent cleared to ship',
  description:
    'The agent is built and nobody will sign it off. A fixed-scope assurance engagement produces the verdict, the gaps and the named owner of each one, against a patent-pending standard. From $15,000, two to three weeks.',
  keywords: [
    'AI agent assurance',
    'AI governance audit',
    'agentic AI risk assessment',
    'AI accountability',
    'AI audit trail',
    'EU AI Act Article 12',
    'agent sign-off',
    'verifiable AI',
  ],
  alternates: { canonical: `${site.url}/assurance` },
  openGraph: {
    type: 'website',
    url: `${site.url}/assurance`,
    title: 'Get your AI agent cleared to ship',
    description:
      'Nobody buys proof. They buy what proof makes possible. Here that is permission to go live.',
    images: ['/opengraph-image'],
  },
};

const blockers = [
  {
    q: 'Risk will not sign it off',
    a: 'They cannot tell you what would change their mind, because nobody has written down what the agent is actually allowed to decide. The decision map does that first, which is usually the week the argument ends.',
  },
  {
    q: 'You cannot show what it was stopped from doing',
    a: 'Most systems log what an agent did. A regulator asks what it was refused, and by what rule. If the only answer is a log file the agent wrote about itself, the answer is no.',
  },
  {
    q: 'Nobody owns the failure',
    a: 'When an agent spends on the wrong thing, the question is who is accountable. The accountability chain puts a named person against every decision class before anyone needs to ask.',
  },
];

export default function AssurancePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Know Your AgenticAi Assurance',
    serviceType: 'AI agent assurance and governance audit',
    provider: { '@type': 'Person', name: site.legalName, url: site.url },
    areaServed: 'Worldwide',
    description:
      'Fixed-scope assurance for AI agents and agentic workflows, producing a decision map, auditability score, accountability chain and regulator-readiness verdict.',
    offers: [
      { '@type': 'Offer', name: 'Ship the agent', price: '15000', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Keep shipping', price: '5000', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Sell it as your own', price: '50000', priceCurrency: 'USD' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="top">
        <div className="border-b border-white/5">
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="focus-ring rounded-lg text-sm text-muted hover:text-paper">
                ← rumedominic.com
              </Link>
              <Link
                href="/proof"
                className="focus-ring rounded-lg text-sm text-muted hover:text-paper"
              >
                Check every claim →
              </Link>
            </div>
          </Container>
        </div>

        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Assurance
              </p>
              <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-balance">
                Your agent is built. Now get it cleared to ship.
              </h1>
              <p className="mt-5 text-lg text-muted">
                Nobody buys proof. They buy what proof makes possible. Here that is permission:
                a verdict your risk function will accept, every gap named, and a person
                accountable for each one.
              </p>
              <p className="mt-4 text-sm text-muted">
                Built on a patent-pending standard, UK Intellectual Property Office
                GB2611754.9, filed 20 May 2026.
              </p>
            </div>
          </Container>
        </section>

        <Section
          eyebrow="What is actually blocking you"
          title="It is never the model"
          className="border-t border-white/5"
        >
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {blockers.map((b) => (
              <GlassCard key={b.q}>
                <h3 className="mb-2 text-base font-semibold">{b.q}</h3>
                <p className="text-sm leading-relaxed text-muted">{b.a}</p>
              </GlassCard>
            ))}
          </div>
        </Section>

        <div className="border-t border-white/5">
          <Offer />
        </div>

        <Section className="border-t border-white/5">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl">
              If your agent spends money, the bar is higher
            </h2>
            <p className="mt-4 text-muted">
              An agent with a wallet needs more than a report. It needs the rule enforced where
              it cannot be argued with, and a record of every attempt including the refusals.
              That is Know Your AgenticAi: spending limits enforced inside the contract itself,
              and a hash-chained receipt for each attempt that an auditor can read without
              seeing the payments behind it.
            </p>
            <p className="mt-4 text-muted">
              It is catalogued as a partner tool in the official Canton Developer Hub, it placed
              third at the CANTOR8 Build on Canton hackathon, and the library is free with no
              dependencies. The engagement is making it hold up in your environment.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="focus-ring inline-flex items-center justify-center rounded-xl bg-gold-metallic px-5 py-2.5 text-sm font-bold text-ink shadow-gold transition-transform hover:-translate-y-0.5"
              >
                Start a conversation
              </Link>
              <Link
                href="/instrument"
                className="focus-ring inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:border-white/30"
              >
                Run the free instrument first
              </Link>
            </div>
          </div>
        </Section>

        <Section className="border-t border-white/5">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl">Why the measurement stays free</h2>
            <p className="mt-4 text-muted">
              The instrument is open source and always will be. A measurement you have to pay
              for is a measurement you cannot check, and the whole argument of this work is that
              a claim nobody can verify is worth nothing. Run it on your own code before you
              speak to me. If it tells you nothing you did not know, you do not need the
              engagement.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
