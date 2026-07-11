import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { NewsletterForm } from './NewsletterForm';
import { access } from '@/content/access';

/**
 * Prominent free-resource capture: the AI book + 9-day course. This is the top-of-funnel
 * hook. The email capture reuses NewsletterForm, which stores the lead, emails Rume a
 * notification, sends the welcome email, and hands the visitor straight to /access for the
 * instant downloads. Placed high on the page so the offer is impossible to miss.
 */
export function FreeAccess() {
  return (
    <Section
      id="free"
      eyebrow="Free access"
      title="Get my AI book and 9-day course, free"
      intro="No cost, no catch. Enter your email and you get instant access to my book and my beginner-to-confident AI course, right now."
    >
      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-5">
        {/* The two resources */}
        <div className="grid gap-4 lg:col-span-3 sm:grid-cols-2">
          {access.resources.map((r) => (
            <GlassCard key={r.title} accent={r.tag === 'Free book' ? 'gold' : 'blue'}>
              <p
                className={`text-xs font-bold uppercase tracking-[0.15em] ${
                  r.tag === 'Free book' ? 'text-gold' : 'text-blue-glow'
                }`}
              >
                {r.tag}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-paper">{r.title}</h3>
              <p className="mt-2 text-sm text-muted">{r.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* The capture */}
        <GlassCard accent="gold" className="lg:col-span-2 flex flex-col justify-center">
          <h3 className="font-display text-lg font-bold text-paper">Send them to me now</h3>
          <p className="mt-2 text-sm text-muted">
            Enter your email. Your downloads open instantly, and land in your inbox too.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
          <p className="mt-3 text-xs text-muted">
            No spam. Unsubscribe anytime.
          </p>
        </GlassCard>
      </div>
    </Section>
  );
}
