import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { issueToken, verifyToken, GATED_DOCS } from '@/lib/download-token';

const SECRET = 'test-secret-value';

describe('gated download tokens', () => {
  beforeEach(() => {
    process.env.DOWNLOAD_SECRET = SECRET;
  });
  afterEach(() => {
    delete process.env.DOWNLOAD_SECRET;
    vi.restoreAllMocks();
  });

  it('round-trips a token for the document it was issued for', () => {
    const t = issueToken('ada@company.com', 'kya-method');
    const r = verifyToken(t);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.doc).toBe('kya-method');
      expect(r.email).toBe('ada@company.com');
    }
  });

  it('rejects a tampered payload', () => {
    const t = issueToken('ada@company.com', 'kya-method');
    const [, sig] = t.split('.');
    const forged = `${Buffer.from(
      JSON.stringify({ e: 'x@y.com', d: 'kya-architecture', x: Date.now() + 1000 }),
    ).toString('base64url')}.${sig}`;
    expect(verifyToken(forged)).toEqual({ ok: false, reason: 'bad_signature' });
  });

  it('rejects a token signed with a different secret', () => {
    const t = issueToken('ada@company.com', 'kya-method');
    process.env.DOWNLOAD_SECRET = 'a-different-secret';
    expect(verifyToken(t)).toEqual({ ok: false, reason: 'bad_signature' });
  });

  it('expires', () => {
    const past = Date.now() - 72 * 60 * 60 * 1000;
    const t = issueToken('ada@company.com', 'kya-method', past);
    expect(verifyToken(t)).toEqual({ ok: false, reason: 'expired' });
  });

  it('refuses junk without throwing', () => {
    for (const junk of [null, '', 'nope', 'a.b', '....']) {
      expect(verifyToken(junk as string | null).ok).toBe(false);
    }
  });

  it('only serves documents on the allow-list', () => {
    const payload = Buffer.from(
      JSON.stringify({ e: 'a@b.com', d: '../../etc/passwd', x: Date.now() + 10000 }),
    ).toString('base64url');
    // Sign it properly so only the allow-list can reject it.
    const { createHmac } = require('node:crypto');
    const sig = createHmac('sha256', SECRET).update(payload).digest('base64url');
    expect(verifyToken(`${payload}.${sig}`)).toEqual({ ok: false, reason: 'unknown_doc' });
  });

  it('every allow-listed document maps to a real file on disk', async () => {
    const { existsSync } = await import('node:fs');
    const path = await import('node:path');
    for (const meta of Object.values(GATED_DOCS)) {
      expect(existsSync(path.join(process.cwd(), 'private-assets', meta.file))).toBe(true);
    }
  });

  it('the gated files are NOT in public/, or the gate is decorative', async () => {
    const { existsSync } = await import('node:fs');
    const path = await import('node:path');
    for (const meta of Object.values(GATED_DOCS)) {
      expect(existsSync(path.join(process.cwd(), 'public', meta.file))).toBe(false);
    }
  });
});

describe('POST /api/waitlist with the gate', () => {
  beforeEach(() => {
    process.env.DOWNLOAD_SECRET = SECRET;
  });
  afterEach(() => {
    delete process.env.DOWNLOAD_SECRET;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_KEY;
    vi.restoreAllMocks();
  });

  const post = async (body: unknown) => {
    const { POST } = await import('@/app/api/waitlist/route');
    return POST(
      new Request('http://localhost/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }),
    );
  };

  const valid = { first_name: 'Ada', email: 'ada@company.com', phone: '+44 7700 900123' };

  it('requires a phone number', async () => {
    const res = await post({ first_name: 'Ada', email: 'ada@company.com' });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.fields?.phone).toBeTruthy();
  });

  it('rejects a phone number that is not one', async () => {
    const res = await post({ ...valid, phone: 'call me' });
    expect(res.status).toBe(400);
  });

  it('returns a working download link when a document is requested', async () => {
    const res = await post({ ...valid, doc: 'kya-method' });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    const token = new URL(`http://x${body.download}`).searchParams.get('t');
    const verified = verifyToken(token);
    expect(verified.ok).toBe(true);
    if (verified.ok) expect(verified.doc).toBe('kya-method');
  });

  it('does not issue a link when no document was requested', async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect((await res.json()).download).toBeUndefined();
  });

  it('still rejects the honeypot', async () => {
    const res = await post({ ...valid, company_website: 'http://spam' });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('Rejected.');
  });
});

describe('delivery and failure paths', () => {
  beforeEach(() => {
    process.env.DOWNLOAD_SECRET = 'test-secret-value';
  });
  afterEach(() => {
    delete process.env.DOWNLOAD_SECRET;
    delete process.env.BREVO_API_KEY;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_KEY;
    vi.restoreAllMocks();
  });

  const post = async (body: unknown) => {
    const { POST } = await import('@/app/api/waitlist/route');
    return POST(
      new Request('http://localhost/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }),
    );
  };
  const lead = {
    first_name: 'Ada',
    email: 'ada@company.com',
    phone: '+44 7700 900123',
    doc: 'kya-method',
  };

  it('emails the link when mail is configured, and says so', async () => {
    process.env.BREVO_API_KEY = 'test-key';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 201 }));
    const res = await post(lead);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.emailed).toBe(true);
    expect(body.download).toBeTruthy();
    const sentToBrevo = fetchSpy.mock.calls.some((c) => String(c[0]).includes('brevo'));
    expect(sentToBrevo).toBe(true);
  });

  it('still returns the on-screen link when the email provider fails', async () => {
    process.env.BREVO_API_KEY = 'test-key';
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response('nope', { status: 500 }));
    const res = await post(lead);
    const body = await res.json();
    // The lead is captured and the visitor still gets their download.
    expect(res.status).toBe(200);
    expect(body.emailed).toBe(false);
    expect(body.download).toBeTruthy();
  });

  it('survives the email client throwing outright', async () => {
    process.env.BREVO_API_KEY = 'test-key';
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network down'));
    const res = await post(lead);
    expect(res.status).toBe(200);
    expect((await res.json()).emailed).toBe(false);
  });

  it('captures the lead but issues no link when no signing secret exists', async () => {
    delete process.env.DOWNLOAD_SECRET;
    delete process.env.BRAIN_WEEKLY_SECRET;
    const res = await post(lead);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.download).toBeUndefined();
  });
});
