import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { Section } from '@/components/ui/Section';
import { Footer } from '@/components/Footer';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'The AI Code Quality Auditor: measure what your agents actually shipped',
  description:
    'An open-source instrument that scores AI-generated code on security, complexity, duplication and specification fidelity. Validated against two independent human raters. Install in one command.',
  alternates: { canonical: `${site.url}/instrument` },
  openGraph: {
    images: ['/opengraph-image'],
    type: 'article',
    url: `${site.url}/instrument`,
    title: 'The AI Code Quality Auditor',
    description:
      'Open source, validated against human judgement, and it reports its own findings on itself.',
  },
};

const metrics = [
  {
    name: 'Specification fidelity',
    detail:
      'Did it build what you asked for, and nothing else? Measured in two directions: things added that nobody requested, and the architecture being replaced outright.',
    accent: true,
  },
  {
    name: 'Security density',
    detail:
      'CWE-tagged findings per thousand lines. Reported per language, because a scanner reads what it can read and pretending otherwise manufactures a false all-clear.',
  },
  {
    name: 'Cyclomatic complexity',
    detail:
      'Structural density per function. Read alongside duplication rather than alone. Low complexity bought by scattering logic across copied scaffolding is not a win.',
  },
  {
    name: 'Code duplication',
    detail:
      'The proportion of source participating in repeated blocks. This is where generated enterprise scaffolding shows up as maintenance you inherited on day one.',
  },
  {
    name: 'Rework',
    detail:
      'Correction frequency during authoring. Structurally zero for agents, which is the point: it marks the boundary of what a keystroke lens can see.',
  },
];

// A real reading, taken by pointing the instrument at its own source on 23 Oct 2026.
// Plain English, one line each, so anyone can read it. Shown warts and all, including
// the warnings, because an instrument that flatters its own code is worth nothing.
const reading = [
  { name: 'Security', value: '3.66', unit: 'per 1,000 lines', status: 'OK',
    line: 'How many risky patterns it found, for every thousand lines of code. Lower is safer.' },
  { name: 'Complexity', value: '4.44', unit: 'average', status: 'WARN',
    line: 'How tangled the code is on average. Higher means harder to test and change.' },
  { name: 'Duplication', value: '3.37%', unit: 'of the code', status: 'OK',
    line: 'How much of the code is copied and pasted. Lower is cleaner.' },
  { name: 'Scope drift', value: '49', unit: 'count', status: 'RISK',
    line: 'How far the code wandered from what it was actually asked to build.' },
];

const statusColor: Record<string, string> = {
  OK: 'text-emerald-400 border-emerald-400/30',
  WARN: 'text-amber-400 border-amber-400/30',
  RISK: 'text-red-400 border-red-400/30',
};

const useCases = [
  {
    who: 'Engineering leaders',
    what: 'Measure a tool before it is standard issue across your team, on your own briefs rather than a vendor benchmark.',
  },
  {
    who: 'Procurement and risk',
    what: 'Establish the quality-and-governance profile of a coding tool before it sits inside a governance boundary, not after.',
  },
  {
    who: 'CI pipelines',
    what: 'Gate a merge on specification fidelity the way you already gate on tests, with a single command and an exit code.',
  },
];

export default function InstrumentPage() {
  return (
    <>
      <main id="top">
        <div className="border-b border-white/5">
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="focus-ring rounded-lg text-sm text-muted hover:text-paper">
                ← rumedominic.com
              </Link>
              <Link href="/proof" className="focus-ring rounded-lg text-sm text-muted hover:text-paper">
                The evidence →
              </Link>
            </div>
          </Container>
        </div>

        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Open source · MIT
              </p>
              <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-balance">
                Your tests tell you the code works. They do not tell you it is the
                code you asked for.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                The AI Code Quality Auditor scores what an agent actually shipped: its
                security exposure, its structure, and above all whether it stayed inside
                the specification it was given. It is free, it runs on your machine, and
                it publishes its findings about itself.
              </p>

              <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-5 font-mono text-sm">
                <p className="text-muted">
                  <span className="select-none text-gold">$ </span>
                  pip install ai-code-quality-auditor
                </p>
                <p className="mt-2 text-muted">
                  <span className="select-none text-gold">$ </span>
                  auditor scan .
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://github.com/dominicrume/ai-code-quality-auditor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center justify-center rounded-xl bg-gold-metallic px-6 py-3 text-sm font-semibold text-ink shadow-gold transition-all hover:brightness-110"
                >
                  Read the source
                </a>
                <a
                  href="https://pypi.org/project/ai-code-quality-auditor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-paper transition-all hover:border-white/30"
                >
                  View on PyPI
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* A reading, taken today */}
        <section className="border-t border-white/10 py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                A reading, taken today
              </p>
              <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-tight tracking-tight text-balance">
                Here is the instrument measuring its own code.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                We pointed it at its own source and let it report, warnings and all. These are real
                numbers from a scan on 23 October 2026, not a brochure. A measuring instrument that
                flattered the thing holding it would be worth nothing.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {reading.map((r) => (
                  <div key={r.name} className="rounded-xl border border-white/10 bg-black/40 p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-semibold uppercase tracking-wider text-muted">{r.name}</span>
                      <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${statusColor[r.status]}`}>
                        {r.status}
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold tracking-tight text-paper">{r.value}</span>
                      <span className="text-sm text-muted">{r.unit}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{r.line}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://auditor-dashboard-rume.fly.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center justify-center rounded-xl bg-gold-metallic px-6 py-3 text-sm font-semibold text-ink shadow-gold transition-all hover:brightness-110"
                >
                  See it run live →
                </a>
                <Link
                  href="/blog/a-measuring-instrument-for-ai"
                  className="focus-ring inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-paper transition-all hover:border-white/30"
                >
                  Why a measuring instrument
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <Section
          eyebrow="What it measures"
          title="Five metrics, one of which nobody else reports"
          className="border-t border-white/5"
        >
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {metrics.map((m) => (
              <GlassCard key={m.name} accent={m.accent ? 'gold' : 'blue'}>
                <h3 className="mb-2 text-lg font-semibold">{m.name}</h3>
                <p className="text-sm leading-relaxed text-muted">{m.detail}</p>
              </GlassCard>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Validation"
          title="Measured against human judgement, not asserted"
          intro="Most tools in this space ask you to take their scoring on faith."
          className="border-t border-white/5"
        >
          <div className="mx-auto max-w-3xl">
            <GlassCard>
              <p className="text-muted">
                Two people independently labelled the same sample of generated codebases
                without seeing the instrument&apos;s answers. Agreement between the two
                humans was <strong className="text-paper">κ = 0.870</strong>. Between each
                human and the instrument,{' '}
                <strong className="text-paper">κ = 0.853</strong> and{' '}
                <strong className="text-paper">κ = 0.727</strong>, all three clearing the
                threshold conventionally read as substantial agreement.
              </p>
              <p className="mt-4 text-muted">
                The figures reproduce from the public repository with one command on a
                clean install. Where the raters disagreed with the instrument, they were
                right, and the defect they exposed is published as an erratum with the
                repair and a regression test.
              </p>
              <div className="mt-6">
                <Link
                  href="/proof"
                  className="focus-ring rounded text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
                >
                  The full evidence, including what is deliberately not claimed →
                </Link>
              </div>
            </GlassCard>
          </div>
        </Section>

        <Section
          eyebrow="Who uses it"
          title="Where it earns its place"
          className="border-t border-white/5"
        >
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {useCases.map((u) => (
              <GlassCard key={u.who}>
                <h3 className="mb-2 text-base font-semibold">{u.who}</h3>
                <p className="text-sm leading-relaxed text-muted">{u.what}</p>
              </GlassCard>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
            The measurement layer is free and always will be. What is worth paying for is
            the assurance built on top of it: an audit of your agents against the full
            standard, and the governance that follows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/kya"
              className="focus-ring inline-flex items-center justify-center rounded-xl bg-gold-metallic px-6 py-3 text-sm font-semibold text-ink shadow-gold transition-all hover:brightness-110"
            >
              See the KYA Method Stack
            </Link>
            <Link
              href="/#work"
              className="focus-ring inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-paper transition-all hover:border-white/30"
            >
              Talk about an audit
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
