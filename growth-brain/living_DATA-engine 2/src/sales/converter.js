// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — Stage 09: CONVERTER
//
// Takes the matched product and generates a product-specific
// sales sequence. Not a generic cold email — a sequence engineered
// to sell THE SPECIFIC PRODUCT matched to THIS lead.
//
// Book → soft, curiosity, low-commitment ("grab my book")
// Course → transformation-focused ("here's the system")
// Service → ROI-focused ("here's what we'd do for you")
// Consulting → authority + scarcity ("limited retainer slots")
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import { DB } from '../lib/db.js'
import { getProduct } from '../products/catalogue.js'
import { withLimit, delay } from '../lib/rateLimiter.js'
import { logger } from '../lib/logger.js'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Different sales psychology per product type
const SALES_FRAMES = {
  book:       'Low commitment. Curiosity-led. "I wrote something that might help — no pitch." Soft.',
  course:     'Transformation-focused. "Here is the exact system." Show the before/after.',
  service:    'ROI-focused. "Here is what we would do and what it returns." Concrete numbers.',
  consulting: 'Authority + scarcity. "We take limited clients." Position as selective.',
  mastermind: 'Belonging + status. "A room of people like you." Identity-driven.',
  speaking:   'Prestige. "Your audience deserves this." Position Rume as the authority.',
}

const CONVERTER_SYSTEM = `You are Rume Dominic's elite sales copywriter.
Rume is an AI & Blockchain author (5 books), founder of Vorem Nigeria, 39+ keynotes.
You write product-specific sales sequences that match the buyer's stage.
You never hard-sell a book. You never soft-sell a £2,000 retainer.
Match the energy to the price and product type.
H8: Every email ends with an unsubscribe option.
Return ONLY valid JSON.`

export async function generateSalesSequence(lead, match) {
  const product = getProduct(match.entry_product_id)
  const frame   = SALES_FRAMES[product?.type] || SALES_FRAMES.book

  return withLimit('claude', async () => {
    const msg = await claude.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 900,
      system: CONVERTER_SYSTEM,
      messages: [{
        role: 'user',
        content: `Write a 3-email sales sequence selling a specific product to this lead:

LEAD:
Store: ${lead.store_name}
Niche: ${lead.niche}
Pain: ${lead.pain_point}
Contact: ${lead.first_name || 'there'}

PRODUCT TO SELL:
Name: ${product?.name}
Type: ${product?.type}
Price: £${product?.price}${product?.recurring ? '/' + product.recurring : ''}

SALES FRAME (match this energy): ${frame}

PRIMARY HOOK (use this): "${match.primary_hook}"
OBJECTION TO PRE-EMPT: ${match.objection}
ASCENSION: After they buy this, they ascend to higher products. Don't mention that yet.

Return JSON:
{
  "email1": {
    "subject": "<subject matched to product type — book=curious, service=ROI>",
    "body": "<90 words. Open with the primary hook. Match the sales frame energy. ${product?.type === 'book' ? 'Soft, no pressure.' : product?.type === 'service' || product?.type === 'consulting' ? 'Concrete ROI, professional.' : 'Transformation-focused.'} Sign as Rume Dominic. End: Reply STOP to opt out.>"
  },
  "email2": {
    "subject": "<follow-up>",
    "body": "<70 words. Pre-empt the objection: '${match.objection}'. One proof point. ${product?.type === 'book' ? 'Link to grab it.' : 'Soft CTA to a call or signup.'} Reply STOP to opt out.>"
  },
  "email3": {
    "subject": "<final email>",
    "body": "<50 words. ${product?.type === 'book' ? 'Last gentle nudge.' : 'Scarcity or deadline.'} Leave door open. Reply STOP to opt out.>"
  }
}`,
      }],
    })
    const raw = msg.content[0].text
    return JSON.parse(raw.replace(/```json|```/g, '').trim())
  })
}

export async function runConverter({ limit = 50 } = {}) {
  const matches = DB.salesMatch.readyToSell.all(limit)
  logger.info(`[09-CONVERT] Generating sales sequences for ${matches.length} matched leads`)
  let converted = 0

  for (const m of matches) {
    try {
      const lead = DB.leads.byId.get(m.lead_id)
      if (!lead) continue

      const seq = await generateSalesSequence(lead, m)

      // Save sales sequence
      for (const [key, email] of Object.entries({ e1: seq.email1, e2: seq.email2, e3: seq.email3 })) {
        DB.salesSequence.insert.run({
          match_id: m.id,
          lead_id:  lead.id,
          touch:    Number(key.replace('e', '')),
          product_id: m.entry_product_id,
          subject:  email.subject,
          body:     email.body,
        })
      }

      DB.salesMatch.markSequenced.run(m.id)
      DB.audit.log.run('lead', lead.id, 'sales_sequenced', m.entry_product_id)
      converted++
      logger.info(`[09-CONVERT] ✓ ${lead.store_name} → selling ${m.entry_product_name}`)
    } catch (err) {
      logger.error(`[09-CONVERT] Failed lead ${m.lead_id}`, { error: err.message })
    }
    await delay(500)
  }

  logger.info(`[09-CONVERT] COMPLETE — ${converted} sales sequences generated`)
  return converted
}

if (process.argv[1]?.endsWith('converter.js')) {
  runConverter({ limit: 10 }).catch(console.error)
}
