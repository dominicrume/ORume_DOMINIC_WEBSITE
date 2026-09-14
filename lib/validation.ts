/** Shared zod schemas for the contact + newsletter endpoints. */
import { z } from 'zod';

export const budgetRanges = [
  '$5k to $25k',
  '$25k to $50k',
  '$50k+',
  'Not sure yet',
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  email: z.string().trim().email('Enter a valid email').max(200),
  org: z.string().trim().max(160).optional().default(''),
  budget: z.enum(budgetRanges),
  goal: z.string().trim().min(10, 'Tell me a little more about your goal').max(2000),
  // Honeypot: must be empty. Bots fill it; humans never see it.
  company_website: z.string().max(0).optional().default(''),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email('Enter a valid email').max(200),
  company_website: z.string().max(0).optional().default(''),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

// Lead-magnet gate (/framework). Name optional so the form stays low-friction;
// email is the one thing we need to deliver the PDF and enter the pipeline.
export const frameworkSchema = z.object({
  email: z.string().trim().email('Enter a valid email').max(200),
  name: z.string().trim().max(120).optional().default(''),
  company_website: z.string().max(0).optional().default(''),
});

export type FrameworkInput = z.infer<typeof frameworkSchema>;

// KYA Method Stack waitlist and the gated KYA Method downloads (/kya, homepage).
// Phone is required because these leads are followed up by call, not only email.
// To soften the gate later, change `phone` to `.optional().default('')` — that is
// the whole change; the API, storage and webhook already treat it as optional.
export const waitlistSchema = z.object({
  first_name: z.string().trim().min(1, 'Please enter your first name').max(120),
  email: z.string().trim().email('Enter a valid email').max(200),
  // Deliberately permissive: international numbers vary wildly and a strict
  // pattern rejects real people. Require enough digits to be a real number.
  phone: z
    .string()
    .trim()
    .min(7, 'Enter a phone number we can reach you on')
    .max(32)
    .refine((v) => (v.replace(/\D/g, '').length >= 7), 'Enter a valid phone number'),
  // Which gated asset the visitor asked for, when the form is a download gate.
  doc: z.enum(['kya-method', 'kya-architecture', 'dissertation']).optional(),
  company_website: z.string().max(0).optional().default(''),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
