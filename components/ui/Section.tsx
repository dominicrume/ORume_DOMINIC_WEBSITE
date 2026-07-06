import { ReactNode } from 'react';
import { Container } from './Container';

export function Section({
  id,
  children,
  className = '',
  eyebrow,
  title,
  intro,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <Container>
        {(eyebrow || title || intro) && (
          <div className="mx-auto mb-14 max-w-2xl text-center">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl font-bold text-paper sm:text-4xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
