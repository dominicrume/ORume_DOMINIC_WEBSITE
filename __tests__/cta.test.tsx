import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const track = vi.fn();
vi.mock('@/lib/analytics', () => ({ track: (...a: unknown[]) => track(...a) }));

import { CTAButton } from '@/components/CTAButton';

describe('CTAButton analytics', () => {
  beforeEach(() => track.mockReset());

  it('fires the analytics event on click', async () => {
    const user = userEvent.setup();
    render(
      <CTAButton href="#contact" event="cta_book_call">
        Book a Strategy Call
      </CTAButton>,
    );
    await user.click(screen.getByRole('link', { name: 'Book a Strategy Call' }));
    expect(track).toHaveBeenCalledWith('cta_book_call', { href: '#contact' });
  });
});
