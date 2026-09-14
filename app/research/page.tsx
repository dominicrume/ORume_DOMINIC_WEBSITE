import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { Section } from '@/components/ui/Section';
import { Footer } from '@/components/Footer';
import { DissertationGate } from '@/components/DissertationGate';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Measuring the Unmeasured — MSc dissertation on auditing agentic AI coding tools',
  description:
    'A pre-registered, blinded instrument for auditing the code quality and governance behaviour of agentic AI coding workflows. Aston University, 2026. Read the abstract and download the full dissertation.',
  alternates: { canonical: `${site.url}/research` },
  openGraph: {
    images: ['/opengraph-image'],
    type: 'article',
    url: `${site.url}/research`,
    title: 'Measuring the Unmeasured',
    description:
      'What happens when an AI agent builds the wrong thing, and why no benchmark notices.',
  },
};

const findings = [
  {
    title: 'An agent overrode an unambiguous specification',
    body: 'Given a brief for a command-line tool, under a clean workspace with an explicit instruction prohibiting pipeline output, one commercial agent shipped a data pipeline instead. Its pretrained architectural bias beat the brief.',
  },
  {
    title: 'Tool quality depends on the task',
    body: 'Every testable metric showed a significant condition-by-specification interaction. The defensible claim is never "tool X beats tool Y", only "tool X beats tool Y for this kind of work".',
  },
  {
    title: 'The validation found a defect in the instrument',
    body: 'Two independent raters disagreed with the tool on one item, and they were right: it could not see a whole class of web framework. The erratum, the repair and the withdrawn claim are all published in the text.',
  },
];

export default function ResearchPage() {
  return (
    <>
      <main id="top">
        <div className="border-b border-white/5">
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="focus-ring rounded-lg text-sm text-muted hover:text-paper">
                ← rumedominic.com
              </Link>
              <Link
                href="/instrument"
                className="focus-ring rounded-lg text-sm text-muted hover:text-paper"
              >
                The instrument →
              </Link>
            </div>
          </Container>
        </div>

        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                MSc dissertation · Aston University · 2026
              </p>
              <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-balance">
                Measuring the Unmeasured
              </h1>
              <p className="mt-3 text-lg text-muted">
                An empirical instrument for auditing the code-quality and governance
                behaviour of agentic AI coding workflows.
              </p>
              <p className="mt-6 text-sm text-muted">
                MSc Artificial Intelligence and Business Strategy · Supervisors: Julien
                Barney and Kate Sugden · Aligned to the Aston–Capgemini Centre of
                Excellence for Enterprise AI
              </p>
            </div>
          </Container>
        </section>

        <Section eyebrow="Abstract" title="The problem it addresses" className="border-t border-white/5">
          <div className="mx-auto max-w-3xl space-y-5 text-muted">
            <p>
              Agentic AI coding tools went from research demonstration to mainstream
              developer infrastructure in under three years. Enterprise adoption is
              outpacing the evidence needed to govern it: procurement decisions rest on
              vendor benchmarks that measure whether generated code passes tests, while
              staying silent on the properties that determine what it costs to own —
              security exposure, structural complexity, redundancy, and above all
              fidelity to the specification that was actually requested.
            </p>
            <p>
              This dissertation designs, builds and applies an instrument that quantifies
              five metrics across five workflow conditions — a hand-coded human baseline
              and four commercial agentic tools — against three fixed specifications
              spanning distinct task domains. The design is pre-registered, and the
              analysis is blinded by construction: one capture contract forces every
              condition, human keystrokes and agent tool-calls alike, into a single
              comparable shape, and the metric code is never told which condition
              produced what it is scoring.
            </p>
            <p>
              The contribution is threefold: a reusable, vendor-agnostic measurement
              instrument and its capture contract; a pre-registered cross-vendor
              comparison that foregrounds governance rather than functional success; and
              a framing of specification fidelity as a first-class, measurable quality
              metric relevant to enterprise AI adoption.
            </p>
          </div>
        </Section>

        <Section
          eyebrow="Findings"
          title="Three results worth the read"
          className="border-t border-white/5"
        >
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            {findings.map((f) => (
              <GlassCard key={f.title}>
                <h3 className="mb-2 text-base font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{f.body}</p>
              </GlassCard>
            ))}
          </div>
        </Section>

        <Section className="border-t border-white/5">
          <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                The instrument is open source. So is the argument.
              </h2>
              <p className="mt-4 text-muted">
                Everything the dissertation measures can be run on your own code, and the
                statistics reproduce from the public repository. The errata are in the
                text rather than quietly corrected, including the one that overturned a
                claim the study had advanced as its cleanest result.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/instrument"
                  className="focus-ring inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:border-white/30"
                >
                  Run the instrument
                </Link>
                <Link
                  href="/proof"
                  className="focus-ring inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:border-white/30"
                >
                  See the evidence
                </Link>
              </div>
            </div>
            <DissertationGate />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
