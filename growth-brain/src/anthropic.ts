/**
 * Minimal Anthropic Messages API client (raw fetch, no SDK dependency).
 * The reasoning engine behind the brain. Server-side only: needs ANTHROPIC_API_KEY.
 * Never throws on a bad response; returns a typed result so the pipeline degrades gracefully.
 */

// Sonnet 5 is the default: strong reasoning at a routine-analysis price. Override to
// 'claude-opus-4-8' for the deep quarterly strategy pass.
export const DEFAULT_MODEL = 'claude-sonnet-5';

export type ClaudeResult =
  | { ok: true; text: string }
  | { ok: false; reason: 'not_configured' | 'provider_error'; detail?: string };

export async function callClaude(opts: {
  system: string;
  user: string;
  model?: string;
  maxTokens?: number;
}): Promise<ClaudeResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { ok: false, reason: 'not_configured' };

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: opts.model ?? DEFAULT_MODEL,
        max_tokens: opts.maxTokens ?? 4096,
        system: opts.system,
        messages: [{ role: 'user', content: opts.user }],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { ok: false, reason: 'provider_error', detail: detail.slice(0, 500) };
    }

    const json = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const text = (json.content ?? [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text ?? '')
      .join('\n')
      .trim();
    return { ok: true, text };
  } catch (e) {
    return { ok: false, reason: 'provider_error', detail: String(e).slice(0, 200) };
  }
}

/** Pull the first JSON array/object out of a model reply, tolerant of prose or code fences. */
export function extractJson<T>(text: string): T | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.search(/[[{]/);
  if (start === -1) return null;
  for (let end = candidate.length; end > start; end--) {
    const slice = candidate.slice(start, end);
    try {
      return JSON.parse(slice) as T;
    } catch {
      /* keep shrinking */
    }
  }
  return null;
}
