import { describe, it, expect } from 'vitest';
import { parseRss } from '@/lib/rss';

const SAMPLE = `<?xml version="1.0"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Rume Dominic</title>
    <item>
      <title>Blockchain vs AI</title>
      <link>https://medium.com/@dominicrume/blockchain-vs-ai-abc</link>
      <pubDate>Wed, 01 Jan 2025 10:00:00 GMT</pubDate>
      <content:encoded><![CDATA[<p>Once upon a time in the world of <b>tech</b>...</p>]]></content:encoded>
    </item>
    <item>
      <title>Understanding Smart Contracts</title>
      <link>https://medium.com/@dominicrume/smart-contracts-xyz</link>
      <pubDate>Tue, 07 Jan 2025 10:00:00 GMT</pubDate>
      <description>A comprehensive guide.</description>
    </item>
  </channel>
</rss>`;

describe('parseRss', () => {
  it('parses a normal feed into posts with clean fields', () => {
    const posts = parseRss(SAMPLE);
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe('Blockchain vs AI');
    expect(posts[0].link).toContain('medium.com');
    expect(posts[0].snippet).not.toMatch(/</); // HTML stripped
    expect(posts[0].date).toMatch(/^2025-01-01/);
  });

  it('respects the limit', () => {
    expect(parseRss(SAMPLE, 1)).toHaveLength(1);
  });

  it('strips em/en dashes from titles and snippets (human brand voice)', () => {
    const xml = SAMPLE.replace('Blockchain vs AI', 'Blockchain — AI').replace(
      'Once upon a time',
      'From basic — to advanced',
    );
    const posts = parseRss(xml);
    expect(posts[0].title).not.toMatch(/[—–]/);
    expect(posts[0].snippet).not.toMatch(/[—–]/);
  });

  it('returns [] for empty/broken/non-string input (never throws)', () => {
    expect(parseRss('')).toEqual([]);
    expect(parseRss('<not-rss></not-rss>')).toEqual([]);
    // @ts-expect-error intentional bad input
    expect(parseRss(null)).toEqual([]);
    expect(parseRss('<<< totally broken')).toEqual([]);
  });
});
