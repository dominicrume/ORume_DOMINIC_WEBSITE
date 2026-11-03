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
    title: 'AI and blockchain builds',
    outcome: 'A working system in weeks, not quarters',
    body: 'I build AI agents, smart contracts and Web3 platforms with you, as a senior engineer working alongside a small, vetted team. You end up owning something that runs, not a demo.',
    bullets: [
      'AI agents and LLM workflows',
      'Smart contracts and token systems',
      'Built secure, checked by default',
    ],
    cta: { label: 'Start a build', href: '#contact', event: 'service_builds' },
    accent: 'blue',
  },
  {
    id: 'advisory',
    title: 'Strategy and advice',
    outcome: 'A clear, safe path from idea to live system',
    body: 'Fixed-scope work for teams and founders who need a clear path from an idea to a system that is actually running, and who want to know the real cost before they start.',
    bullets: [
      'Architecture and governance review',
      'Build vs buy, and what it really costs',
      'A 90-day plan you can act on',
    ],
    cta: { label: 'Talk it through', href: '#contact', event: 'service_advisory' },
    accent: 'gold',
  },
  {
    id: 'academy',
    title: 'VOREM Institute of Technology',
    outcome: 'Turn your team into real AI and blockchain builders',
    body: 'Plain, practical training that turns knowing-about into knowing-how. From someone’s first day with AI all the way to building and shipping smart contracts.',
    bullets: [
      'Master AI in 9 Days (free start)',
      'Crypto, DeFi and AI tracks',
      'Cohorts for teams and institutions',
    ],
    cta: { label: 'Join VOREM Institute', href: '/master-ai', event: 'service_academy' },
    accent: 'blue',
  },
];
