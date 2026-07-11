// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — Stage 08: PRODUCT MATCHER
//
// This is where data becomes money.
//
// Every lead carries signals: niche, revenue band, pain point,
// email provider, score. The matcher reads those signals and
// decides the EXACT product to offer — and the next 2 rungs up.
//
// A micro pet-supplies seller gets the £19.99 book first.
// A mid-size beauty brand gets the £1,500/mo email service.
// The data decides. Automatically. At scale.
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import { DB } from '../lib/db.js'
import { PRODUCT_LADDER, classifyRevBand, getProduct } from '../products/catalogue.js'
import { withLimit, delay } from '../lib/rateLimiter.js'
import { logger } from '../lib/logger.js'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const MATCHER_SYSTEM = `You are a revenue strategist matching B2B leads to products in an ascension ladder.
You understand that the goal is not to sell the highest-priced item immediately,
but to enter at the right rung so the customer ascends naturally over time.

Rules:
- Micro/unknown revenue → enter with a BOOK (£10-40), build trust first
- Small revenue → enter with a COURSE (£97-497)
- Mid revenue → enter with a SERVICE (£1,500-2,300)
- Large revenue → enter with CONSULTING or MASTERMIND
- Always identify the natural NEXT product they'd ascend to
- Match the pain point to the product's theme

Return ONLY valid JSON.`

export async function matchLeadToProduct(lead) {
  const revBand = classifyRevBand(lead.est_rev_month)

  // Build a compact catalogue summary for Claude
  const catalogueSummary = PRODUCT_LADDER.map(p =>
    `${p.id} | Rung ${p.rung} | ${p.type} | "${p.name}" | £${p.price}${p.recurring ? '/' + p.recurring : ''} | for: ${p.bestFor.painThemes.join(',')}`
  ).join('\n')

  return withLimit('claude', async () => {
    const msg = await claude.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      system: MATCHER_SYSTEM,
      messages: [{
        role: 'user',
        content: `Match this lead to the best entry product + ascension path:

LEAD:
Store: ${lead.store_name}
Niche: ${lead.niche}
Revenue band: ${revBand} (£${lead.est_rev_month || 'unknown'}/mo)
Pain point: ${lead.pain_point}
Buy signal: ${lead.buy_signal}
Email provider: ${lead.email_provider}
Lead score: ${lead.score}/100

PRODUCT LADDER:
${catalogueSummary}

Return JSON:
{
  "entry_product_id": "<the best FIRST product to offer this lead>",
  "entry_reason": "<why this product, this rung — 15 words>",
  "ascension_path": ["<entry_id>", "<next_id>", "<next_id>"],
  "lifetime_value_estimate": <total £ if they ascend the full path>,
  "primary_hook": "<the single sentence that sells the entry product to THIS lead — references their niche + pain>",
  "objection_to_preempt": "<the #1 objection this lead will have, and how to handle it in 10 words>"
}`,
      }],
    })
    const raw = msg.content[0].text
    return JSON.parse(raw.replace(/```json|```/g, '').trim())
  })
}

export async function runMatcher({ limit = 100 } = {}) {
  // Match leads that are scored but not yet matched
  const leads = DB.salesMatch.unmatched.all(limit)
  logger.info(`[08-MATCH] Matching ${leads.length} leads to products`)
  let matched = 0

  for (const lead of leads) {
    try {
      const match = await matchLeadToProduct(lead)
      const product = getProduct(match.entry_product_id)

      DB.salesMatch.insert.run({
        lead_id:           lead.id,
        entry_product_id:  match.entry_product_id,
        entry_product_name: product?.name || match.entry_product_id,
        entry_price:       product?.price || 0,
        entry_reason:      match.entry_reason,
        ascension_path:    JSON.stringify(match.ascension_path),
        ltv_estimate:      match.lifetime_value_estimate,
        primary_hook:      match.primary_hook,
        objection:         match.objection_to_preempt,
      })

      DB.audit.log.run('lead', lead.id, 'product_matched', JSON.stringify({
        product: match.entry_product_id,
        ltv:     match.lifetime_value_estimate,
      }))

      matched++
      logger.info(`[08-MATCH] ✓ ${lead.store_name} → ${product?.name}`, {
        entry: match.entry_product_id,
        ltv:   `£${match.lifetime_value_estimate}`,
      })
    } catch (err) {
      logger.error(`[08-MATCH] Failed: ${lead.store_name}`, { error: err.message })
    }
    await delay(400)
  }

  logger.info(`[08-MATCH] COMPLETE — ${matched} leads matched`)
  return matched
}

if (process.argv[1]?.endsWith('matcher.js')) {
  runMatcher({ limit: 20 }).catch(console.error)
}
