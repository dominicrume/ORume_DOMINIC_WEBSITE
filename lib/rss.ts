/**
 * Medium RSS fetch + parse. Runs at build time (Server Component / revalidate).
 * Designed to NEVER throw: a broken or empty feed yields an empty array so the
 * Insights section renders a graceful fallback instead of failing the build.
 */
import { XMLParser } from 'fast-xml-parser';

export type Post = {
  title: string;
  link: string;
  date: string; // ISO
  snippet: string;
};

const parser = new XMLParser({ ignoreAttributes: false, trimValues: true });

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Keep the human, no-em-dash brand voice consistent even for dynamic Medium
 * content: em-dashes become commas, en-dashes become hyphens.
 */
function dedash(text: string): string {
  return text
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s*–\s*/g, '-')
    .replace(/\s+,/g, ',')
    .trim();
}

/** Parse a raw RSS XML string into posts. Exported for unit testing. */
export function parseRss(xml: string, limit = 4): Post[] {
  if (!xml || typeof xml !== 'string') return [];
  let doc: unknown;
  try {
    doc = parser.parse(xml);
  } catch {
    return [];
  }

  const channel = (doc as any)?.rss?.channel;
  if (!channel) return [];

  const rawItems = channel.item;
  const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

  return items.slice(0, limit).map((item: any): Post => {
    const body = String(item['content:encoded'] ?? item.description ?? '');
    return {
      title: dedash(String(item.title ?? 'Untitled')),
      link: String(item.link ?? '#'),
      date: item.pubDate ? new Date(String(item.pubDate)).toISOString() : '',
      snippet: dedash(stripHtml(body).slice(0, 160)),
    };
  });
}

/** Fetch + parse the feed. Returns [] on any network/parse failure. */
export async function fetchPosts(feedUrl: string, limit = 4): Promise<Post[]> {
  try {
    const res = await fetch(feedUrl, {
      headers: { 'User-Agent': 'rumedominic.com' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRss(xml, limit);
  } catch {
    return [];
  }
}
