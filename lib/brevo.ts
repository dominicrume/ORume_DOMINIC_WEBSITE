/**
 * Brevo (server-side only) - add a contact to a list. Never import in client code.
 * Returns a discriminated result so route handlers can map to HTTP status without
 * leaking provider details to the client.
 */

export type BrevoResult =
  | { ok: true }
  | { ok: false; reason: 'not_configured' | 'provider_error' };

type BrevoContactInput = {
  email: string;
  listId?: number;
  attributes?: Record<string, unknown>;
};

export async function addContact({
  email,
  listId,
  attributes = {},
}: BrevoContactInput): Promise<BrevoResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey || !listId) {
    // Allows local/dev + preview deploys to work before secrets are set.
    return { ok: false, reason: 'not_configured' };
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes,
        listIds: [listId],
        updateEnabled: true, // idempotent: re-submitting the same email updates it
      }),
    });

    // 201 created, 204 updated. Brevo returns 400 "duplicate" when already present
    // even with updateEnabled in some cases - treat as success.
    if (res.ok || res.status === 204) return { ok: true };
    const body = await res.text();
    if (body.includes('duplicate_parameter')) return { ok: true };
    return { ok: false, reason: 'provider_error' };
  } catch {
    return { ok: false, reason: 'provider_error' };
  }
}
