/**
 * The productized IP: "Know Your AgenticAi" Assurance. Three tiers plus the
 * guarantee, rendered by components/Offer.tsx. Prices in USD.
 * Single source of truth - edit copy here.
 */

export type OfferTier = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  summary: string;
  bullets: string[];
  cta: { label: string; href: string; event: string };
  accent: 'blue' | 'gold';
  featured?: boolean;
  badge?: string;
};

export const offer = {
  eyebrow: 'Work with me',
  title: 'Know Your AgenticAi Assurance',
  intro:
    'You already built the agent. The hard part is getting it signed off. I check it against the standard and give you a clear verdict your risk and legal people will accept, so it can go live.',
  patentNote: 'Patent-pending framework · UK Intellectual Property Office · GB2611754.9',

  tiers: [
    {
      id: 'audit',
      name: 'Ship the agent',
      price: '$15,000',
      cadence: 'fixed scope · 2 to 3 weeks',
      summary:
        'The agent is built. Risk, legal or the board will not sign it off, and nobody can say exactly what would change their mind. In three weeks you have the verdict, every gap, and the person who owns each one.',
      bullets: [
        'A map of what the agent can decide alone, and what needs a human',
        'A report on how provable and auditable it is',
        'A chain of accountability with named owners',
        'A readiness verdict for the regulators (FCA, ICO, court)',
        'A 90-day plan to close the gaps, in priority order',
      ],
      cta: { label: 'Get it cleared', href: '#contact', event: 'offer_audit' },
      accent: 'gold',
      featured: true,
      badge: 'Most popular',
    },
    {
      id: 'retainer',
      name: 'Keep shipping',
      price: '$5,000',
      cadence: 'per month · rolling',
      summary:
        'For teams putting out agents all the time. Sign-off stops being the thing that holds up a release, because every new agent and every change arrives already checked.',
      bullets: [
        'Monthly review of new and changed agents',
        'A live assurance dashboard for each agent',
        'First call on the high-stakes go or no-go decisions',
        'A board-ready report every quarter',
      ],
      cta: { label: 'Keep releases moving', href: '#contact', event: 'offer_retainer' },
      accent: 'blue',
    },
    {
      id: 'licensing',
      name: 'Use it under your own name',
      price: 'from $50,000',
      cadence: 'annual',
      summary:
        'For consultancies and platforms that want to put their own name on the verdict. You license the standard, I train and certify your assessors, and your clients get the assurance from you.',
      bullets: [
        'License the framework and method',
        'Get your team certified as KYA assessors',
        'Co-branded assurance for your clients',
      ],
      cta: { label: 'License the standard', href: '#contact', event: 'offer_licensing' },
      accent: 'blue',
    },
  ] satisfies OfferTier[],

  guarantee:
    'If the audit does not find at least three real gaps in your agent that you were not already tracking, you pay nothing. You keep the report either way.',
} as const;
