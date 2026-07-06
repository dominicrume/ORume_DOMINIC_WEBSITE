import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { CTAButton } from './CTAButton';
import { services } from '@/content/services';

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="What I do"
      title="Three ways to work together"
      intro="From full builds to fixed-scope advisory to team training. Every engagement is spec-driven and security-first."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {services.map((s) => (
          <GlassCard key={s.id} accent={s.accent} className="flex flex-col">
            <p
              className={`text-sm font-semibold ${
                s.accent === 'gold' ? 'text-gold' : 'text-blue-glow'
              }`}
            >
              {s.outcome}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-paper">{s.title}</h3>
            <p className="mt-3 text-sm text-muted">{s.body}</p>
            <ul className="mt-5 space-y-2 text-sm text-paper/90">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className={s.accent === 'gold' ? 'text-gold' : 'text-blue-glow'}>▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-2">
              <CTAButton
                href={s.cta.href}
                event={s.cta.event}
                variant={s.accent === 'gold' ? 'primary' : 'secondary'}
                className="w-full"
              >
                {s.cta.label}
              </CTAButton>
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
