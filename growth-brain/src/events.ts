/**
 * Event vocabulary shared by the site (producer) and the brain (consumer).
 * Keep this list tight and meaningful. A vague event is noise; a precise one is signal.
 */

export const EVENT_TYPES = [
  'page_view',
  'scroll_depth', // props: { depth: 25|50|75|100 }
  'cta_click', // props: { event: 'offer_audit' | 'cta_book_call' | ... }
  'form_start', // props: { form: 'contact' | 'framework' | 'newsletter' }
  'form_submit', // props: { form }
  'lead_created', // props: { kind: 'contact'|'newsletter'|'framework' }
  'download', // props: { asset: 'kya-framework' }
  'email_open', // from Brevo
  'email_click', // from Brevo
  'deal_stage_change', // props: { from, to, amount }
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export type BrainEvent = {
  id?: string;
  created_at?: string;
  type: EventType | (string & {});
  source?: string;
  session_id?: string;
  anon_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  value?: number;
  props?: Record<string, unknown>;
};
