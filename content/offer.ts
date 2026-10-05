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
    'Nobody buys proof. They buy what proof makes possible. Here that is permission: the agent you have already built, cleared to go live, with a verdict your risk function will accept.',
  patentNote: 'Patent-pending framework · UK Intellectual Property Office · GB2611754.9',

  tiers: [
    {
      id: 'audit',
      name: 'Ship the agent',
      price: '$15,000',
      cadence: 'fixed scope · 2 to 3 weeks',
      summary:
        'The agent is built. Risk, legal or the board will not sign it off, and nobody can say exactly what would change their mind. Three weeks later you have the verdict, the gaps and the owner of each one.',
      bullets: [
        'Agent decision map: what it can decide alone vs what needs a human',
        'Provability report and auditability score',
        'Accountability chain with named owners',
        'Regulator-readiness verdict (FCA, ICO, court)',
        'Prioritised 90-day remediation roadmap',
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
        'For teams releasing agents continuously. Sign-off stops being the thing that holds a release, because every new agent and every change arrives already cleared.',
      bullets: [
        'Monthly review of new and changed agents',
        'Live assurance dashboard per agent',
        'Priority access for high-stakes go / no-go calls',
        'Quarterly board-ready assurance report',
      ],
      cta: { label: 'Stop re-litigating', href: '#contact', event: 'offer_retainer' },
      accent: 'blue',
    },
    {
      id: 'licensing',
      name: 'Sell it as your own',
      price: 'from $50,000',
      cadence: 'annual',
      summary:
        'For consultancies and platforms who want to put their own name on the verdict. License the standard, certify your assessors, bill your clients for it.',
      bullets: [
        'License the framework and methodology',
        'Certify your team as KYA-qualified assessors',
        'Co-branded assurance for your clients',
      ],
      cta: { label: 'License the standard', href: '#contact', event: 'offer_licensing' },
      accent: 'blue',
    },
  ] satisfies OfferTier[],

  guarantee:
    'If the KYA Audit does not surface at least three material assurance gaps in your agent that you were not already tracking, the audit is free. You keep the report either way.',
} as const;
