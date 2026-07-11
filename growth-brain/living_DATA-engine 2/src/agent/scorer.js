// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — Stage 05: SCORE
// Provider-aware AI scoring — the hook changes per email service
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import { DB } from '../lib/db.js'
import { withLimit, delay } from '../lib/rateLimiter.js'
import { logger } from '../lib/logger.js'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Provider-specific hooks — what to say to each email service user
const PROVIDER_HOOKS = {
  network_solutions: 'You use Network Solutions webmail — you run a real business and care about your brand',
  private_email:     'You use Namecheap Private Email — you value privacy and professionalism',
  titan_email:       'You use Titan Email — you are growth-stage and think about communication seriously',
  zoho:              'You use Zoho Mail — you run your business on integrated tools',
  godaddy:           'You registered your domain on GoDaddy — you built this brand from the ground up',
  rackspace:         'You use Rackspace Email — you have been in business long enough to invest in infrastructure',
  fastmail:          'You use Fastmail — you prioritise speed and professionalism',
  ionos:             'You host with IONOS — you run a lean, well-organised operation',
  protonmail:        'You use ProtonMail — you take your business and privacy seriously',
  self_hosted:       'You run your own mail server — you are technical and like control',
  '123reg':          'You host with 123-Reg — you are a UK-based business owner',
  krystal:           'You host with Krystal — you are UK-based and care about sustainability',
  default:           'You run a branded email — you are a serious business owner',
}

const EMAIL_ANGLES = {
  supply_chain_pain:    'Focus on: late shipments, stockouts, supplier delays',
  margin_pressure:      'Focus on: thin margins, rising ad costs, Amazon fee increases',
  growth_opportunity:   'Focus on: growing from 1 to 3 product lines, scaling',
  competitor_threat:    'Focus on: competitors undercutting, price wars',
  seasonal_timing:      'Focus on: Q4 preparation, Black Friday readiness',
}

const SYSTEM = `You are a senior B2B lead qualifier. Score Amazon seller leads for email marketing and dropship consulting services.
Return ONLY valid JSON.`

export async function scoreOne(lead, emailAngle = 'supply_chain_pain') {
  const hook = PROVIDER_HOOKS[lead.email_provider] || PROVIDER_HOOKS.default
  const angle = EMAIL_ANGLES[emailAngle] || EMAIL_ANGLES.supply_chain_pain

  return withLimit('claude', async () => {
    const msg = await claude.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: SYSTEM,
      messages: [{
        role: 'user',
        content: `Score this Amazon seller:

Domain: ${lead.domain}
Store: ${lead.store_name || 'Unknown'}
Niche: ${lead.niche}
Email: ${lead.email}
Verified: ${lead.email_verified ? 'yes' : 'no'}
Contact: ${[lead.first_name, lead.last_name].filter(Boolean).join(' ') || 'unknown'}
Title: ${lead.job_title || 'unknown'}
Company size: ${lead.company_size || 'unknown'}
MX Provider: ${lead.mx_provider || 'unknown'}
Email Provider: ${lead.email_provider || 'unknown'}
LinkedIn: ${lead.linkedin_url ? 'yes' : 'no'}
BSR: ${lead.bsr || 'unknown'}
Est Rev: £${lead.est_rev_month || 'unknown'}/mo

Email service insight: "${hook}"
This cycle's angle: ${angle}

Score 0-100. Return JSON:
{
  "score": <0-100>,
  "pain_point": "<their most likely pain — 10 words — tuned to ${emailAngle}>",
  "buy_signal": "<one specific reason they would respond>",
  "email_hook": "<the opening hook for their email — references their ${lead.email_provider || 'email service'} and their niche pain>",
  "reason": "<score justification — 12 words>"
}`,
      }],
    })
    const raw = msg.content[0].text
    return JSON.parse(raw.replace(/```json|```/g, '').trim())
  })
}

export async function runScoring({ limit = 200, emailAngle = 'supply_chain_pain' } = {}) {
  const leads = DB.leads.forScore.all(limit)
  logger.info(`[05-SCORE] Scoring ${leads.length} leads with angle: ${emailAngle}`)
  let scored = 0

  for (const lead of leads) {
    try {
      const r = await scoreOne(lead, emailAngle)
      DB.leads.updateScore.run({ id: lead.id, score: Math.max(0, Math.min(100, r.score)), score_reason: r.reason })
      DB.leads.updateEnrich.run({
        id: lead.id,
        email_verified: lead.email_verified,
        first_name:     lead.first_name,
        last_name:      lead.last_name,
        job_title:      lead.job_title,
        linkedin_url:   lead.linkedin_url,
        company_size:   lead.company_size,
        pain_point:     r.pain_point,
        buy_signal:     r.buy_signal,
        email_hook:     r.email_hook,
      })
      scored++
      logger.info(`[05-SCORE] ${lead.domain} → ${r.score}`, { hook: r.email_hook?.slice(0, 60) })
    } catch (err) {
      logger.error(`[05-SCORE] Failed: ${lead.domain}`, { error: err.message })
    }
    await delay(400)
  }

  logger.info(`[05-SCORE] COMPLETE — ${scored} scored`)
  return scored
}

if (process.argv[1]?.endsWith('scorer.js')) {
  runScoring({ limit: 20 }).catch(console.error)
}
