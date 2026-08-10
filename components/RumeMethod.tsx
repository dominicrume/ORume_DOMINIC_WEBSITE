import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { method } from '@/content/method';

export function RumeMethod() {
  return (
    <Section
      id="method"
      eyebrow="How it ships"
      title="The Rume Method"
      intro="No vibe coding. A disciplined path from idea to a deployed, observable system."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {method.map((m, i) => (
          <GlassCard key={m.step} accent={i === 1 ? 'gold' : 'blue'}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/15 font-display text-lg font-bold text-blue-glow">
                {m.step}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-paper">{m.title}</h3>
                <p className="text-xs uppercase tracking-widest text-gold">{m.tagline}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">{m.body}</p>
          </GlassCard>
        ))}
      </div>
      
      <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="/The_KYA_Method_Detailed_Edition.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-blue/10 border border-blue/20 px-6 py-3.5 text-sm font-bold text-blue-glow transition-all hover:bg-blue/20"
        >
          Read the Original Publication (PDF) →
        </a>
        <a
          href="/THE_KYA_METHOD_ARCHITECTURE.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-gold-metallic px-6 py-3.5 text-sm font-bold text-ink shadow-gold transition-all hover:brightness-110"
        >
          Download Engineering Architecture (PDF) →
        </a>
      </div>
    </Section>
  );
}
