'use client';

import Link from 'next/link';
import { track, type AnalyticsEvent } from '@/lib/analytics';

type Props = {
  href: string;
  event?: AnalyticsEvent;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
};

export function CTAButton({
  href,
  event,
  variant = 'primary',
  children,
  className = '',
}: Props) {
  const base =
    'focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200';
  const styles =
    variant === 'primary'
      ? 'bg-gold-metallic text-ink shadow-gold hover:brightness-110'
      : 'border border-blue/50 bg-blue/10 text-paper hover:bg-blue/20';

  const isHash = href.startsWith('#');
  const handleClick = () => {
    if (event) track(event, { href });
  };

  if (isHash) {
    return (
      <a href={href} onClick={handleClick} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      // /master-ai is a static-file rewrite with no RSC payload — prefetch would 404.
      prefetch={false}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
