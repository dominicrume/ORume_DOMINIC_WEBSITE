import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCounter } from '@/components/StatCounter';

describe('StatCounter', () => {
  it('exposes the full target value (59,000) via the accessible label', () => {
    render(<StatCounter stat={{ value: 59000, suffix: '+', label: 'Hours' }} />);
    // aria-label always carries the final value regardless of animation state.
    expect(screen.getByLabelText(/59,000\+ Hours/)).toBeInTheDocument();
  });

  it('renders a static stat as its label, not a counter', () => {
    render(
      <StatCounter stat={{ value: 0, label: 'SIBAN Executive Member', static: true }} />,
    );
    expect(screen.getByText('SIBAN Executive Member')).toBeInTheDocument();
  });
});
