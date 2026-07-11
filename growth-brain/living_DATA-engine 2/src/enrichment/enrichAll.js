// LIVING ENGINE — Stage 04: ENRICH · Hunter + Apollo + RDAP
import 'dotenv/config'
import axios from 'axios'
import { promises as dns } from 'dns'
import { DB } from '../lib/db.js'
import { withLimit, delay } from '../lib/rateLimiter.js'
import { logger } from '../lib/logger.js'
import { fingerprintMx } from '../intel/mxLookup.js'

// Hunter.io
async function hunterVerify(email) {
  const key = process.env.HUNTER_API_KEY
  if (!key || key.startsWith('your-')) return null
  return withLimit('hunter', () => axios.get('https://api.hunter.io/v2/email-verifier', { params: { email, api_key: key }, timeout: 10000 })
    .then(r => ({ result: r.data?.data?.result, score: r.data?.data?.score }))).catch(() => null)
}

async function hunterDomain(domain) {
  const key = process.env.HUNTER_API_KEY
  if (!key || key.startsWith('your-')) return []
  return withLimit('hunter', () => axios.get('https://api.hunter.io/v2/domain-search', { params: { domain, api_key: key, limit: 5, type: 'personal' }, timeout: 10000 })
    .then(r => (r.data?.data?.emails || []).map(e => ({ email: e.value, first_name: e.first_name, last_name: e.last_name, position: e.position, confidence: e.confidence })))).catch(() => [])
}

// Apollo.io
async function apolloEnrich(email, domain) {
  const key = process.env.APOLLO_API_KEY
  if (!key || key.startsWith('your-')) return null
  return withLimit('apollo', () => axios.post('https://api.apollo.io/v1/people/match', { email, domain, reveal_personal_emails: false }, { headers: { 'Content-Type': 'application/json', 'x-api-key': key }, timeout: 12000 })
    .then(r => {
      const p = r.data?.person
      if (!p) return null
      return { first_name: p.first_name, last_name: p.last_name, title: p.title, linkedin_url: p.linkedin_url, company_size: p.organization?.employee_count }
    })).catch(() => null)
}

// Detect email provider from email domain's MX
async function detectEmailProvider(email) {
  try {
    const emailDomain = email.split('@')[1]
    const records = await dns.resolveMx(emailDomain).catch(() => [])
    const fp = fingerprintMx(records, emailDomain)
    return fp.provider
  } catch { return null }
}

export async function runEnrichment({ limit = 100 } = {}) {
  const leads = DB.leads.forEnrich.all(limit)
  logger.info(`[04-ENRICH] Enriching ${leads.length} leads`)
  let enriched = 0, errors = 0

  for (const lead of leads) {
    try {
      const update = { id: lead.id, email_verified: 0, first_name: lead.first_name, last_name: lead.last_name, job_title: lead.job_title, linkedin_url: lead.linkedin_url, company_size: lead.company_size, pain_point: lead.pain_point, buy_signal: lead.buy_signal, email_hook: lead.email_hook }

      // Detect provider from email domain MX
      const provider = await detectEmailProvider(lead.email)
      if (provider) {
        // Update email_provider in leads table
        DB.db?.prepare('UPDATE leads SET email_provider=? WHERE id=?')?.run(provider, lead.id)
      }

      // Verify email
      const v = await hunterVerify(lead.email)
      update.email_verified = v?.result === 'deliverable' ? 1 : 0

      // If undeliverable try domain search
      if (!update.email_verified) {
        const alts = await hunterDomain(lead.domain)
        const best = alts.sort((a,b) => b.confidence - a.confidence)[0]
        if (best?.confidence > 70) { update.email_verified = 1; update.first_name = best.first_name || update.first_name; update.last_name = best.last_name || update.last_name; update.job_title = best.position || update.job_title }
      }

      // Apollo enrich
      const apollo = await apolloEnrich(lead.email, lead.domain)
      if (apollo) { update.first_name = apollo.first_name || update.first_name; update.last_name = apollo.last_name || update.last_name; update.job_title = apollo.title || update.job_title; update.linkedin_url = apollo.linkedin_url || update.linkedin_url; update.company_size = String(apollo.company_size || update.company_size || '') }

      DB.leads.updateEnrich.run(update)
      DB.audit.log.run('lead', lead.id, 'enriched', JSON.stringify({ verified: update.email_verified, title: update.job_title }))
      enriched++
      logger.info(`[04-ENRICH] ✓ ${lead.domain}`, { verified: update.email_verified })
    } catch (err) { errors++; logger.error(`[04-ENRICH] Failed: ${lead.domain}`, { error: err.message }) }
    await delay(1500)
  }

  logger.info(`[04-ENRICH] COMPLETE`, { enriched, errors })
  return { enriched, errors }
}

if (process.argv[1]?.endsWith('enrichAll.js')) { runEnrichment({ limit: 20 }).catch(console.error) }
