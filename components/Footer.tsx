import Image from 'next/image';
import { Container } from './ui/Container';
import { NewsletterForm } from './NewsletterForm';
import { site } from '@/content/site';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-white/[0.02] py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src="/rume-logo.png"
              alt="Rume Dominic"
              width={510}
              height={92}
              className="h-8 w-auto"
            />
            <p className="mt-3 max-w-xs text-sm text-muted">
              Building AI &amp; Web3 products highly capital-efficient and 7x faster with elite engineering.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Connect
            </h3>
            <ul className="mt-4 space-y-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-sm text-paper/90 hover:text-gold"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-muted">
              AI &amp; blockchain insights, occasionally. No spam.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            <a href="/master-ai" className="focus-ring hover:text-paper">
              Master AI in 9 Days
            </a>{' '}
            · Built with the Rume standard.
          </p>
        </div>
      </Container>
    </footer>
  );
}
