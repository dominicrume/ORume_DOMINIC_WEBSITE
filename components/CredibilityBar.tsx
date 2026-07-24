import { Container } from './ui/Container';
import { credentials } from '@/content/credibility';

export function CredibilityBar() {
  return (
    <div className="border-y border-white/5 bg-white/[0.02] py-8">
      <Container>
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted">
          Trusted · Elite · Recognised
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {credentials.map((c) => {
            const inner = (
              <span className="flex flex-col items-center text-center">
                <span className="font-display text-lg font-bold text-paper">{c.name}</span>
                <span className="text-xs text-muted">{c.detail}</span>
              </span>
            );
            return (
              <li key={c.name}>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring opacity-80 transition-opacity hover:opacity-100"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
