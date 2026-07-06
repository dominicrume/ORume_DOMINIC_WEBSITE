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
    'Deploy AI agents at full speed without carrying invisible risk. A fixed-scope way to prove your agents are provable, auditable and accountable, built on a patent-pending standard.',
  patentNote: 'Patent-pending framework · UK Intellectual Property Office · GB2611754.9',

  tiers: [
    {
      id: 'audit',
      name: 'KYA Audit',
      price: '$15,000',
      cadence: 'fixed scope · 2 to 3 weeks',
      summary:
        'A full assessment of one AI agent or workflow against the standard, with a clear verdict and a plan to close every gap.',
      bullets: [
        'Agent decision map: what it can decide alone vs what needs a human',
        'Provability report and auditability score',
        'Accountability chain with named owners',
        'Regulator-readiness verdict (FCA, ICO, court)',
        'Prioritised 90-day remediation roadmap',
      ],
      cta: { label: 'Book an audit', href: '#contact', event: 'offer_audit' },
      accent: 'gold',
      featured: true,
      badge: 'Most popular',
    },
    {
      id: 'retainer',
      name: 'KYA Assurance Retainer',
      price: '$5,000',
      cadence: 'per month · rolling',
      summary:
        'Ongoing assurance for teams shipping agents continuously, so every new agent ships provable from day one.',
      bullets: [
        'Monthly review of new and changed agents',
        'Live assurance dashboard per agent',
        'Priority access for high-stakes go / no-go calls',
        'Quarterly board-ready assurance report',
      ],
      cta: { label: 'Start a retainer', href: '#contact', event: 'offer_retainer' },
      accent: 'blue',
    },
    {
      id: 'licensing',
      name: 'KYA Licensing & Certification',
      price: 'from $50,000',
      cadence: 'annual',
      summary:
        'For consultancies, platforms and enterprises who want to apply the standard themselves and offer it to their own clients.',
      bullets: [
        'License the framework and methodology',
        'Certify your team as KYA-qualified assessors',
        'Co-branded assurance for your clients',
      ],
      cta: { label: 'Enquire about licensing', href: '#contact', event: 'offer_licensing' },
      accent: 'blue',
    },
  ] satisfies OfferTier[],

  guarantee:
    'If the KYA Audit does not surface at least three material assurance gaps in your agent that you were not already tracking, the audit is free. You keep the report either way.',
} as const;
