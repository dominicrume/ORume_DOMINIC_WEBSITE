import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { projects, githubUrl } from '@/content/projects';

export function Portfolio() {
  return (
    <Section
      id="portfolio"
      eyebrow="Built in public"
      title="Engineering portfolio"
      intro="Real, open-source systems you can inspect line by line. Not slides, not theory — production code on GitHub."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring"
          >
            <GlassCard accent={i % 2 === 0 ? 'blue' : 'gold'} className="flex h-full flex-col">
              <h3 className="font-display text-base font-bold text-paper">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-paper/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <span className="mt-4 text-xs font-semibold text-blue-glow">View on GitHub →</span>
            </GlassCard>
          </a>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-blue/50 bg-blue/10 px-6 py-3 text-sm font-semibold text-paper hover:bg-blue/20"
        >
          See all 25+ repositories on GitHub →
        </a>
      </div>
    </Section>
  );
}
