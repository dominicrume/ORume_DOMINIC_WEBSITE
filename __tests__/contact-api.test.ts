import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '@/app/api/contact/route';

function reqWith(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const valid = {
  name: 'Ada Obi',
  email: 'ada@company.com',
  org: 'Acme',
  budget: '$5k to $25k',
  goal: 'We want to build an AI agent for support.',
};

describe('POST /api/contact', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.BREVO_API_KEY;
    delete process.env.BREVO_CONTACT_LIST_ID;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_KEY;
  });

  it('returns 200 for valid input when no store is configured', async () => {
    const res = await POST(reqWith(valid));
    expect(res.status).toBe(200);
  });

  it('returns 400 for invalid input', async () => {
    const res = await POST(reqWith({ ...valid, email: 'bad' }));
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

  it('returns 200 and stores the lead when Supabase succeeds', async () => {
    process.env.SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_KEY = 'test-key';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(null, { status: 201 }));
    const res = await POST(reqWith(valid));
    expect(res.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://example.supabase.co/rest/v1/leads',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('returns 400 for a non-JSON body', async () => {
    const bad = new Request('http://localhost/api/contact', { method: 'POST', body: '{oops' });
    const res = await POST(bad);
    expect(res.status).toBe(400);
  });
});
