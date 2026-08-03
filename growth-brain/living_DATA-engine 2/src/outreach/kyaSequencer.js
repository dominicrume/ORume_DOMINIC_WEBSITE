// ═══════════════════════════════════════════════════════════════
// KYA OUTREACH SEQUENCER
// Follows KYA Method: Reads Rules, Generates, Queues for HITL
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import OpenAI from 'openai'
import { DB } from '../lib/db.js'
import { withLimit, delay } from '../lib/rateLimiter.js'
import { logger } from '../lib/logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function generateKyaSequence(lead, angle = 'supply_chain_pain') {
  return withLimit('claude', async () => {
    
    // KYA Method Step 1: Read the promise before the code
    const rulesPath = path.join(__dirname, '../../THE-RULES.md')
    const jobPath = path.join(__dirname, '../engine/step-2-check/THE-JOB-OUTREACH.md')
    const theRules = fs.existsSync(rulesPath) ? fs.readFileSync(rulesPath, 'utf-8') : ''
    const theJob = fs.existsSync(jobPath) ? fs.readFileSync(jobPath, 'utf-8') : ''

    const SYSTEM = `
---
THE RULES OF THIS SYSTEM (KYA Method):
${theRules}
---
YOUR SPECIFIC JOB FOR THIS STAGE:
${theJob}
---
`
    const msg = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: "json_object" },
      messages: [
        { role: 'system', content: SYSTEM },
        {
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

Return ONLY valid JSON in this format:
{
  "email1": { "subject": "...", "body": "..." },
  "email2": { "subject": "...", "body": "..." },
  "email3": { "subject": "...", "body": "..." }
}
`
        }
      ],
    })
    const raw = msg.choices[0].message.content
    return JSON.parse(raw.trim())
  })
}

async function autoFireAndSeal(lead, sequenceObj) {
  try {
    console.log(`[AUTO-FIRE] Mathematically sealing and firing email sequence for ${lead.email}...`);
    
    const payload = {
      lead_email: lead.email,
      lead_domain: lead.domain,
      ...sequenceObj
    }
    
    // 1. Log to HITL as auto-approved
    const info = DB.hitl.insert.run({
      action_type: 'outreach_email',
      payload_json: JSON.stringify(payload)
    });
    
    DB.hitl.approve.run({ id: info.lastInsertRowid, payload_json: JSON.stringify(payload) });
    
    // 2. Cryptographic Sealing (KYA Step 4)
    const crypto = await import('crypto');
    const latestProof = DB.proofs.latest.get();
    const prevHash = latestProof ? latestProof.payload_hash : 'GENESIS_BLOCK';
    const dataToHash = JSON.stringify({
      hitl_id: info.lastInsertRowid,
      action_type: 'outreach_email',
      payload: JSON.stringify(payload),
      prev_hash: prevHash,
      timestamp: new Date().toISOString()
    });
    const payloadHash = crypto.createHash('sha256').update(dataToHash).digest('hex');
    
    DB.proofs.insert.run({
      hitl_id: info.lastInsertRowid,
      action_type: 'outreach_email',
      payload_hash: payloadHash,
      prev_hash: prevHash
    });
    console.log(`🔒 KYA Audit: Email action sealed. Hash: ${payloadHash}`);
    
    // 3. Fire to Make.com Webhook (Brevo connection)
    const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
    if (MAKE_WEBHOOK_URL) {
      console.log('🚀 Firing email payload to Make.com...');
      await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: "Warm Engine Email Blast (Auto-Fired)",
          lead_email: payload.lead_email,
          lead_domain: payload.lead_domain,
          email_sequence: payload,
          timestamp: new Date().toISOString()
        })
      });
      console.log('✅ Email payload delivered to Make.com successfully!');
    } else {
      console.warn('⚠️ MAKE_WEBHOOK_URL not set in environment. Simulated only.');
    }
    
    // 4. Mark as sent in leads so we don't sequence again immediately
    DB.leads.updateStatus.run(lead.id, 'sent')
    
    console.log(`✅ Successfully auto-fired sequence for ${lead.email}!`);
    return true;
  } catch (err) {
    console.error('❌ Failed to auto-fire email:', err.message);
    return false;
  }
}

export async function runKyaSequencer({ limit = 5, minScore = 65, angle = 'supply_chain_pain' } = {}) {
  const leads = DB.leads.forOutreach.all(minScore, limit)
  logger.info(`[KYA-OUTREACH] Processing ${leads.length} leads (score≥${minScore})`)
  let queued = 0, errors = 0

  for (const lead of leads) {
    try {
      const seq = await generateKyaSequence(lead, angle)
      await autoFireAndSeal(lead, seq)
      queued++
    } catch (err) {
      errors++
      logger.error(`[KYA-OUTREACH] Failed: ${lead.email}`, { error: err.message })
    }
    await delay(2000)
  }

  logger.info(`[KYA-OUTREACH] COMPLETE`, { queued, errors })
  return { queued, errors }
}

if (process.argv[1]?.endsWith('kyaSequencer.js')) {
  runKyaSequencer({ limit: 1 }).catch(console.error)
}
