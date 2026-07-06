import { Container } from './ui/Container';
import { CTAButton } from './CTAButton';
import { StatCounter } from './StatCounter';
import { NodeField } from './NodeField';
import { site } from '@/content/site';
import { stats } from '@/content/stats';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pt-24">
      <NodeField />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold">
            {site.role}
          </p>
          <h1 className="font-display text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{site.promise}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">{site.subPromise}</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href={site.cta.primary.href} event={site.cta.primary.event}>
              {site.cta.primary.label}
            </CTAButton>
            <CTAButton
              href={site.cta.secondary.href}
              event={site.cta.secondary.event}
              variant="secondary"
            >
              {site.cta.secondary.label}
            </CTAButton>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
