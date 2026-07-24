/**
 * Global site configuration - single source of truth for identity, nav, SEO,
 * and social links. Edit copy here; components render from it.
 */

export const site = {
  name: 'Rume Dominic',
  legalName: "O'Rume Dominic Uririe",
  role: 'AI Engineer · Blockchain Architect · Founder of VOREM',
  domain: 'rumedominic.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rumedominic.com',
  email: 'dominicrume@gmail.com',
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    'https://vorem.zohobookings.com/portal-embed#/customer/vorem',

  // The one promise. Must render above the fold.
  promise:
    'Build AI and Web3 products 5x more capital-efficient, 7x faster and 10x clearer. Enterprise-grade security comes standard.',
  subPromise:
    'I help institutions and funded founders ship production-grade AI and blockchain systems that are faster, leaner and secure by design. Based in the UK, operating globally. I’ve spent my career solving difficult problems across borders, and I bring that same rigour to every system I build. No vibe coding. No wasted spend.',

  seo: {
    title: 'Rume Dominic | Principal AI & Blockchain Engineer | Web3 Built Leaner & Faster',
    description:
      'Rume Dominic (O’Rume Dominic Uririe), Founder of VOREM, helps institutions build enterprise-grade AI and Web3 products highly capital-efficient, 7x faster and 10x clearer with elite engineering.',
    keywords: [
      'Rume Dominic',
      'O’Rume Dominic Uririe',
      'Enterprise AI engineer',
      'blockchain architect',
      'Web3 development agency',
      'AI development company',
      'smart contract auditing',
      'DeFi engineering',
      'AI agents for business',
      'blockchain consulting',
      'VOREM',
      'production-grade AI systems',
      'autonomous agents',
    ],
    ogImageAlt: 'Rume Dominic, Principal AI and Blockchain Engineer',
  },

  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Work with me', href: '#work' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
  ],

  cta: {
    primary: { label: 'Book a Strategy Call', href: '#contact', event: 'cta_book_call' },
    secondary: { label: 'Explore Systems Architecture', href: '#portfolio', event: 'cta_view_systems' },
  },

  socials: [
    { label: 'X', href: 'https://x.com/dominicrume' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dominicrume/' },
    { label: 'Medium', href: 'https://medium.com/@dominicrume' },
    { label: 'YouTube (Rume)', href: 'https://www.youtube.com/@rumedominic' },
    { label: 'YouTube (VOREM)', href: 'https://www.youtube.com/channel/UCSpH7tRDxcQIA9yNK3dupPg' },
  ],

  // Medium RSS feed for the Insights section (parsed at build time).
  mediumRss: 'https://medium.com/feed/@dominicrume',

  // Substack newsletter. Section renders only when a real URL is set (via
  // NEXT_PUBLIC_SUBSTACK_URL) so no broken/guessed link ever ships.
  substackUrl: process.env.NEXT_PUBLIC_SUBSTACK_URL ?? '',
} as const;

export type Site = typeof site;
