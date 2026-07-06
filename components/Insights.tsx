import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { fetchPosts } from '@/lib/rss';
import { site } from '@/content/site';

// Revalidate the feed hourly (ISR).
export const revalidate = 3600;

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export async function Insights() {
  const posts = await fetchPosts(site.mediumRss, 4);

  return (
    <Section
      id="insights"
      eyebrow="Insights"
      title="Latest writing"
      intro="Notes on AI, blockchain, Web3 and building across Africa."
    >
      {posts.length === 0 ? (
        <div className="text-center">
          <p className="text-muted">
            Fresh articles are published on Medium.{' '}
            <a
              href={`https://medium.com/@dominicrume`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring font-semibold text-blue-glow underline"
            >
              Read them here →
            </a>
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((p) => (
            <a
              key={p.link}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring"
            >
              <GlassCard accent="blue">
                {p.date && (
                  <p className="text-xs uppercase tracking-widest text-gold">
                    {formatDate(p.date)}
                  </p>
                )}
                <h3 className="mt-2 font-display text-lg font-bold text-paper">{p.title}</h3>
                {p.snippet && <p className="mt-2 text-sm text-muted">{p.snippet}…</p>}
              </GlassCard>
            </a>
          ))}
        </div>
      )}
    </Section>
  );
}
