import { describe, it, expect } from 'vitest';
import { contactSchema, newsletterSchema, frameworkSchema } from '@/lib/validation';

const valid = {
  name: 'Ada Obi',
  email: 'ada@company.com',
  org: 'Acme',
  budget: '$5k to $25k',
  goal: 'We want to build an AI agent for support.',
  company_website: '',
};

describe('contactSchema', () => {
  it('accepts a well-formed submission', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects an invalid email', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'nope' }).success).toBe(false);
  });

  it('rejects when the honeypot is filled (spam)', () => {
    const res = contactSchema.safeParse({ ...valid, company_website: 'http://spam' });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.flatten().fieldErrors.company_website).toBeTruthy();
    }
  });

  it('rejects an out-of-range budget', () => {
    expect(contactSchema.safeParse({ ...valid, budget: '$1M' }).success).toBe(false);
  });
});

describe('newsletterSchema', () => {
  it('accepts a valid email', () => {
    expect(newsletterSchema.safeParse({ email: 'a@b.com' }).success).toBe(true);
  });
  it('rejects a filled honeypot', () => {
    expect(
      newsletterSchema.safeParse({ email: 'a@b.com', company_website: 'x' }).success,
    ).toBe(false);
  });
});

describe('frameworkSchema (lead magnet gate)', () => {
  it('accepts an email with no name (low friction)', () => {
    const res = frameworkSchema.safeParse({ email: 'lead@company.com' });
    expect(res.success).toBe(true);
    if (res.success) expect(res.data.name).toBe('');
  });
  it('accepts an email with a name', () => {
    expect(
      frameworkSchema.safeParse({ email: 'lead@company.com', name: 'Ada' }).success,
    ).toBe(true);
  });
  it('rejects an invalid email', () => {
    expect(frameworkSchema.safeParse({ email: 'nope', name: 'Ada' }).success).toBe(false);
  });
  it('rejects a filled honeypot (spam)', () => {
    expect(
      frameworkSchema.safeParse({ email: 'a@b.com', company_website: 'http://spam' }).success,
    ).toBe(false);
  });
});
