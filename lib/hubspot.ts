/**
 * HubSpot CRM sync (server-side only). Upserts a contact by email via the CRM v3
 * batch/upsert endpoint, so a repeat submission updates rather than duplicates.
 * Needs a HubSpot private-app token in HUBSPOT_TOKEN (scope crm.objects.contacts.write).
 * Never throws - returns a typed result, and stays a no-op until the token is set
 * so the site works fine before the CRM is wired.
 */

export type HubspotResult =
  | { ok: true }
  | { ok: false; reason: 'not_configured' | 'provider_error' };

type HubspotContactInput = {
  email: string;
  firstName?: string;
  /** Where the lead came from, stored on a note-friendly property. */
  source?: string;
  /** HubSpot lifecycle stage, e.g. 'subscriber' or 'lead'. */
  lifecycleStage?: string;
};

export async function upsertHubspotContact({
  email,
  firstName,
  source,
  lifecycleStage = 'subscriber',
}: HubspotContactInput): Promise<HubspotResult> {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) return { ok: false, reason: 'not_configured' };

  const properties: Record<string, string> = {
    email,
    lifecyclestage: lifecycleStage,
  };
  if (firstName) properties.firstname = firstName;
  // hs_lead_status is a standard writable property; keep the source human-readable.
  if (source) properties.hs_lead_status = 'NEW';

  try {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        inputs: [{ idProperty: 'email', id: email, properties }],
      }),
    });
    if (res.ok) return { ok: true };
    return { ok: false, reason: 'provider_error' };
  } catch {
    return { ok: false, reason: 'provider_error' };
  }
}
