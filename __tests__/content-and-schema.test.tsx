import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { books } from '@/content/books';
import { personSchema, organizationSchema, booksSchema } from '@/lib/schema';
import { Footer } from '@/components/Footer';
import { site } from '@/content/site';

describe('Books content', () => {
  it('has 5 books, each with a title and cover', () => {
    expect(books).toHaveLength(5);
    for (const b of books) {
      expect(b.title.length).toBeGreaterThan(0);
      expect(b.cover).toMatch(/^\/books\//);
    }
  });

  it('any book with a purchase link uses an absolute Amazon URL', () => {
    for (const b of books) {
      if (b.href) {
        expect(b.href).toMatch(/^https?:\/\//);
        expect(b.href).toContain('amazon.');
      }
    }
  });
});

describe('JSON-LD schema', () => {
  it('emits a valid Person with required fields', () => {
    const p = personSchema();
    expect(p['@type']).toBe('Person');
    expect(p.name).toBeTruthy();
    expect(p.url).toBe(site.url);
    expect(Array.isArray(p.sameAs)).toBe(true);
  });

  it('emits an Organization for VOREM', () => {
    const o = organizationSchema();
    expect(o['@type']).toBe('Organization');
    expect(o.name).toBe('VOREM');
  });

  it('emits one Book entry per published book', () => {
    expect(booksSchema()).toHaveLength(books.length);
  });
});

describe('Footer', () => {
  it('renders all social links with correct hrefs', () => {
    render(<Footer />);
    for (const s of site.socials) {
      const link = screen.getByRole('link', { name: s.label });
      expect(link).toHaveAttribute('href', s.href);
    }
  });
});
