import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { Section } from '@/components/ui/Section';
import { Footer } from '@/components/Footer';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Proof — the evidence behind the work',
  description:
    'Every claim on this site, with a link you can check yourself: the validated measurement instrument, the inter-rater agreement figures, the open-source packages, and what is deliberately not claimed.',
  alternates: { canonical: `${site.url}/proof` },
  openGraph: {
    images: ['/opengraph-image'],
    type: 'article',
    url: `${site.url}/proof`,
    title: 'Proof — the evidence behind the work',
    description:
      'A validated instrument for auditing AI-generated code, and the receipts for every claim made about it.',
  },
};

/** Every row links to something a stranger can verify without asking us. */
const receipts: { claim: string; where: string; href: string }[] = [
  {
    claim: 'The instrument is open source under MIT',
    where: 'github.com/dominicrume/ai-code-quality-auditor',
    href: 'https://github.com/dominicrume/ai-code-quality-auditor',
  },
  {
    claim: 'It is published and installable',
    where: 'pypi.org · ai-code-quality-auditor',
    href: 'https://pypi.org/project/ai-code-quality-auditor/',
  },
  {
    claim: 'Download counts are third-party measured',
    where: 'pepy.tech',
    href: 'https://pepy.tech/projects/ai-code-quality-auditor',
  },
  {
    claim: 'KYA Rails is in the official Canton Developer Hub catalogue',
    where: 'merged pull request #156, canton-network-devs',
    href: 'https://github.com/canton-network-devs/Canton-Developer-Hub/pull/156',
  },
  {
    claim: 'The mandate-and-receipts engine is published',
    where: 'pypi.org · knowyouragenticai-receipts',
    href: 'https://pypi.org/project/knowyouragenticai-receipts/',
  },
  {
    claim: 'The agreement figures reproduce from the repository',
    where: 'scripts/compute_kappa.py --pre-erratum002',
    href: 'https://github.com/dominicrume/ai-code-quality-auditor/blob/main/docs/KAPPA_RESULTS_001.md',
  },
];

const notClaimed: { heading: string; body: string }[] = [
  {
    heading: 'Not "patented"',
    body: 'KYA is a UK patent application, GB2611754.9, filed in May 2026 and pending. An application is not a grant, and calling it one would be the first thing a diligence process caught.',
  },
  {
    heading: 'Not a perfect agreement score',
    body: 'Repairing a defect the raters exposed lifts agreement with the instrument to κ = 1.000. That figure is circular — the defect was found by the raters and the repair then measured against the same labels — so the published figure remains the weaker 0.853.',
  },
  {
    heading: 'Not adopted by Canton',
    body: 'KYA Rails is catalogued as a partner tool in the Canton Network developer hub repository. That is a listing, not an endorsement, a contract, or a statement about the Foundation.',
  },
  {
    heading: 'Not a whole-project security score',
    body: 'Vulnerability density is measured per language. A JavaScript project scanned by a Python analyser reports a low number because of what the scanner cannot see, not because the code is safe.',
  },
  {
    heading: 'Not yet validated for architectural substitution',
    body: 'Shape detection identifies 6 of 6 deliberately mispaired deliverables and flags none of 24 correct ones. Those controls were built by the same hand as the detector. Independent raters are being recruited, and until they have worked the result stands as a self-check.',
  },
];

export default function ProofPage() {
  return (
    <>
      <main id="top">
        <div className="border-b border-white/5">
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="focus-ring rounded-lg text-sm text-muted hover:text-paper">
                ← rumedominic.com
              </Link>
              <Link href="/kya" className="focus-ring rounded-lg text-sm text-muted hover:text-paper">
                The KYA Method Stack →
              </Link>
            </div>
          </Container>
        </div>

        {/* Thesis first: the distinction the whole body of work rests on. */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Evidence
              </p>
              <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-balance">
                A benchmark cannot tell you the agent built the wrong thing.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Neither can a scope-creep count, if the agent did not add anything. It
                replaced. Those are two different failures, and measuring only the first
                is how an AI system passes every test while shipping something nobody
                asked for.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                This page is the evidence for the work behind that sentence. Every claim
                below links to something you can check without asking me.
              </p>
            </div>
          </Container>
        </section>

        {/* The intellectual core. */}
        <Section
          eyebrow="The distinction"
          title="Two failures, not one"
          intro="An instrument that measures addition and calls it governance will miss the more serious failure entirely."
        >
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            <GlassCard>
              <h3 className="mb-3 text-xl font-semibold">Addition</h3>
              <p className="text-muted">
                The agent ships what you asked for, plus things you did not. An extra
                endpoint here, an admin route there. Each one widens the attack surface,
                has to be maintained, and was never reviewed because nobody knew to look
                for it.
              </p>
            </GlassCard>
            <GlassCard accent="gold">
              <h3 className="mb-3 text-xl font-semibold">Substitution</h3>
              <p className="text-muted">
                The agent ships something else entirely. Asked for a command-line tool, it
                builds a scheduled data pipeline. It added nothing, so a scope-creep count
                reports zero — the same score as the tools that got it right. Measured
                behaviour, not a hypothetical.
              </p>
            </GlassCard>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">
            Both are measured, separately, because they fail differently and are fixed
            differently.
          </p>
        </Section>

        {/* What is actually validated, stated precisely. */}
        <Section
          eyebrow="Validation"
          title="What has been tested, and how"
          className="border-t border-white/5"
        >
          <div className="mx-auto max-w-3xl space-y-6">
            <GlassCard>
              <h3 className="mb-3 text-xl font-semibold">
                Agreement with human judgement
              </h3>
              <p className="text-muted">
                Two people labelled the same sample independently, without seeing the
                instrument&apos;s answers. Agreement between them was κ = 0.870; between
                each of them and the instrument, κ = 0.853 and κ = 0.727. All three clear
                the threshold conventionally read as substantial agreement, which is what
                moves a measure from exploratory to usable.
              </p>
              <p className="mt-4 text-muted">
                The figures reproduce from the public repository with one command, on a
                clean install.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 className="mb-3 text-xl font-semibold">
                What the disagreement found
              </h3>
              <p className="text-muted">
                The raters disagreed with the instrument on one item, and they were right:
                its route detector could not see a whole class of web framework, so it had
                scored a case zero by construction rather than by judgement. That defect
                is published as an erratum, the repair is in the code with a regression
                test, and the claim it overturned — one the study had advanced as its
                cleanest result — was withdrawn in the text rather than quietly softened.
              </p>
            </GlassCard>
          </div>
        </Section>

        {/* The receipts. */}
        <Section
          eyebrow="Receipts"
          title="Check any of it yourself"
          intro="Nothing here needs to be taken on trust."
          className="border-t border-white/5"
        >
          <div className="mx-auto max-w-3xl overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-muted">
                  <th className="py-3 pr-4 font-semibold">Claim</th>
                  <th className="py-3 font-semibold">Where to verify</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((r) => (
                  <tr key={r.href} className="border-b border-white/5 align-top">
                    <td className="py-4 pr-4">{r.claim}</td>
                    <td className="py-4">
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring rounded text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
                      >
                        {r.where}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* The section that makes the rest believable. */}
        <Section
          eyebrow="Limits"
          title="What is deliberately not claimed"
          intro="An instrument built to audit other people's work has to hold itself to the standard it enforces."
          className="border-t border-white/5"
        >
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {notClaimed.map((n) => (
              <GlassCard key={n.heading}>
                <h3 className="mb-2 text-lg font-semibold">{n.heading}</h3>
                <p className="text-sm leading-relaxed text-muted">{n.body}</p>
              </GlassCard>
            ))}
          </div>
        </Section>

        <Section className="border-t border-white/5">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              If your agents are making decisions you would have to defend
            </h2>
            <p className="mt-4 text-muted">
              The measurement layer is free and open source. What is worth paying for is
              the assurance built on top of it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/kya"
                className="focus-ring inline-flex items-center justify-center rounded-xl bg-gold-metallic px-6 py-3 text-sm font-semibold text-ink shadow-gold transition-all hover:brightness-110"
              >
                See the KYA Method Stack
              </Link>
              <a
                href="https://github.com/dominicrume/ai-code-quality-auditor"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-paper transition-all hover:border-white/30"
              >
                Run the instrument yourself
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
