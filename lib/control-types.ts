/**
 * Shared Control Center data shapes. No server-only code here, so both the
 * server layer (lib/control.ts) and the client dashboard can import these.
 */
import type { Kpis } from '@/growth-brain/src/metrics';

export type HealthPanel = {
  auditorVersion: string | null;
  openPRs: number | null;
  lastCommit: { sha: string; message: string; date: string } | null;
};

export type ConfigItem = { key: string; label: string; present: boolean };
export type ConfigPresence = ConfigItem[];

/**
 * A money door is any path on the site where a visitor can actually pay or book.
 * If one is dead, the site earns nothing no matter how much traffic it gets, so
 * the Control Center checks each one and shows LIVE or BROKEN with the reason.
 */
export type MoneyDoor = {
  id: string;
  label: string; // what the visitor is trying to do, in plain words
  target: string; // where the button sends them (URL or in-page anchor)
  live: boolean;
  reason: string; // why it is live, or exactly what is broken and how to fix it
};

export type RecRow = {
  id: string;
  created_at: string;
  period_end?: string | null;
  category?: string;
  title: string;
  hypothesis?: string;
  action?: string;
  expected_impact?: string;
  confidence?: number;
  evidence?: unknown;
  owner?: string;
  status: string;
};

export type Dashboard = {
  generatedAt: string;
  dataConfigured: boolean;
  periodLabel: string | null;
  kpis: Kpis | null;
  recommendations: RecRow[];
  latestBrief: string | null;
  health: HealthPanel;
  config: ConfigPresence;
  moneyDoors: MoneyDoor[];
};
