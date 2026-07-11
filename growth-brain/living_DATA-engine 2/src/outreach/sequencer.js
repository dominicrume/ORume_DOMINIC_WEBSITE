// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — Stage 06: OUTREACH SEQUENCER
// Provider-specific emails. Every sequence is unique.
// H8: Unsubscribe in every email.
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import axios from 'axios'
import { DB } from '../lib/db.js'
import { withLimit, delay } from '../lib/rateLimiter.js'
import { logger } from '../lib/logger.js'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM = `You are a world-class B2B cold email copywriter with 10 years targeting Amazon sellers.
Rules: Never say "I hope this finds you well". Never "just checking in".
Open with the lead's specific email_hook (provided). One idea per email.
Email 1: 80 words. Email 2: 60 words. Email 3: 40 words.
H8: every email footer: "Not relevant? Reply STOP and I will never contact you again."
Return ONLY valid JSON.`

export async function generateSequence(lead, angle = 'supply_chain_pain') {
  return withLimit('claude', async () => {
    const msg = await claude.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 900,
      system: SYSTEM,
      messages: [{
        role: 'user',
        content: `Generate 3-email sequence for:

Store: ${lead.store_name}
Domain: ${lead.domain}
Niche: ${lead.niche}
Contact: ${lead.first_name || 'there'} (${lead.job_title || 'owner'})
Email provider: ${lead.email_provider || 'unknown'}
Opening hook (USE THIS): "${lead.email_hook}"
Pain point: ${lead.pain_point}
Buy signal: ${lead.buy_signal}
Score: ${lead.score}/100
Angle: ${angle}

Service: Amazon email marketing + supplier network (increases repeat buyer rate 25-40%).
Sender: ${process.env.SENDING_NAME || 'Alex'}

Return JSON:
{
  "email1": {
    "subject": "<5-8 words, niche-specific, no spam>",
    "body": "<80 words. OPEN with the email_hook above — do not change it. No pitch. Smart question only. Sign as ${process.env.SENDING_NAME}. Footer: Not relevant? Reply STOP and I will never contact you again.>"
  },
  "email2": {
    "subject": "<follow-up — references email 1>",
    "body": "<60 words. Reference no reply. One stat about ${lead.niche} sellers using email marketing. Single CTA: 15-min call. Footer: Reply STOP to opt out.>"
  },
  "email3": {
    "subject": "<4-5 word breakup>",
    "body": "<40 words. Warm breakup. Door permanently open. One last niche-specific value line. Footer: Reply STOP to opt out permanently.>"
  }
}`,
      }],
    })
    const raw = msg.content[0].text
    return JSON.parse(raw.replace(/```json|```/g, '').trim())
  })
}

async function sendViaInstantly(lead, email) {
  const key = process.env.INSTANTLY_API_KEY
  if (!key || key.startsWith('your-')) {
    logger.info('[06-OUTREACH] Mock send (no Instantly key)', { email: lead.email, subject: email.subject })
    return { id: `mock_${Date.now()}` }
  }
  const res = await axios.post('https://api.instantly.ai/api/v1/lead/add', {
    api_key:    key,
    campaign_id: process.env.INSTANTLY_CAMPAIGN_ID,
    skip_if_in_workspace: true,
    leads: [{
      email:      lead.email,
      first_name: lead.first_name || '',
      last_name:  lead.last_name  || '',
      company:    lead.store_name || lead.domain,
      personalization: email.body,
      website:    lead.domain,
    }],
  }, { timeout: 10000 })
  return res.data
}

export async function runSequencer({ limit = 30, minScore = 65, angle = 'supply_chain_pain' } = {}) {
  const leads = DB.leads.forOutreach.all(minScore, limit)
  logger.info(`[06-OUTREACH] Processing ${leads.length} leads (score≥${minScore})`)
  let sent = 0, errors = 0

  for (const lead of leads) {
    try {
      const seq = await generateSequence(lead, angle)
      // Save all 3 touches to outreach table (H7)
      for (const [key, email] of Object.entries({ email1: seq.email1, email2: seq.email2, email3: seq.email3 })) {
        DB.outreach.insert.run({
          lead_id: lead.id,
          touch:   Number(key.replace('email', '')),
          subject: email.subject,
          body:    email.body,
        })
      }
      // Send Email 1
      await sendViaInstantly(lead, seq.email1)
      DB.leads.updateStatus.run(lead.id, 'sent')
      DB.audit.log.run('lead', lead.id, 'outreach_sent', seq.email1.subject)
      sent++
      logger.info(`[06-OUTREACH] ✓ ${lead.email}`, { subject: seq.email1.subject, score: lead.score })
    } catch (err) {
      errors++
      logger.error(`[06-OUTREACH] Failed: ${lead.email}`, { error: err.message })
    }
    await delay(2000)
  }

  logger.info(`[06-OUTREACH] COMPLETE`, { sent, errors })
  return { sent, errors }
}

if (process.argv[1]?.endsWith('sequencer.js')) {
  runSequencer({ limit: 5 }).catch(console.error)
}
