import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/Hero';
import { site } from '@/content/site';

describe('Hero', () => {
  it('renders the exact 5x/7x promise above the fold', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(site.promise);
  });

  it('secondary CTA routes to the Vorem Academy funnel (/master-ai)', () => {
    render(<Hero />);
    const academy = screen.getByRole('link', { name: site.cta.secondary.label });
    expect(academy).toHaveAttribute('href', '/master-ai');
  });
});
