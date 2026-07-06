import { Section } from './ui/Section';
import { YouTubeFacade } from './YouTubeFacade';
import { videos } from '@/content/videos';
import { engagements } from '@/content/speaking';

export function Media() {
  return (
    <Section
      id="media"
      eyebrow="As seen on"
      title="Media &amp; press"
      intro="Rume Dominic on Channels Television and Plus TV Africa, breaking down AI, crypto and the future of money."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <div key={v.id} className="glass glass-blue overflow-hidden">
            <YouTubeFacade id={v.id} title={v.title} />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                {v.source}
              </p>
              <h3 className="mt-1 font-display text-sm font-bold text-paper">{v.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Speaking &amp; events
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {engagements.map((e) => (
            <a
              key={e.title}
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring glass glass-gold flex flex-col p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-glow">
                {e.role}
              </span>
              <h4 className="mt-1 font-display text-base font-bold text-paper">{e.title}</h4>
              <p className="mt-2 flex-1 text-sm text-muted">{e.detail}</p>
              <span className="mt-3 text-xs font-semibold text-gold">View →</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
