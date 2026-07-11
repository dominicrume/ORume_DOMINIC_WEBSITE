// LIVING ENGINE — Stage 03: HARVEST · Playwright + Companies House
import 'dotenv/config'
import { chromium } from 'playwright'
import robotsParser from 'robots-parser'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { DB } from '../lib/db.js'
import { withLimit, delay } from '../lib/rateLimiter.js'
import { logger } from '../lib/logger.js'

const EMAIL_RE = /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g
const SKIP_EMAIL = ['example.','test.','noreply','no-reply','privacy@','legal@','sentry','wixpress','shopify','.png','.jpg']
const CONTACT_PATHS = ['','/contact','/contact-us','/about','/about-us','/team','/support','/info']

function addEmail(set, e) {
  if (!e) return
  e = e.toLowerCase().trim()
  if (SKIP_EMAIL.some(p => e.includes(p))) return
  if (!e.includes('@') || e.length > 100) return
  set.add(e)
}

async function robotsOk(domain) {
  try {
    const res = await axios.get(`https://${domain}/robots.txt`, { timeout: 5000 })
    return robotsParser(`https://${domain}/robots.txt`, res.data).isAllowed('/', 'LivingEngine/1.0') !== false
  } catch { return true }
}

async function scrapeWebsite(domain) {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })
  const ctx     = await browser.newContext({ userAgent: 'Mozilla/5.0 (compatible; LivingEngine/1.0; +https://vorem.co/bot)', locale: 'en-GB' })
  const page    = await ctx.newPage()
  const emails  = new Set()
  let storeName = null
  try {
    const res = await page.goto(`https://${domain}`, { timeout: 20000, waitUntil: 'domcontentloaded' }).catch(() => null)
    if (res?.ok()) {
      storeName = (await page.title()).replace(/\s*[-|·—].*$/, '').trim().slice(0, 80)
      const html = await page.content()
      const $ = cheerio.load(html)
      ;(html.match(EMAIL_RE) || []).forEach(e => addEmail(emails, e))
      $('a[href^="mailto:"]').each((_, el) => addEmail(emails, $(el).attr('href')?.replace('mailto:','').split('?')[0]))
    }
    for (const p of CONTACT_PATHS.slice(1)) {
      if (emails.size >= 3) break
      const r2 = await page.goto(`https://${domain}${p}`, { timeout: 12000, waitUntil: 'domcontentloaded' }).catch(() => null)
      if (!r2?.ok()) continue
      const html = await page.content()
      const $ = cheerio.load(html)
      ;(html.match(EMAIL_RE) || []).forEach(e => addEmail(emails, e))
      $('a[href^="mailto:"]').each((_, el) => addEmail(emails, $(el).attr('href')?.replace('mailto:','').split('?')[0]))
      await delay(600)
    }
  } finally { await browser.close() }
  return { emails: [...emails], storeName }
}

export async function runHarvest({ limit = 40 } = {}) {
  const pending = DB.domains.pending.all(limit)
  logger.info(`[03-HARVEST] Processing ${pending.length} target domains`)
  let harvested = 0, errors = 0
  for (const row of pending) {
    DB.domains.setStatus.run('harvesting', row.domain)
    try {
      if (!(await robotsOk(row.domain))) { DB.domains.setStatus.run('skip_robots', row.domain); continue }
      DB.domains.setRobots.run(row.domain)
      const { emails, storeName } = await scrapeWebsite(row.domain)
      if (emails.length > 0) {
        emails.forEach(email => DB.leads.insert.run({ domain: row.domain, niche: row.niche, store_name: storeName || row.domain, email, email_source: 'website', email_provider: null, mx_provider: row.mx_provider, bsr: null, est_rev_month: null, review_count: null }))
        harvested++
        logger.info(`[03-HARVEST] ✓ ${row.domain} → ${emails.length} emails`)
      }
      DB.domains.setStatus.run('done', row.domain)
    } catch (err) {
      errors++
      DB.domains.setStatus.run('error', row.domain)
      logger.error(`[03-HARVEST] Error: ${row.domain}`, { error: err.message })
    }
    await delay(3500)
  }
  logger.info(`[03-HARVEST] COMPLETE`, { harvested, errors })
  return { harvested, errors }
}

if (process.argv[1]?.endsWith('harvest.js')) { runHarvest({ limit: 10 }).catch(console.error) }
