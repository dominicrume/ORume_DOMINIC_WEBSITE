/**
 * Speaking & events. Live engagements, each linking to a verifiable source
 * (event site or recorded session). Weak/ephemeral links are deliberately left
 * off so every item survives a click.
 */

export type Engagement = {
  title: string;
  role: string;
  detail: string;
  href: string;
};

export const engagements: Engagement[] = [
  {
    title: 'FrontierTechX Birmingham 2026',
    role: 'Speaker',
    detail: 'On the shift from AI as a tool to AI as a strategic autonomous agent.',
    href: 'https://frontiertechx.com',
  },
  {
    title: 'Agentic AI Birmingham — LIVE LAB',
    role: 'Host',
    detail: 'Building AI agents that automate a business, demonstrated live.',
    href: 'https://www.youtube.com/watch?v=7_Op8--kQIA',
  },
  {
    title: 'AI Dominance',
    role: 'Speaker',
    detail: 'MCKI Solutions, Birmingham. Practical AI for speed, grades and profit.',
    href: 'https://www.youtube.com/watch?v=iM5aNNiXt4o',
  },
];
