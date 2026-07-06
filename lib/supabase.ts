/**
 * Supabase lead store (server-side only). Inserts a row via the PostgREST REST
 * API using the publishable key. RLS allows INSERT but not SELECT with this key,
 * so leads are write-only from the app and readable only via the dashboard /
 * service role. Never throws - returns a typed result for the route handler.
 */

export type LeadRow = {
  type: 'contact' | 'newsletter';
  email: string;
  name?: string;
  org?: string;
  budget?: string;
  goal?: string;
  source?: string;
};

export type LeadResult =
  | { ok: true }
  | { ok: false; reason: 'not_configured' | 'provider_error' };

export async function saveLead(row: LeadRow): Promise<LeadResult> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) return { ok: false, reason: 'not_configured' };

  try {
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: key,
        authorization: `Bearer ${key}`,
        'content-type': 'application/json',
        prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    if (res.ok) return { ok: true };
    return { ok: false, reason: 'provider_error' };
  } catch {
    return { ok: false, reason: 'provider_error' };
  }
}

/** A behavioural event for the Growth Brain data plane. Write-only from the app. */
export type EventRow = {
  type: string;
  source?: string;
  session_id?: string;
  anon_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  value?: number;
  props?: Record<string, unknown>;
};

/** Inserts an event into the `events` table. Best-effort: analytics never blocks UX. */
export async function insertEvent(row: EventRow): Promise<LeadResult> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) return { ok: false, reason: 'not_configured' };

  try {
    const res = await fetch(`${url}/rest/v1/events`, {
      method: 'POST',
      headers: {
        apikey: key,
        authorization: `Bearer ${key}`,
        'content-type': 'application/json',
        prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    if (res.ok) return { ok: true };
    return { ok: false, reason: 'provider_error' };
  } catch {
    return { ok: false, reason: 'provider_error' };
  }
}
