import { NextResponse } from 'next/server';
import { insertEvent } from '@/lib/supabase';
import { log } from '@/lib/logger';

export const runtime = 'nodejs';

// Cap payload fields so a malicious client cannot bloat the events table.
const clip = (v: unknown, n = 300) => (typeof v === 'string' ? v.slice(0, n) : undefined);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'bad body' }, { status: 400 });
  }

  const type = clip(body.type, 64);
  if (!type) return NextResponse.json({ error: 'type required' }, { status: 400 });

  // Fire-and-forget from the client's point of view: we accept then store best-effort.
  const stored = await insertEvent({
    type,
    source: clip(body.source),
    session_id: clip(body.session_id, 64),
    anon_id: clip(body.anon_id, 64),
    utm_source: clip(body.utm_source, 120),
    utm_medium: clip(body.utm_medium, 120),
    utm_campaign: clip(body.utm_campaign, 120),
    value: typeof body.value === 'number' ? body.value : undefined,
    props:
      body.props && typeof body.props === 'object'
        ? (body.props as Record<string, unknown>)
        : undefined,
  });
  if (!stored.ok && stored.reason === 'provider_error') {
    log.warn('event failed to store', { route: '/api/events', event_type: type });
  }

  return NextResponse.json({ ok: true }, { status: 202 });
}
