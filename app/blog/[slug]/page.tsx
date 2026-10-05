import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Footer } from '@/components/Footer';
import { site } from '@/content/site';
import { posts, postBySlug, type Block } from '@/content/posts';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { title: 'Not found' };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url: `${site.url}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      authors: [site.legalName],
      tags: post.tags,
      images: [post.image ?? '/opengraph-image'],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

function Blocks({ body }: { body: Block[] }) {
  return (
    <>
      {body.map((b, i) => {
        switch (b.kind) {
          case 'lead':
            return (
              <p key={i} className="mb-6 text-xl leading-relaxed text-paper">
                {b.text}
              </p>
            );
          case 'h2':
            return (
              <h2 key={i} className="mt-12 mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
                {b.text}
              </h2>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="my-8 border-l-2 border-gold pl-5 text-xl font-semibold leading-snug text-gold"
              >
                {b.text}
              </blockquote>
            );
          case 'list':
            return (
              <ul key={i} className="mb-6 list-disc space-y-2 pl-5 text-muted">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case 'figures':
            return (
              <figure key={i} className="my-8 overflow-hidden rounded-xl border border-white/10">
                <figcaption className="border-b border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  {b.caption}
                </figcaption>
                <dl className="divide-y divide-white/5">
                  {b.rows.map((r, j) => (
                    <div key={j} className="flex items-baseline justify-between gap-4 px-4 py-3">
                      <dt className="text-sm text-muted">{r.label}</dt>
                      <dd
                        className={`font-mono text-base font-semibold tabular-nums ${
                          r.tone === 'bad' ? 'text-[#e0604f]' : 'text-gold'
                        }`}
                      >
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </figure>
            );
          default:
            return (
              <p key={i} className="mb-5 leading-relaxed text-muted">
                {b.text}
              </p>
            );
        }
      })}
    </>
  );
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  // Article structured data. Without this a post is just a page to a crawler.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    author: {
      '@type': 'Person',
      name: site.legalName,
      url: site.url,
    },
    publisher: { '@type': 'Person', name: site.legalName, url: site.url },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}/blog/${post.slug}` },
    keywords: post.tags.join(', '),
    ...(post.image ? { image: `${site.url}${post.image}` } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="top">
        <div className="border-b border-white/5">
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link href="/blog" className="focus-ring rounded-lg text-sm text-muted hover:text-paper">
                ← All writing
              </Link>
              <Link href="/proof" className="focus-ring rounded-lg text-sm text-muted hover:text-paper">
                The evidence →
              </Link>
            </div>
          </Container>
        </div>

        <section className="py-16 sm:py-24">
          <Container>
            <article className="mx-auto max-w-3xl">
              <p className="text-sm text-muted">
                <time dateTime={post.published}>{fmt(post.published)}</time>
                <span aria-hidden="true"> · </span>
                {post.readingMinutes} min read
              </p>
              <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-balance">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-muted">{post.description}</p>

              <div className="mt-12">
                <Blocks body={post.body} />
              </div>

              <p className="mt-12 border-t border-white/10 pt-6 text-sm text-muted">
                {site.legalName} builds verification infrastructure for AI and blockchain
                systems. The measurement instrument is open source and the receipts library
                has no dependencies.{' '}
                <Link href="/proof" className="text-gold hover:underline">
                  Every claim here is checkable.
                </Link>
              </p>
            </article>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
