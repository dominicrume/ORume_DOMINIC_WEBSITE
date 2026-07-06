import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { site } from '@/content/site';

/**
 * Substack subscribe section. Renders only when a real Substack URL is
 * configured (NEXT_PUBLIC_SUBSTACK_URL), so a guessed/broken link never ships.
 */
export function Substack() {
  if (!site.substackUrl) return null;
  const subscribeUrl = site.substackUrl.replace(/\/$/, '') + '/subscribe';

  return (
    <Section id="newsletter" eyebrow="Newsletter">
      <GlassCard accent="gold" className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-bold text-gradient sm:text-3xl">
          Know Your AgenticAi
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">
          My newsletter on provable, auditable AI, and what it actually takes to ship it in
          production. The engineering, the strategy, and the gap between hype and reality.
          Read free on Substack.
        </p>
        <div className="mt-6 flex justify-center">
          <a
            href={subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-gold-metallic px-7 py-3.5 text-sm font-bold text-ink shadow-gold transition-all hover:brightness-110"
          >
            Subscribe on Substack →
          </a>
        </div>
      </GlassCard>
    </Section>
  );
}
