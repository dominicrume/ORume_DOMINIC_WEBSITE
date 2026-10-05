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
      <main id="top">
        <div className="border-b border-white/5">
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="focus-ring rounded-lg text-sm text-muted hover:text-paper">
                ← rumedominic.com
              </Link>
              <a
                href="/feed.xml"
                className="focus-ring rounded-lg text-sm text-muted hover:text-paper"
              >
                RSS
              </a>
            </div>
          </Container>
        </div>

        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Writing
              </p>
              <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-balance">
                Notes from building the part that proves it
              </h1>
              <p className="mt-4 text-lg text-muted">
                Published here rather than on a platform, so the work and the link belong to
                the same place.
              </p>
            </div>
          </Container>
        </section>

        <Section className="border-t border-white/5">
          <div className="mx-auto max-w-3xl">
            {all.length === 0 ? (
              <p className="text-muted">Nothing published yet.</p>
            ) : (
              <ul className="space-y-10">
                {all.map((p) => (
                  <li key={p.slug}>
                    <article>
                      <p className="text-sm text-muted">
                        <time dateTime={p.published}>{fmt(p.published)}</time>
                        <span aria-hidden="true"> · </span>
                        {p.readingMinutes} min read
                      </p>
                      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                        <Link
                          href={`/blog/${p.slug}`}
                          className="focus-ring rounded-lg hover:text-gold"
                        >
                          {p.title}
                        </Link>
                      </h2>
                      <p className="mt-3 text-muted">{p.description}</p>
                      <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs uppercase tracking-wider text-muted/80">
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
