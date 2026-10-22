import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Footer } from '@/components/Footer';
import { site } from '@/content/site';
import { sortedPosts } from '@/content/posts';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Essays on AI assurance, agentic systems and verifiable accountability, published here rather than on a platform so the work and the link both belong to the same place.',
  alternates: { canonical: `${site.url}/blog`, types: { 'application/rss+xml': `${site.url}/feed.xml` } },
  openGraph: {
    type: 'website',
    url: `${site.url}/blog`,
    title: 'Writing',
    description: 'Essays on AI assurance, agentic systems and verifiable accountability.',
    images: ['/opengraph-image'],
  },
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function BlogIndex() {
  const all = sortedPosts();

  return (
    <>
      <main id="top" className="reading">
        <div className="border-b" style={{ borderColor: 'var(--r-rule)' }}>
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="focus-ring rounded-lg text-sm hover:underline"
                style={{ color: 'var(--r-muted)' }}>
                ← rumedominic.com
              </Link>
              <a
                href="/feed.xml"
                className="focus-ring rounded-lg text-sm hover:underline"
                style={{ color: 'var(--r-muted)' }}
              >
                RSS
              </a>
            </div>
          </Container>
        </div>

        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--r-accent)' }}>
                Writing
              </p>
              <h1 className="font-display text-[clamp(2.1rem,5.4vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-balance">
                Notes from building the part that proves it
              </h1>
              <p className="mt-5 max-w-[46ch] text-lg" style={{ color: 'var(--r-muted)' }}>
                Published here rather than on a platform, so the work and the link belong to
                the same place.
              </p>
            </div>
          </Container>
        </section>

        <Section className="border-t r-rule">
          <div className="mx-auto max-w-3xl">
            {all.length === 0 ? (
              <p style={{ color: 'var(--r-muted)' }}>Nothing published yet.</p>
            ) : (
              <ul className="space-y-12">
                {all.map((p) => (
                  <li key={p.slug}>
                    <article>
                      {p.image ? (
                        <Link href={`/blog/${p.slug}`} className="focus-ring mb-5 block overflow-hidden rounded-xl border"
                          style={{ borderColor: 'var(--r-rule)' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.image} alt={p.title}
                            className="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
                        </Link>
                      ) : null}
                      <p className="text-sm" style={{ color: 'var(--r-muted)' }}>
                        <time dateTime={p.published}>{fmt(p.published)}</time>
                        <span aria-hidden="true"> · </span>
                        {p.readingMinutes} min read
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-[1.7rem]">
                        <Link
                          href={`/blog/${p.slug}`}
                          className="focus-ring rounded-lg hover:underline"
                        >
                          {p.title}
                        </Link>
                      </h2>
                      <p className="mt-3 max-w-[52ch]" style={{ color: 'var(--r-muted)' }}>{p.description}</p>
                      <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs uppercase tracking-wider"
                        style={{ color: 'var(--r-muted)' }}>
                        {p.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
