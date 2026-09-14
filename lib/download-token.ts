/**
 * Short-lived, signed download tokens for gated assets.
 *
 * The point of the gate is that the asset is not sitting on a public URL that
 * the first recipient can paste into a group chat. The files live outside
 * `public/`, and the only way to reach one is a token this module issued after
 * a lead was captured.
 *
 * Threat model, stated honestly: this stops casual link-sharing and makes the
 * gate mean something. It is not DRM. Someone who fills the form can still
 * forward the PDF, and that is fine — we got the lead.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

/** Assets that may be requested, mapped to the file on disk and its name. */
export const GATED_DOCS = {
  'kya-method': {
    file: 'The_KYA_Method_Detailed_Edition.pdf',
    filename: 'The KYA Method — Detailed Edition.pdf',
    label: 'The KYA Method, Detailed Edition',
  },
  'kya-architecture': {
    file: 'THE_KYA_METHOD_ARCHITECTURE.pdf',
    filename: 'The KYA Method — Engineering Architecture.pdf',
    label: 'The KYA Method, Engineering Architecture',
  },
  dissertation: {
    file: 'Dissertation_FINAL_Uririe_Orume_Dominic.pdf',
    filename: 'Measuring the Unmeasured — Uririe, Orume Dominic (Aston, 2026).pdf',
    label: 'Measuring the Unmeasured (MSc dissertation)',
  },
} as const;

export type GatedDocId = keyof typeof GATED_DOCS;

export const isGatedDocId = (v: unknown): v is GatedDocId =>
  typeof v === 'string' && Object.prototype.hasOwnProperty.call(GATED_DOCS, v);

/** Long enough to read an email and click; short enough that a leaked link dies. */
const TTL_MS = 48 * 60 * 60 * 1000;

function secret(): string {
  // A dedicated secret is preferred; the brain secret is a working fallback so
  // the gate is never silently unsigned in an environment that has one.
  const s = process.env.DOWNLOAD_SECRET || process.env.BRAIN_WEEKLY_SECRET;
  if (!s) throw new Error('No DOWNLOAD_SECRET or BRAIN_WEEKLY_SECRET configured');
  return s;
}

const b64url = (b: Buffer) => b.toString('base64url');

function sign(payload: string): string {
  return b64url(createHmac('sha256', secret()).update(payload).digest());
}

/** Issue a token binding one email to one document for a limited window. */
export function issueToken(email: string, doc: GatedDocId, now = Date.now()): string {
  const payload = b64url(
    Buffer.from(JSON.stringify({ e: email.toLowerCase(), d: doc, x: now + TTL_MS })),
  );
  return `${payload}.${sign(payload)}`;
}

export type TokenResult =
  | { ok: true; doc: GatedDocId; email: string }
  | { ok: false; reason: 'malformed' | 'bad_signature' | 'expired' | 'unknown_doc' };

/** Verify a token. Never throws on bad input — callers get a typed reason. */
export function verifyToken(token: string | null, now = Date.now()): TokenResult {
  if (!token || !token.includes('.')) return { ok: false, reason: 'malformed' };
  const [payload, sig] = token.split('.', 2);
  if (!payload || !sig) return { ok: false, reason: 'malformed' };

  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return { ok: false, reason: 'bad_signature' };
  }

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, reason: 'bad_signature' };
  }

  try {
    const { e, d, x } = JSON.parse(Buffer.from(payload, 'base64url').toString()) as {
      e?: string;
      d?: string;
      x?: number;
    };
    if (!isGatedDocId(d)) return { ok: false, reason: 'unknown_doc' };
    if (typeof x !== 'number' || x < now) return { ok: false, reason: 'expired' };
    return { ok: true, doc: d, email: typeof e === 'string' ? e : '' };
  } catch {
    return { ok: false, reason: 'malformed' };
  }
}
