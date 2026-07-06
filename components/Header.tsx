'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from './ui/Container';
import { CTAButton } from './CTAButton';
import { site } from '@/content/site';

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="focus-ring flex items-center" aria-label="Rume Dominic — home">
          <Image
            src="/rume-logo.png"
            alt="Rume Dominic"
            width={510}
            height={92}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring text-sm text-muted transition-colors hover:text-paper"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CTAButton href={site.cta.primary.href} event={site.cta.primary.event}>
            {site.cta.primary.label}
          </CTAButton>
        </div>

        <button
          className="focus-ring rounded-lg border border-white/10 p-2 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-5 bg-paper" />
          <span className="mt-1 block h-0.5 w-5 bg-paper" />
          <span className="mt-1 block h-0.5 w-5 bg-paper" />
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/5 bg-ink/95 lg:hidden">
          <Container className="flex flex-col gap-4 py-4">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="focus-ring py-1 text-muted hover:text-paper"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <CTAButton href={site.cta.primary.href} event={site.cta.primary.event}>
              {site.cta.primary.label}
            </CTAButton>
          </Container>
        </div>
      )}
    </header>
  );
}
