import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { quotes, award, feature, video } from '@/content/proof';

export function Proof() {
  return (
    <Section
      id="proof"
      eyebrow="Proof"
      title="Recognised work, real outcomes"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Awards / features */}
        <div className="grid gap-6">
          {[award, feature].map((a) => (
            <a
              key={a.title}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring"
            >
              <GlassCard accent="gold">
                <h3 className="font-display text-lg font-bold text-gold">{a.title}</h3>
                <p className="mt-2 text-sm text-muted">{a.detail}</p>
                <span className="mt-3 inline-block text-xs font-semibold text-blue-glow">
                  Read more →
                </span>
              </GlassCard>
            </a>
          ))}
        </div>

        {/* Video */}
        {video && (
          <GlassCard accent="blue" className="overflow-hidden">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-sm text-muted">{video.title}</p>
          </GlassCard>
        )}
      </div>

      {/* Testimonials */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {quotes.map((q, i) => (
          <GlassCard key={i} accent="blue">
            <p className="text-paper/90">“{q.text}”</p>
            <footer className="mt-4 text-sm">
              <span className="font-semibold text-paper">{q.author}</span>
              <span className="text-muted">, {q.title}</span>
              {q.placeholder && (
                <span className="ml-2 rounded bg-gold/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-gold">
                  replace before launch
                </span>
              )}
            </footer>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
