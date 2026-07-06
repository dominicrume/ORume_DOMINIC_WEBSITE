/**
 * Books grid. Cover images: drop real covers in /public/books and update `cover`.
 * A placeholder gradient renders when the file is missing (see Books.tsx).
 */

export type Book = {
  title: string;
  blurb: string;
  href?: string; // Amazon listing, when available
  cover: string; // path under /public
  waterstones?: string; // UK bookstore listing, when stocked
  coverFit?: 'cover' | 'contain'; // 'contain' for 3D mockups / non-flat art
};

export const books: Book[] = [
  {
    title: 'Wealth of the Blockchain',
    blurb: 'The economy of possibilities. Your roadmap to understanding blockchain and crypto.',
    href: 'https://www.amazon.com/WEALTH-BLOCKCHAIN-Possibilities-Rume-Dominic/dp/9789910568',
    cover: '/books/wealth-of-the-blockchain.jpg',
  },
  {
    title: 'An Evolution into the Metaverse',
    blurb: 'NFTs, DeFi and Web3. A field guide to the next internet.',
    href: 'https://www.amazon.co.uk/EVOLUTION-INTO-METAVERSE-RUME-DOMINIC/dp/B0BHNLQSKK',
    cover: '/books/evolution-into-the-metaverse.jpg',
  },
  {
    title: 'From Code to Consciousness',
    blurb: 'Bridging the gap between AI and humans, with insights from 51,000+ hours of development.',
    href: 'https://www.amazon.com/Code-Consciousness-Bridging-between-Powerful/dp/B0CTXD9SVS',
    cover: '/books/from-code-to-consciousness.jpg',
    waterstones:
      'https://www.waterstones.com/book/from-code-to-consciousness/rume-dominic/9798864351604',
  },
  {
    title: 'Inside the Heart of a Global Entrepreneur',
    blurb: 'The mindset and moves behind building across borders. With Mahaveer Jain.',
    href: 'https://www.amazon.co.uk/Inside-Heart-Global-Entrepreneur-Mahaveer-ebook/dp/B0F4B1P8WG',
    cover: '/books/inside-the-heart-v2.jpg',
    waterstones:
      'https://www.waterstones.com/book/inside-the-heart-of-a-global-entrepreneur/rume-dominic/mahaveer-jain/9798309621316',
  },
  {
    title: 'MORE — Unleashing the Leader Within',
    blurb: 'Co-authored with Farzam Kamalabadi, Paul Rubio and Lerena Holloway. “Courage is the ultimate capital, surpassing gold or code.”',
    cover: '/books/more.jpg',
    coverFit: 'contain',
  },
];
