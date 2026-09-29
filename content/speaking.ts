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
    role: 'Panellist',
    // The link was the bare event homepage, which does not mention him — the one
    // item in this file that did not survive its own click. It now points at the
    // organiser's own post carrying the panel card. Four panellists, 25 minutes:
    // say panellist, not speaker.
    detail:
      '“Agentic AI: From Copilots to Autonomous Enterprises”, University of Birmingham, 27 March 2026.',
    href: 'https://www.linkedin.com/posts/welcome-its-frontiertechx-day-and-we-are-ugcPost-7443143306097876992-b3uh/',
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
