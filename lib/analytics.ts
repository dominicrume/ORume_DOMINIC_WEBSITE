/**
 * Thin, testable analytics wrapper. Fires to Vercel Analytics (if present) and
 * pushes to window.dataLayer so any tag manager can pick events up. Safe on SSR.
 */

export type AnalyticsEvent =
  | 'cta_book_call'
  | 'cta_join_academy'
  | 'cta_sticky'
  | 'service_builds'
  | 'service_advisory'
  | 'service_academy'
  | 'contact_submit'
  | 'contact_success'
  | 'contact_error'
  | 'newsletter_submit'
  | (string & {});

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    va?: (event: 'event', props: { name: string; [k: string]: unknown }) => void;
  }
}

export function track(event: AnalyticsEvent, props: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  // Vercel Analytics custom event (no-op if the script isn't loaded).
  try {
    window.va?.('event', { name: event, ...props });
  } catch {
    /* never let analytics break the UI */
  }

  // Generic dataLayer push for GTM / other tags.
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...props });

  // Growth Brain: mirror to our own event store as a canonical type.
  sendBeacon(normalizeType(event), { event, ...props });
}

/** Stable per-browser and per-visit identifiers, created lazily on the client. */
function ids(): { anon_id: string; session_id: string } {
  const make = () =>
    (crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  let anon = '';
  let session = '';
  try {
    anon = localStorage.getItem('gb_anon') ?? '';
    if (!anon) localStorage.setItem('gb_anon', (anon = make()));
    session = sessionStorage.getItem('gb_session') ?? '';
    if (!session) sessionStorage.setItem('gb_session', (session = make()));
  } catch {
    /* storage blocked (private mode) -> ephemeral ids are fine */
    anon = anon || make();
    session = session || make();
  }
  return { anon_id: anon, session_id: session };
}

function utms(): Record<string, string | undefined> {
  try {
    const q = new URLSearchParams(window.location.search);
    return {
      utm_source: q.get('utm_source') ?? undefined,
      utm_medium: q.get('utm_medium') ?? undefined,
      utm_campaign: q.get('utm_campaign') ?? undefined,
    };
  } catch {
    return {};
  }
}

/** Map the site's rich event names onto the brain's canonical vocabulary. */
function normalizeType(event: string): string {
  const e = event.toLowerCase();
  if (e === 'page_view' || e === 'scroll_depth') return e;
  if (e.includes('download')) return 'download';
  if (e.includes('success')) return 'lead_created';
  if (e.includes('submit')) return 'form_submit';
  if (e.includes('start')) return 'form_start';
  if (
    e.startsWith('cta_') ||
    e.startsWith('offer_') ||
    e.startsWith('service_') ||
    e.includes('book') ||
    e.includes('join') ||
    e.includes('subscribe')
  ) {
    return 'cta_click';
  }
  return event;
}

/** Best-effort POST to our ingestion route. Uses keepalive so it survives navigation. */
export function sendBeacon(type: string, props: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  try {
    const body = JSON.stringify({
      type,
      source: window.location.pathname,
      ...ids(),
      ...utms(),
      props,
    });
    fetch('/api/events', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    /* analytics must never break the UI */
  }
}
