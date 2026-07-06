import { ReactNode } from 'react';

export function GlassCard({
  children,
  className = '',
  accent = 'blue',
}: {
  children: ReactNode;
  className?: string;
  accent?: 'blue' | 'gold';
}) {
  const glow = accent === 'gold' ? 'glass-gold' : 'glass-blue';
  return (
    <div
      className={`glass ${glow} p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
