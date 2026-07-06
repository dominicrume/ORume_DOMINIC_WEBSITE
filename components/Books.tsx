import Image from 'next/image';
import { Section } from './ui/Section';
import { books } from '@/content/books';

export function Books() {
  return (
    <Section
      id="books"
      eyebrow="Author"
      title="Books by Rume Dominic"
      intro="Field guides to blockchain, AI and the future economy. Selected titles are stocked at Waterstones, the UK’s largest bookshop."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {books.map((b) => {
          const cover = (
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-ink-card">
              <Image
                src={b.cover}
                alt={`Cover of ${b.title} by Rume Dominic`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                className={`transition-transform duration-500 group-hover:scale-105 ${
                  b.coverFit === 'contain' ? 'object-contain p-2' : 'object-cover'
                }`}
              />
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </div>
          );
          return (
            <div
              key={b.title}
              className="group glass glass-gold flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
            >
              {b.href ? (
                <a
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring block"
                  aria-label={`${b.title} on Amazon`}
                >
                  {cover}
                </a>
              ) : (
                cover
              )}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-base font-bold text-paper">{b.title}</h3>
                <p className="mt-2 flex-1 text-xs text-muted">{b.blurb}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold">
                  {b.href && (
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring text-blue-glow hover:text-blue"
                    >
                      Amazon →
                    </a>
                  )}
                  {b.waterstones && (
                    <a
                      href={b.waterstones}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring text-gold hover:text-gold-soft"
                    >
                      Waterstones UK →
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
