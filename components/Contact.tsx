import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { ContactForm } from './ContactForm';
import { CalendlyEmbed } from './CalendlyEmbed';
import { site } from '@/content/site';

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Let’s build"
      title="Book a strategy call"
      intro="Tell me what you’re building. Serious institutions and founders only. Engagements start at $5k."
    >
      {/* Clear offers up front - removes pricing friction, a key churn-killer. */}
      <div className="mx-auto mb-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        <div className="glass glass-gold rounded-2xl p-5 text-center">
          <p className="font-display text-3xl font-bold text-gold-shine">Intro call</p>
          <p className="mt-1 text-sm font-semibold text-paper">Scope your project</p>
          <p className="mt-1 text-xs text-muted">
            Bring your AI or Web3 problem. Leave with a clear, actionable plan.
          </p>
        </div>
        <div className="glass glass-blue rounded-2xl p-5 text-center">
          <p className="font-display text-3xl font-bold text-blue-glow">$5k+</p>
          <p className="mt-1 text-sm font-semibold text-paper">Build & advisory engagements</p>
          <p className="mt-1 text-xs text-muted">
            Done-with-you delivery for institutions &amp; funded founders.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard accent="blue">
          <ContactForm />
        </GlassCard>
        <GlassCard accent="gold" className="flex flex-col">
          <h3 className="font-display text-lg font-bold text-gold">Prefer to pick a time?</h3>
          <p className="mt-2 text-sm text-muted">
            Grab a slot directly on my calendar for your strategy call. Or email{' '}
            <a
              href={`mailto:${site.email}`}
              className="focus-ring font-semibold text-blue-glow underline"
            >
              {site.email}
            </a>
            .
          </p>
          <div className="mt-4 flex-1">
            <CalendlyEmbed url={site.calendlyUrl} />
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
