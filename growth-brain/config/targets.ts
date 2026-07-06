/**
 * The numbers the Growth Brain optimises for. Single source of truth for goals,
 * so both the analytics engine and the AI brain reason against the same targets.
 * Edit here; nothing else hard-codes a KPI.
 */

export type Kpi = {
  key: string;
  label: string;
  /** Higher is better (true) or lower is better (false, e.g. cost per lead). */
  higherIsBetter: boolean;
  /** The target we are chasing. */
  target: number;
  unit: 'percent' | 'usd' | 'count' | 'ratio' | 'days';
};

/** The one metric that matters most. Everything else is a lever on this. */
export const northStar = {
  key: 'weighted_pipeline_usd',
  label: 'Weighted pipeline value (USD)',
  note: 'Sum of open deal amounts x their stage win-probability. The realistic revenue in flight.',
};

export const kpis: Kpi[] = [
  { key: 'lead_conversion', label: 'Visitor to lead rate', higherIsBetter: true, target: 3, unit: 'percent' },
  { key: 'magnet_conversion', label: 'Framework page to download rate', higherIsBetter: true, target: 25, unit: 'percent' },
  { key: 'lead_to_call', label: 'Lead to booked call rate', higherIsBetter: true, target: 8, unit: 'percent' },
  { key: 'call_to_sale', label: 'Call to sale rate', higherIsBetter: true, target: 25, unit: 'percent' },
  { key: 'cost_per_lead', label: 'Cost per lead', higherIsBetter: false, target: 15, unit: 'usd' },
  { key: 'email_open_rate', label: 'Email open rate', higherIsBetter: true, target: 40, unit: 'percent' },
  { key: 'email_click_rate', label: 'Email click rate', higherIsBetter: true, target: 5, unit: 'percent' },
  { key: 'roas', label: 'Return on ad spend', higherIsBetter: true, target: 3, unit: 'ratio' },
  { key: 'ltv_cac', label: 'LTV to CAC ratio', higherIsBetter: true, target: 3, unit: 'ratio' },
];

/**
 * Hard guardrails the brain must respect. These are injected into every brain
 * prompt so no recommendation can ever cross them.
 */
export const guardrails = [
  'Every action that spends money or contacts a human requires explicit human approval. The brain only proposes.',
  'The UK patent is FILED, not granted. Never output copy that says "patented"; use "patent-pending".',
  'Never produce investment, trading or financial-promotion copy (FCA-regulated). The eaglesden angle is out of scope entirely.',
  'Consent-first. Never propose emailing anyone who has not opted in. The 24k contact list is never cold-blasted.',
  'Every recommendation must cite the specific metric or evidence that motivates it, and name the human owner who must approve it.',
] as const;

/** The revenue model the whole machine is aimed at (see docs/revenue-os.md). */
export const revenueModel = {
  annualTargetUsd: 5_000_000,
  engines: {
    assurance: 3_000_000, // KYA Audit + Retainer + Licensing
    training: 1_400_000, // cohorts + workshops
    products: 600_000, // books + paid Substack + community
  },
} as const;
