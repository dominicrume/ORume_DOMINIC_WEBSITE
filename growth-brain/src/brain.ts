/**
 * The decision maker. Takes the deterministic KPI snapshot, reasons over it against
 * the targets and guardrails, and returns a ranked list of recommendations, each with
 * evidence and a named human owner. It DECIDES; it does not ACT. Every recommendation
 * lands in the `recommendations` table at status 'proposed' for human approval.
 */

import { callClaude, extractJson, DEFAULT_MODEL } from './anthropic';
import { kpis as kpiTargets, guardrails, northStar, revenueModel } from '../config/targets';
import type { Kpis } from './metrics';

export type Recommendation = {
  category: 'funnel' | 'email' | 'ads' | 'offer' | 'content' | (string & {});
  title: string;
  hypothesis: string;
  action: string;
  expected_impact: string;
  confidence: number; // 0..1
  evidence: string;
  owner: string; // named human who must approve
};

const SYSTEM = `You are the Senior Principal Growth Director for the Rume Dominic brand
(rumedominic.com), an AI and Web3 engineer selling a patent-pending AI assurance standard
called Know Your AgenticAi. You are analytical, commercial, and honest. You never invent
metrics. You reason only from the data you are given. You optimise for the north-star metric
and the revenue model, always inside the guardrails.

You output ONLY a JSON array of recommendation objects, ranked most impactful first, no prose.
Each object has: category, title, hypothesis, action, expected_impact, confidence (0..1),
evidence (cite the specific number that motivated it), owner (the human role who approves,
e.g. "Founder", "Growth lead"). If the data is too sparse to be confident, say so honestly in
a low-confidence recommendation to collect more data, rather than fabricating insight.`;

export async function proposeRecommendations(
  snapshot: Kpis,
  opts?: { model?: string; maxRecs?: number },
): Promise<{ ok: boolean; recommendations: Recommendation[]; reason?: string }> {
  const user = `NORTH STAR: ${northStar.label}. ${northStar.note}

REVENUE MODEL (annual target, USD): $${revenueModel.annualTargetUsd.toLocaleString()} across
assurance $${revenueModel.engines.assurance.toLocaleString()}, training
$${revenueModel.engines.training.toLocaleString()}, products
$${revenueModel.engines.products.toLocaleString()}.

TARGETS:
${kpiTargets.map((k) => `- ${k.label}: target ${k.unit === 'usd' ? '$' : ''}${k.target}${k.unit === 'percent' ? '%' : ''} (${k.higherIsBetter ? 'higher better' : 'lower better'})`).join('\n')}

GUARDRAILS (never violate):
${guardrails.map((g, i) => `${i + 1}. ${g}`).join('\n')}

THIS PERIOD'S DATA (from ${snapshot.eventCount} events):
${JSON.stringify(snapshot, null, 2)}

Return the top ${opts?.maxRecs ?? 5} recommendations as a JSON array.`;

  const res = await callClaude({ system: SYSTEM, user, model: opts?.model ?? DEFAULT_MODEL });
  if (!res.ok) return { ok: false, recommendations: [], reason: res.reason };

  const parsed = extractJson<Recommendation[]>(res.text);
  if (!parsed || !Array.isArray(parsed)) {
    return { ok: false, recommendations: [], reason: 'unparseable_response' };
  }
  // Clamp confidence and drop anything without an action.
  const clean = parsed
    .filter((r) => r && r.title && r.action)
    .map((r) => ({ ...r, confidence: Math.max(0, Math.min(1, Number(r.confidence) || 0)) }));
  return { ok: true, recommendations: clean };
}
