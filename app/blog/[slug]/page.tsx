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
            return <p key={i} className="lead">{b.text}</p>;
          case 'h2':
            return <h2 key={i}>{b.text}</h2>;
          case 'quote':
            return <blockquote key={i}>{b.text}</blockquote>;
          case 'list':
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case 'figures':
            return (
              <figure key={i} className="figures">
                <figcaption>{b.caption}</figcaption>
                <dl>
                  {b.rows.map((r, j) => (
                    <div key={j} className="row">
                      <dt className="k">{r.label}</dt>
                      <dd className={`v ${r.tone === 'bad' ? 'bad' : 'good'}`}>{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </figure>
            );
          default:
            return <p key={i}>{b.text}</p>;
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
      <main id="top" className="reading">
        <div className="border-b" style={{ borderColor: 'var(--r-rule)' }}>
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link href="/blog" className="focus-ring rounded-lg text-sm hover:underline"
                style={{ color: 'var(--r-muted)' }}>
                ← All writing
              </Link>
              <Link href="/proof" className="focus-ring rounded-lg text-sm hover:underline"
                style={{ color: 'var(--r-muted)' }}>
                The evidence →
              </Link>
            </div>
          </Container>
        </div>

        <section className="py-16 sm:py-24">
          <Container>
            <article className="mx-auto max-w-[34rem]">
              <p className="text-sm" style={{ color: 'var(--r-muted)' }}>
                <time dateTime={post.published}>{fmt(post.published)}</time>
                <span aria-hidden="true"> · </span>
                {post.readingMinutes} min read
              </p>
              <h1 className="mt-3 font-display text-[clamp(2.1rem,5.4vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-balance">
                {post.title}
              </h1>
              <p className="mt-5 max-w-[46ch] text-lg" style={{ color: 'var(--r-muted)' }}>{post.description}</p>

              {post.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.image}
                  alt={post.title}
                  className="mt-10 w-full rounded-xl border"
                  style={{ borderColor: 'var(--r-rule)' }}
                />
              ) : null}

              <div className="prose mt-12 max-w-[34rem]">
                <Blocks body={post.body} />
              </div>

              <aside className="mt-14 rounded-xl border p-6"
                style={{ borderColor: 'var(--r-accent)', background: 'color-mix(in srgb, var(--r-accent) 6%, transparent)' }}>
                <p className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--r-accent)' }}>
                  If this is your problem
                </p>
                <p className="mt-3">
                  The instrument in this piece is free and open source. When the finding has
                  to be signed, dated and defensible to a regulator, that is the assurance
                  engagement: one agent or workflow assessed against the standard, with a
                  verdict and a plan to close every gap.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/assurance"
                    className="focus-ring inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                    style={{ background: 'var(--r-accent)' }}
                  >
                    See the engagement
                  </Link>
                  <Link
                    href="/proof"
                    className="focus-ring inline-flex items-center justify-center rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all"
                    style={{ borderColor: 'var(--r-rule)' }}
                  >
                    Check every claim first
                  </Link>
                </div>
              </aside>
              <p className="mt-10 border-t pt-6 text-sm"
                style={{ borderColor: 'var(--r-rule)', color: 'var(--r-muted)' }}>
                {site.legalName} builds verification infrastructure for AI and blockchain
                systems. The measurement instrument is open source and the receipts library
                has no dependencies.
              </p>
            </article>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
