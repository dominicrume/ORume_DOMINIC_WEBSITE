import Image from 'next/image';
import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { about } from '@/content/about';

export function About() {
  return (
    <Section id="about" eyebrow="My why" title={about.heading}>
      <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
        {/* Portrait */}
        <div className="lg:col-span-2">
          <div className="group relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-gold">
            <Image
              src="/rume-headshot.jpg"
              alt="Rume Dominic, AI Engineer, Blockchain Architect and Founder of VOREM"
              width={760}
              height={1140}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            {/* subtle diamond sheen that sweeps across on hover */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-lg font-bold text-paper">Rume Dominic</p>
              <p className="text-xs font-semibold text-gold">
                AI Engineer · Blockchain Architect · Founder of VOREM
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="lg:col-span-3">
          <p className="font-display text-xl font-medium text-paper">{about.lead}</p>
          <div className="mt-6 space-y-4 text-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {about.pillars.map((pillar) => (
          <GlassCard key={pillar.title} accent="gold" className="py-5">
            <h3 className="font-display text-base font-bold text-gold">{pillar.title}</h3>
            <p className="mt-1 text-sm text-muted">{pillar.body}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
