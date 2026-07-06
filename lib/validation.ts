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
