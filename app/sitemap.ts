import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { sortedPosts } from '@/content/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Posts generate their own entries. A hardcoded list silently stops being
  // the sitemap the moment anything is published.
  const postEntries: MetadataRoute.Sitemap = sortedPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.published),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${site.url}/master-ai`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${site.url}/mena`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${site.url}/framework`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${site.url}/portfolio`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${site.url}/kya`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${site.url}/proof`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${site.url}/instrument`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${site.url}/research`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${site.url}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postEntries,
  ];
}
