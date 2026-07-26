/**
 * Configuration and constants for the MENA OBRIKE × RUME DOMINIC URIRIE landing page.
 * Prompts mandate: Where a value is missing, render a visible [MISSING: field_name] placeholder — never a plausible-looking guess.
 */

export const MENA_CONFIG = {
  CONFIRMED_PAID_COUNT: '[MISSING: CONFIRMED_PAID_COUNT]',
  TOTAL_DISBURSED_NGN: '[MISSING: TOTAL_DISBURSED_NGN]',
  EVENT_DATE: '25 July 2026',
  COUNTRIES: 'Nigeria, Zimbabwe, Rwanda, Uganda',

  BOOK_TITLE: 'From Code to Consciousness',
  BOOK_LINK: 'https://rumedominic.com/access',
  COURSE_NAME: 'Master AI in 3 Nights',
  COURSE_LINK: 'https://vorem.co',
  PRODUCT_NAME: '[MISSING: PRODUCT_NAME]',
  PRODUCT_LINK: '[MISSING: PRODUCT_LINK]',
  WHATSAPP_LINK: 'https://chat.whatsapp.com/JuNtR5IbXuD0YVP04zg3lY?mode=gi_t',
  BUNDLE_VALUE_GBP: '[MISSING: BUNDLE_VALUE_GBP]',

  DOMAIN: 'https://rumedominic.com',
  SPOTIFY_LINK: '[MISSING: SPOTIFY_LINK]',
  APPLE_LINK: '[MISSING: APPLE_LINK]',
  YOUTUBE_LINK: '[MISSING: YOUTUBE_LINK]',
  MENA_TIKTOK: 'https://tiktok.com/@MENBRIKS',

  // Google Form endpoint for scholarship claims.
  GOOGLE_FORM_ENDPOINT: 'https://docs.google.com/forms/d/e/1FAIpQLSdjwdFlf2VbVT40MfUgcLYSKkCSoHY9Vj5qbSyR7uIcWbnoTg/formResponse',
} as const;
