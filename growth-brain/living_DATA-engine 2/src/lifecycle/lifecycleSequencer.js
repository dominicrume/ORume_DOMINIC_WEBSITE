import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import { DB } from '../lib/db.js'
import { logger } from '../lib/logger.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export class LifecycleSequencer {
  constructor() {
    this.instructions = fs.readFileSync(path.join(__dirname, 'THE-JOB-LIFECYCLE.md'), 'utf-8')
  }

  async run() {
    logger.info('[LMS] Starting Lifecycle Sequencer check...')
    await this.processAbandonedBookings()
    await this.processAbandonedCheckouts()
    logger.info('[LMS] Lifecycle Sequencer check complete.')
  }

  async processAbandonedBookings() {
    const abandonedBookings = DB.lifecycle.getAbandonedBookings.all()
    for (const lead of abandonedBookings) {
      await this.draftAndFire(lead, 'booking')
    }
  }

  async processAbandonedCheckouts() {
    const abandonedCheckouts = DB.lifecycle.getAbandonedCheckouts.all()
    for (const lead of abandonedCheckouts) {
      await this.draftAndFire(lead, 'checkout')
    }
  }

  async draftAndFire(lead, type) {
    try {
      logger.info(`[LMS] Generating ${type} recovery email for ${lead.email}...`)
      
      let context = ''
      if (type === 'booking') {
        context = `The user ${lead.first_name || 'there'} initiated a consultation booking but abandoned it. 
        Event details: ${lead.event_data || '{}'}. Draft an email pushing them to complete their booking.`
      } else if (type === 'checkout') {
        context = `The user ${lead.first_name || 'there'} initiated an Amazon checkout for a book but abandoned it.
        Event details: ${lead.event_data || '{}'}. Draft an email pushing them to secure the book.`
      }

      const response = await claude.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 400,
        temperature: 0.7,
        system: this.instructions,
        messages: [
          { role: 'user', content: context }
        ]
      })

      const emailCopy = response.content[0].text

      const payload = {
        email: lead.email,
        subject: type === 'booking' ? 'System stalled.' : 'Architecture matters.',
        body: emailCopy,
        lifecycle_type: type
      }

      await this.autoFireAndSeal(lead, payload, `lifecycle_${type}_recovery`)
    } catch (err) {
      logger.error(`[LMS] Error processing ${type} for ${lead.email}: ${err.message}`)
    }
  }

  async autoFireAndSeal(lead, payloadObj, actionType) {
    try {
      logger.info(`[LMS] Mathematically sealing and firing email sequence for ${lead.email}...`);
      
      const payloadStr = JSON.stringify(payloadObj)
      
      // 1. Insert into HITL as approved
      const info = DB.hitl.insert.run({
        action_type: actionType,
        payload_json: payloadStr
      });
      DB.hitl.approve.run({ id: info.lastInsertRowid, payload_json: payloadStr });

      // 2. Cryptographic Sealing
      const latestProof = DB.proofs.latest.get();
      const prevHash = latestProof ? latestProof.payload_hash : 'GENESIS_BLOCK';
      const dataToHash = JSON.stringify({
        hitl_id: info.lastInsertRowid,
        action_type: actionType,
        payload: payloadStr,
        prev_hash: prevHash,
        timestamp: new Date().toISOString()
      });
      const payloadHash = crypto.createHash('sha256').update(dataToHash).digest('hex');

      DB.proofs.insert.run({
        hitl_id: info.lastInsertRowid,
        action_type: actionType,
        payload_hash: payloadHash,
        prev_hash: prevHash
      });
      logger.info(`🔒 KYA Audit: Lifecycle ${actionType} action sealed. Hash: ${payloadHash}`);
      
      // 3. Fire to Make.com Webhook
      const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
      if (MAKE_WEBHOOK_URL) {
        await fetch(MAKE_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `LMS Recovery: ${actionType}`,
            email: lead.email,
            subject: payloadObj.subject,
            text: payloadObj.body,
            timestamp: new Date().toISOString()
          })
        });
        logger.info(`[LMS] Successfully fired payload to Make.com for ${lead.email}`);
      } else {
         logger.warn(`[LMS] MAKE_WEBHOOK_URL is not set. Email not physically sent.`);
      }

      return true;
    } catch (err) {
      logger.error(`[LMS] Failed to auto-fire and seal: ${err.message}`);
      return false;
    }
  }
}

// Allow running directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const sequencer = new LifecycleSequencer()
  sequencer.run().catch(console.error)
}
