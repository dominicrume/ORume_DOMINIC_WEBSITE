/** Three service cards - outcome-focused. */

export type Service = {
  id: string;
  title: string;
  outcome: string;
  body: string;
  bullets: string[];
  cta: { label: string; href: string; event: string };
  accent: 'blue' | 'gold';
};

export const services: Service[] = [
  {
    id: 'builds',
    title: 'AI & Blockchain Product Builds',
    outcome: 'Ship production-grade in weeks, not quarters',
    body: 'Done-with-you engineering of AI agents, smart contracts and Web3 platforms, delivered by a senior architect with a vetted engineering team.',
    bullets: [
      'AI agents, RAG & LLM workflows',
      'Smart contracts & token systems',
      'Security-first, audited by default',
    ],
    cta: { label: 'Start a build', href: '#contact', event: 'service_builds' },
    accent: 'blue',
  },
  {
    id: 'advisory',
    title: 'Institutional Strategy & Advisory',
    outcome: 'De-risk your AI/Web3 roadmap',
    body: 'Fixed-scope strategy engagements from $5k to $50k for institutions and founders who need a clear, governed path from idea to deployed system.',
    bullets: [
      'Architecture & governance review',
      'Build-vs-buy & cost modelling',
      '90-day execution roadmap',
    ],
    cta: { label: 'Book advisory', href: '#contact', event: 'service_advisory' },
    accent: 'gold',
  },
  {
    id: 'academy',
    title: 'VOREM Institute of Technology',
    outcome: 'Turn your team into blockchain & AI builders',
    body: 'Affordable, high-signal training that turns knowledge into real skill, from AI literacy all the way to smart-contract engineering.',
    bullets: [
      'Master AI in 9 Days (free on-ramp)',
      'Crypto, DeFi & AI mastery tracks',
      'Cohorts for teams & institutions',
    ],
    cta: { label: 'Join VOREM Institute', href: '/master-ai', event: 'service_academy' },
    accent: 'blue',
  },
];
