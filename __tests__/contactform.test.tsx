import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@/lib/analytics', () => ({ track: vi.fn() }));

import { ContactForm } from '@/components/ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('blocks submit on invalid email and shows an error (no backend call)', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('Name'), 'Ada');
    await user.type(screen.getByLabelText('Email'), 'not-an-email');
    await user.selectOptions(screen.getByLabelText('Budget range'), '$5k to $25k');
    await user.type(screen.getByLabelText(/What do you want to build/), 'Build an AI agent platform');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(/valid email/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('rejects a filled honeypot without calling the backend', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);

    // Fill required fields legitimately...
    await user.type(screen.getByLabelText('Name'), 'Ada');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.selectOptions(screen.getByLabelText('Budget range'), '$5k to $25k');
    await user.type(screen.getByLabelText(/What do you want to build/), 'Build an AI agent platform');
    // ...but a bot also fills the hidden honeypot.
    const honeypot = container.querySelector<HTMLInputElement>('input[name="company_website"]')!;
    honeypot.value = 'http://spam.example';

    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('posts valid input and shows a success message', async () => {
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('Name'), 'Ada');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.selectOptions(screen.getByLabelText('Budget range'), '$5k to $25k');
    await user.type(screen.getByLabelText(/What do you want to build/), 'Build an AI agent platform');
    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledWith('/api/contact', expect.anything()));
    expect(await screen.findByRole('status')).toHaveTextContent(/thanks/i);
  });
});
