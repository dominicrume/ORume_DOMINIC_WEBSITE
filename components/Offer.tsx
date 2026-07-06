import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { CTAButton } from './CTAButton';
import { offer } from '@/content/offer';

/**
 * "Work with me" - the productized IP offer (Know Your AgenticAi Assurance).
 * Three tiers, the featured audit highlighted, plus the risk-reversal guarantee.
 */
export function Offer() {
  return (
    <Section id="work" eyebrow={offer.eyebrow} title={offer.title} intro={offer.intro}>
      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {offer.tiers.map((t) => (
          <GlassCard
            key={t.id}
            accent={t.accent}
            className={`flex flex-col ${
              t.featured ? 'ring-1 ring-gold/40 lg:-mt-2 lg:mb-2' : ''
            }`}
          >
            {t.badge && (
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-gold-metallic px-3 py-1 text-xs font-bold text-ink shadow-gold">
                {t.badge}
              </span>
            )}
            <h3 className="font-display text-xl font-bold text-paper">{t.name}</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span
                className={`font-display text-3xl font-bold ${
                  t.accent === 'gold' ? 'text-gold-shine' : 'text-paper'
                }`}
              >
                {t.price}
              </span>
              <span className="text-xs text-muted">{t.cadence}</span>
            </div>
            <p className="mt-3 text-sm text-muted">{t.summary}</p>
            <ul className="mt-5 space-y-2 text-sm text-paper/90">
              {t.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className={t.accent === 'gold' ? 'text-gold' : 'text-blue-glow'}>▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <CTAButton
                href={t.cta.href}
                event={t.cta.event}
                variant={t.accent === 'gold' ? 'primary' : 'secondary'}
                className="w-full"
              >
                {t.cta.label}
              </CTAButton>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Risk reversal: the guarantee does the closing. */}
      <div className="glass glass-gold mx-auto mt-10 max-w-3xl rounded-2xl p-6 text-center sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          The guarantee
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-paper">{offer.guarantee}</p>
        <p className="mt-4 text-xs text-muted">{offer.patentNote}</p>
      </div>
    </Section>
  );
}
