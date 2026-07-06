/** JSON-LD structured-data builders (Person, Organization, Book). */
import { site } from '@/content/site';
import { books } from '@/content/books';
import { faqs } from '@/content/faq';

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: 'Blockchain Architect & AI Engineer',
    worksFor: { '@type': 'Organization', name: 'VOREM' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Covenant University' },
    sameAs: site.socials.map((s) => s.href),
    knowsAbout: ['Blockchain', 'Artificial Intelligence', 'Web3', 'Smart Contracts', 'DeFi'],
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VOREM',
    url: site.url,
    founder: { '@type': 'Person', name: site.legalName },
    description:
      'VOREM connects global institutions with Africa’s top engineers to build AI & Web3 products, and trains builders through Vorem Academy.',
    sameAs: ['https://ng.linkedin.com/company/vorem-co'],
  };
}

export function booksSchema() {
  return books.map((b) => ({
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: b.title,
    author: { '@type': 'Person', name: site.legalName },
    url: b.href,
  }));
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Convenience: the full graph rendered in <head>. */
export function siteJsonLd() {
  return [personSchema(), organizationSchema(), faqSchema(), ...booksSchema()];
}
