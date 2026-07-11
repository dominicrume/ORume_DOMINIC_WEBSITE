// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — Stage 07: THE BRAIN (Learner)
//
// This is what makes this system ALIVE.
//
// After every cycle, Claude reads:
//   - This cycle's performance metrics
//   - Historical niche performance
//   - Historical email provider performance
//   - What it decided last cycle and what happened
//   - Current agent configuration
//
// Then Claude makes specific, measurable decisions:
//   - Which niches to prioritise next cycle
//   - Which email providers are converting
//   - What the minimum score threshold should be
//   - What email angle is working
//   - What queries to add or remove
//
// These decisions are written to memory and applied next cycle.
// The system gets smarter every single week. Forever.
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import { DB } from '../lib/db.js'
import { Memory } from '../lib/memory.js'
import { logger } from '../lib/logger.js'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const BRAIN_SYSTEM = `You are the AI brain of an autonomous lead generation system targeting Amazon sellers.

Your role: analyse each cycle's performance data and make SPECIFIC, MEASURABLE decisions to improve the next cycle.

You have access to:
- Current cycle metrics (domains found, emails sent, open/reply rates)
- Historical niche performance (which niches reply most)
- Historical email provider performance (which MX providers convert best)
- Previous decisions you made and their outcomes

Your decisions must be actionable JSON. Every directive you give will be automatically applied.
Be specific. Be data-driven. Be ruthless about what's not working.
Return ONLY valid JSON.`

export async function runLearner(cycleId) {
  logger.info('[07-LEARN] AI brain awakening...')

  // Gather all performance data
  const snapshot      = Memory.getFullSnapshot()
  const cycle         = DB.cycles.latest.get()
  const nicheBreak    = DB.leads.nicheBreakdown.all()
  const providerBreak = DB.leads.providerBreakdown.all()
  const outreachStats = DB.outreach.stats.get()
  const leadStats     = DB.leads.stats.get()
  const recentDecisions = DB.decisions.recent.all().slice(0, 5)

  const prompt = `You are the AI brain of the Living Engine. Analyse this cycle's performance and make decisions for next cycle.

## CURRENT CYCLE METRICS
Cycle number: ${snapshot.state.cycle_count}
Domains discovered: ${cycle?.domains_found || 0}
MX filtered (targets only): ${cycle?.mx_filtered || 0}
Emails harvested: ${cycle?.emails_harvested || 0}
Leads enriched: ${cycle?.leads_enriched || 0}
Leads scored: ${cycle?.leads_scored || 0}
Emails sent: ${cycle?.emails_sent || 0}
Total opens: ${outreachStats?.opens || 0}
Total replies: ${outreachStats?.replies || 0}
Reply rate: ${cycle?.emails_sent > 0 ? ((outreachStats?.replies || 0) / cycle.emails_sent * 100).toFixed(1) : 0}%
Avg lead score: ${leadStats?.avg_score || 0}

## NICHE PERFORMANCE (reply rate by niche)
${JSON.stringify(nicheBreak, null, 2)}

## EMAIL PROVIDER PERFORMANCE (by MX fingerprint)
${JSON.stringify(providerBreak, null, 2)}

## AGENT MEMORY (historical performance)
Niche history: ${JSON.stringify(snapshot.niche_performance, null, 2)}
Provider history: ${JSON.stringify(snapshot.provider_performance, null, 2)}

## CURRENT CONFIG
Min score threshold: ${snapshot.state.min_score_threshold}
Active niches: ${JSON.stringify(snapshot.state.active_niches)}
Target providers: ${JSON.stringify(snapshot.state.target_providers)}
Current email angle: ${snapshot.state.current_email_angle}
Max outreach per cycle: ${snapshot.state.max_outreach_per_cycle}

## RECENT AI DECISIONS
${JSON.stringify(recentDecisions, null, 2)}

## RECENT LEARNINGS
${JSON.stringify(snapshot.recent_learnings, null, 2)}

---

Based on ALL this data, make specific decisions for the next cycle. Think like a Senior Director who has run this system for 10 years.

Return this exact JSON structure:
{
  "summary": "<2-sentence summary of what you observed this cycle>",
  "directives": {
    "min_score_threshold": <number 55-85 — lower if pipeline is thin, higher if you're getting too many bad leads>,
    "active_niches": [<array of niche names to prioritise — drop underperformers, add new ones>],
    "target_providers": [<array of MX provider keys to prioritise — based on reply rate data>],
    "queries_per_niche": <number 2-5 — more if finding too few leads>,
    "max_outreach": <number 10-50 — based on current reply rate and capacity>,
    "email_angle": "<one of: supply_chain_pain|margin_pressure|growth_opportunity|competitor_threat|seasonal_timing>"
  },
  "decisions": [
    {
      "stage": "<stage name>",
      "decision": "<specific change being made>",
      "reasoning": "<why based on data>"
    }
  ],
  "learning": "<one key insight from this cycle that should influence future cycles>",
  "next_cycle_focus": "<the single most important thing to focus on next cycle>"
}`

  try {
    const msg = await claude.messages.create({
      model:      'claude-sonnet-4-6',
      max_tokens: 1200,
      system:     BRAIN_SYSTEM,
      messages:   [{ role: 'user', content: prompt }],
    })

    const raw  = msg.content[0].text
    const brain = JSON.parse(raw.replace(/```json|```/g, '').trim())

    // Apply directives to memory
    Memory.applyDirectives(brain.directives)

    // Log the learning
    Memory.logLearning({
      cycle:        snapshot.state.cycle_count,
      summary:      brain.summary,
      learning:     brain.learning,
      next_focus:   brain.next_cycle_focus,
      directives:   brain.directives,
    })

    // Save decisions to DB
    if (brain.decisions && cycleId) {
      for (const d of brain.decisions) {
        DB.decisions.insert.run({
          cycle_id:  cycleId,
          stage:     d.stage,
          decision:  d.decision,
          reasoning: d.reasoning,
        })
      }
    }

    // Update cycle with learnings
    if (cycleId) {
      DB.cycles.finish.run({
        id:               cycleId,
        status:           'complete',
        domains_found:    cycle?.domains_found || 0,
        mx_filtered:      cycle?.mx_filtered   || 0,
        emails_harvested: cycle?.emails_harvested || 0,
        leads_enriched:   cycle?.leads_enriched || 0,
        leads_scored:     cycle?.leads_scored || 0,
        emails_sent:      cycle?.emails_sent || 0,
        ai_learnings:     JSON.stringify(brain),
      })
    }

    logger.info('[07-LEARN] Brain cycle complete', {
      summary:    brain.summary,
      learning:   brain.learning,
      next_focus: brain.next_cycle_focus,
    })

    return brain

  } catch (err) {
    logger.error('[07-LEARN] Brain error', { error: err.message })
    return null
  }
}

if (process.argv[1]?.endsWith('learner.js')) {
  runLearner(null).catch(console.error)
}
