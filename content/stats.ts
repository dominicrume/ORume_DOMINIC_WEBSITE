/** Hero stat counters - real, verifiable credentials. */

export type Stat = {
  /** Numeric target for the count-up animation (0 = non-numeric, show label only). */
  value: number;
  /** Text appended after the number, e.g. "+" or "hrs". */
  suffix?: string;
  prefix?: string;
  label: string;
  /** When true, render the label as the headline instead of a counter. */
  static?: boolean;
};

export const stats: Stat[] = [
  { value: 51000, suffix: '+', label: 'Hours in AI, blockchain & metaverse mastery' },
  { value: 100, label: 'Most Influential Young Deltans (ranked)' },
  { value: 0, label: 'MSc AI · Aston University', static: true },
  { value: 0, label: 'UK Patent Filed · IPO', static: true },
];
