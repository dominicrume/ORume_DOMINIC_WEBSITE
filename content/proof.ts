/**
 * Social proof. `quotes` are real testimonials pulled from client/participant
 * messages. `award`, `feature` and `video` are real and safe to ship.
 */

export type Quote = {
  text: string;
  author: string;
  title: string;
  placeholder?: boolean;
};

export const quotes: Quote[] = [
  {
    text: 'You are amazing, Dominic.',
    author: 'Paul Ranson',
    title: 'Founder, LearnCast',
  },
  {
    text: 'The program was an eye opener. I really enjoyed the whole session. Well done to you and the team.',
    author: 'Soltouchh',
    title: 'Program participant',
  },
  {
    text: 'Everything’s solid. Code is finally merged to main branch.',
    author: 'Matthew Aston',
    title: 'Engineering client',
  },
  {
    text: 'Thanks for the invite Dominic, the discussions were definitely insightful.',
    author: 'VOREM session guest',
    title: 'Workshop attendee',
  },
  {
    text: 'I really enjoyed the program.',
    author: 'Program participant',
    title: 'VOREM Institute cohort',
  },
];

export const award = {
  title: '100 Most Influential Young Deltans',
  detail: 'Recognised for advancing blockchain & AI adoption across Africa.',
  href: 'https://medium.com/@Vorem_ng/ceo-vorem-nigeria-honored-at-the-100-most-influential-young-deltans-award-and-ranking-c6f91c234ccb',
};

export const feature = {
  title: 'Featured in The Guardian',
  detail: 'Empowering Africa’s youth through blockchain and AI.',
  href: 'https://guardian.ng/joe-komolafe/rume-dominic-empowering-africas-youth-through-blockchain-and-ai/',
};

/**
 * YouTube video for the proof section. Replace `id` with a real video ID.
 * Set to null to hide the embed.
 */
export const video: { id: string; title: string } | null = {
  id: 'JYrW3MhKcF4',
  title: 'Dominic Rume: Crypto market analysis',
};
