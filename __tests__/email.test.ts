import { describe, it, expect, vi, afterEach } from 'vitest';
import { sendWelcomeEmail, sendLeadNotification, sendContactAck } from '@/lib/email';

describe('sendWelcomeEmail', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.BREVO_API_KEY;
  });

  it('returns not_configured (never throws) when no API key is set', async () => {
    const res = await sendWelcomeEmail('a@b.com');
    expect(res).toEqual({ ok: false, reason: 'not_configured' });
  });

  it('posts to Brevo transactional email and returns ok on 201', async () => {
    process.env.BREVO_API_KEY = 'test-key';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ messageId: 'x' }), { status: 201 }));
    const res = await sendWelcomeEmail('lead@example.com');
    expect(res).toEqual({ ok: true });
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.brevo.com/v3/smtp/email',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('returns provider_error when Brevo rejects', async () => {
    process.env.BREVO_API_KEY = 'test-key';
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response('nope', { status: 400 }));
    const res = await sendWelcomeEmail('lead@example.com');
    expect(res).toEqual({ ok: false, reason: 'provider_error' });
  });
});

describe('sendContactAck', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.BREVO_API_KEY;
  });

  it('returns not_configured without an API key', async () => {
    expect(await sendContactAck('Ada', 'a@b.com')).toEqual({ ok: false, reason: 'not_configured' });
  });

  it('sends the acknowledgement to the lead', async () => {
    process.env.BREVO_API_KEY = 'test-key';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ messageId: 'x' }), { status: 201 }));
    const res = await sendContactAck('Ada Obi', 'ada@x.com');
    expect(res).toEqual({ ok: true });
    const body = JSON.parse((fetchSpy.mock.calls[0][1] as RequestInit).body as string);
    expect(body.to[0].email).toBe('ada@x.com');
  });
});

describe('sendLeadNotification', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.BREVO_API_KEY;
  });

  it('returns not_configured when no API key is set', async () => {
    const res = await sendLeadNotification({ kind: 'contact', email: 'a@b.com' });
    expect(res).toEqual({ ok: false, reason: 'not_configured' });
  });

  it('emails the notify address on a valid lead', async () => {
    process.env.BREVO_API_KEY = 'test-key';
    process.env.BREVO_NOTIFY_EMAIL = 'owner@example.com';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ messageId: 'x' }), { status: 201 }));
    const res = await sendLeadNotification({ kind: 'contact', email: 'lead@x.com', name: 'Ada' });
    expect(res).toEqual({ ok: true });
    const body = JSON.parse((fetchSpy.mock.calls[0][1] as RequestInit).body as string);
    expect(body.to[0].email).toBe('owner@example.com');
    expect(body.replyTo.email).toBe('lead@x.com');
    delete process.env.BREVO_NOTIFY_EMAIL;
  });
});
