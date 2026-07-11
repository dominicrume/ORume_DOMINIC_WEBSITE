// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — Product Catalogue
// Rume Dominic's full product ladder.
// Lead data → matched product. The signal decides the offer.
// ═══════════════════════════════════════════════════════════════

// The ASCENSION LADDER — each rung is a higher-value offer.
// Lead data (niche, revenue band, pain, provider) decides entry point.
export const PRODUCT_LADDER = [

  // ── RUNG 1: BOOKS (£10-40) — the entry, the trust builder ──
  {
    id: 'book_ai_entrepreneurs',
    rung: 1,
    type: 'book',
    name: 'AI for African Entrepreneurs',
    price: 19.99,
    margin: 0.70,
    fulfilment: 'amazon_kdp',
    bestFor: { niches: ['*'], revBand: ['micro','small'], painThemes: ['ai','automation','getting_started'] },
    leadMagnet: '50 AI Tools for African Businesses (PDF)',
    nextRung: 'course_ai_foundations',
  },
  {
    id: 'book_blockchain',
    rung: 1,
    type: 'book',
    name: 'Blockchain Beyond Bitcoin',
    price: 21.99,
    margin: 0.70,
    fulfilment: 'amazon_kdp',
    bestFor: { niches: ['*'], revBand: ['micro','small','mid'], painThemes: ['web3','payments','crypto'] },
    leadMagnet: 'Web3 Business Glossary (150 terms)',
    nextRung: 'workshop_blockchain',
  },
  {
    id: 'book_playbook',
    rung: 1,
    type: 'book',
    name: "The Entrepreneur's AI Playbook",
    price: 24.99,
    margin: 0.70,
    fulfilment: 'amazon_kdp',
    bestFor: { niches: ['*'], revBand: ['small','mid'], painThemes: ['scaling','systems','efficiency'] },
    leadMagnet: '90-Day AI Business Blueprint',
    nextRung: 'cohort_90day',
  },

  // ── RUNG 2: COURSES (£97-497) — the transformation ──
  {
    id: 'course_ai_foundations',
    rung: 2,
    type: 'course',
    name: 'Vorem AI Foundations Course',
    price: 97,
    margin: 0.95,
    fulfilment: 'vorem_lms',
    bestFor: { niches: ['*'], revBand: ['micro','small'], painThemes: ['ai','automation'] },
    nextRung: 'service_email_marketing',
  },
  {
    id: 'workshop_blockchain',
    rung: 2,
    type: 'course',
    name: 'Blockchain for Business Workshop',
    price: 197,
    margin: 0.92,
    fulfilment: 'vorem_lms',
    bestFor: { niches: ['*'], revBand: ['small','mid'], painThemes: ['web3','payments'] },
    nextRung: 'service_consulting',
  },
  {
    id: 'cohort_90day',
    rung: 2,
    type: 'course',
    name: 'Vorem 90-Day AI Cohort',
    price: 497,
    margin: 0.90,
    fulfilment: 'vorem_lms',
    bestFor: { niches: ['*'], revBand: ['small','mid','large'], painThemes: ['scaling','systems'] },
    nextRung: 'service_email_marketing',
  },

  // ── RUNG 3: SERVICES (£1,500-3,000/mo) — the recurring revenue ──
  {
    id: 'service_email_marketing',
    rung: 3,
    type: 'service',
    name: 'Amazon Email Marketing Service',
    price: 1500,
    recurring: 'monthly',
    margin: 0.65,
    fulfilment: 'vorem_team',
    bestFor: { niches: ['*'], revBand: ['small','mid','large'], painThemes: ['retention','repeat_buyers','email'] },
    nextRung: 'service_consulting',
  },
  {
    id: 'service_dropship_setup',
    rung: 3,
    type: 'service',
    name: 'Done-With-You Dropship System',
    price: 2300,
    recurring: 'one_time',
    margin: 0.70,
    fulfilment: 'vorem_team',
    bestFor: { niches: ['*'], revBand: ['micro','small'], painThemes: ['sourcing','logistics','suppliers'] },
    nextRung: 'service_consulting',
  },

  // ── RUNG 4: CONSULTING & RETAINERS (£2,000-10,000/mo) — the high ticket ──
  {
    id: 'service_consulting',
    rung: 4,
    type: 'consulting',
    name: 'MCKI Enterprise AI Retainer',
    price: 2000,
    recurring: 'monthly',
    margin: 0.75,
    fulfilment: 'mcki',
    bestFor: { niches: ['*'], revBand: ['mid','large'], painThemes: ['enterprise','custom_build','scaling'] },
    nextRung: 'mastermind',
  },

  // ── RUNG 5: MASTERMIND & SPEAKING (£1,200-15,000) — the apex ──
  {
    id: 'mastermind',
    rung: 5,
    type: 'mastermind',
    name: 'Pan-African Founders Mastermind',
    price: 1200,
    recurring: 'annual',
    margin: 0.88,
    fulfilment: 'vorem_community',
    bestFor: { niches: ['*'], revBand: ['mid','large'], painThemes: ['network','growth','leadership'] },
    nextRung: 'speaking',
  },
  {
    id: 'speaking',
    rung: 5,
    type: 'speaking',
    name: 'Keynote Speaking Engagement',
    price: 5000,
    recurring: 'per_event',
    margin: 0.95,
    fulfilment: 'rume_direct',
    bestFor: { niches: ['*'], revBand: ['large'], painThemes: ['leadership','vision','transformation'] },
    nextRung: null,
  },
]

// Revenue band classifier — maps est_rev_month to a band
export function classifyRevBand(estRevMonth) {
  if (!estRevMonth)         return 'unknown'
  if (estRevMonth < 2000)   return 'micro'
  if (estRevMonth < 10000)  return 'small'
  if (estRevMonth < 50000)  return 'mid'
  return 'large'
}

// Get all products at or below a given rung
export function productsUpToRung(maxRung) {
  return PRODUCT_LADDER.filter(p => p.rung <= maxRung)
}

// Get a product by id
export function getProduct(id) {
  return PRODUCT_LADDER.find(p => p.id === id)
}
