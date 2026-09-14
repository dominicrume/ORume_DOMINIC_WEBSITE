import { describe, it, expect, vi, afterEach } from 'vitest';
import { POST } from '@/app/api/waitlist/route';

function reqWith(body: unknown) {
  return new Request('http://localhost/api/waitlist', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

// Phone is a required field on this route: the KYA leads are followed up by
// call, not only by email. See lib/validation.ts.
const valid = { first_name: 'Ada', email: 'ada@company.com', phone: '+44 7700 900123' };

describe('POST /api/waitlist', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_KEY;
    delete process.env.WAITLIST_WEBHOOK_URL;
  });

  it('returns 200 for valid input when no store is configured', async () => {
    const res = await POST(reqWith(valid));
    expect(res.status).toBe(200);
  });

  it('returns 400 when the phone number is missing', async () => {
    const { phone, ...noPhone } = valid;
    const res = await POST(reqWith(noPhone));
    expect(res.status).toBe(400);
  });

  it('returns 400 for an invalid email', async () => {
    const res = await POST(reqWith({ ...valid, email: 'nope' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when the honeypot is filled', async () => {
    const res = await POST(reqWith({ ...valid, company_website: 'http://spam' }));
    expect(res.status).toBe(400);
  });

  it('returns 502 when the Supabase store errors', async () => {
    process.env.SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_KEY = 'test-key';
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response('boom', { status: 500 }));
    const res = await POST(reqWith(valid));
    expect(res.status).toBe(502);
  });

  it('stores the lead and forwards to the webhook when both are configured', async () => {
    process.env.SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_KEY = 'test-key';
    process.env.WAITLIST_WEBHOOK_URL = 'https://hook.example.com/x';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(null, { status: 201 }));
    const res = await POST(reqWith(valid));
    expect(res.status).toBe(200);
    const urls = fetchSpy.mock.calls.map((c) => String(c[0]));
    expect(urls.some((u) => u.includes('supabase'))).toBe(true);
    expect(urls.some((u) => u.includes('hook.example.com'))).toBe(true);
  });
});
