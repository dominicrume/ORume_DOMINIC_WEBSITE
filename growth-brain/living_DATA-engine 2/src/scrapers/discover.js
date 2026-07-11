// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — Stage 01: DISCOVER
// Finds Amazon seller brand domains — SerpAPI + Keepa + GMB
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import axios from 'axios'
import { DB } from '../lib/db.js'
import { withLimit, delay } from '../lib/rateLimiter.js'
import { logger } from '../lib/logger.js'

const SKIP = new Set(['amazon.com','amazon.co.uk','ebay.com','etsy.com','shopify.com',
  'youtube.com','facebook.com','instagram.com','twitter.com','x.com','linkedin.com',
  'reddit.com','pinterest.com','google.com','wikipedia.org','trustpilot.com'])

export const NICHE_QUERIES = {
  'Kitchen & Home':          ['"amazon seller" kitchen home brand "contact us" -site:amazon.com','kitchen accessories brand "sold on amazon" official website email'],
  'Pet Supplies':             ['"amazon seller" pet supplies brand official website "contact us"','pet accessories brand UK "available on amazon" -site:amazon.com email'],
  'Beauty & Health':          ['beauty brand UK "sold on amazon" official website contact email','"amazon seller" skincare brand UK "contact us" -amazon.com'],
  'Sports & Fitness':         ['fitness brand UK amazon seller official website "contact us"','"sports accessories" amazon FBA UK brand email -amazon.com'],
  'Baby Products':            ['baby brand UK amazon seller official website contact email','"baby accessories" amazon FBA UK "contact us" -amazon.com'],
  'Garden & Outdoor':         ['garden brand UK amazon seller official "contact us" -amazon.com','outdoor accessories brand UK amazon FBA email official site'],
  'Electronics Accessories':  ['tech accessories brand UK amazon seller official website email','"electronics accessories" amazon FBA UK brand contact -amazon.com'],
  'Automotive':               ['car accessories brand UK amazon seller official website email','automotive brand UK amazon FBA "about us" -amazon.com contact'],
  'Toys & Games':             ['toy brand UK amazon seller official website email contact','"educational toys" brand UK amazon FBA official -amazon.com'],
  'Home Office':              ['office accessories brand UK amazon seller "contact us" email','"work from home" products brand UK amazon FBA official'],
}

async function serpSearch(query, niche) {
  const key = process.env.SERPAPI_KEY
  if (!key || key.startsWith('your-')) return []
  return withLimit('serpapi', () =>
    axios.get('https://serpapi.com/search.json', {
      params: { q: query, api_key: key, engine: 'google', num: 10, gl: 'gb', hl: 'en' },
      timeout: 15000,
    }).then(r => (r.data?.organic_results || []).flatMap(res => {
      try {
        const domain = new URL(res.link).hostname.replace('www.', '')
        return SKIP.has(domain) ? [] : [{ domain, niche, source: 'serpapi' }]
      } catch { return [] }
    }))
  ).catch(() => [])
}

async function keepaDiscover(niche) {
  const key = process.env.KEEPA_API_KEY
  if (!key || key.startsWith('your-')) return []
  const CATS = { 'Kitchen & Home':3764231,'Pet Supplies':2619533,'Beauty & Health':11057241,'Sports & Fitness':6400980,'Baby Products':3374871,'Garden & Outdoor':11052681,'Electronics Accessories':12805339,'Automotive':11052692 }
  const catId = CATS[niche]
  if (!catId) return []
  return withLimit('keepa', async () => {
    const bs = await axios.get('https://api.keepa.com/bestsellers', { params: { key, domain: 3, category: catId }, timeout: 12000 })
    const asins = bs.data?.bestsellers?.slice(0, 10)
    if (!asins?.length) return []
    const pd = await axios.get('https://api.keepa.com/product', { params: { key, domain: 3, asin: asins.join(','), stats: 0 }, timeout: 12000 })
    return (pd.data?.products || [])
      .filter(p => p.brand && p.brand.length > 2 && !['generic','various'].includes(p.brand.toLowerCase()))
      .map(p => ({ domain: `${p.brand.toLowerCase().replace(/[^a-z0-9]/g,'')}.com`, niche, source: 'keepa' }))
  }).catch(() => [])
}

export async function runDiscover({ niches, maxPerNiche = 40 } = {}) {
  const targets = niches || Object.keys(NICHE_QUERIES)
  let total = 0
  for (const niche of targets) {
    logger.info(`[01-DISCOVER] ${niche}`)
    const seen = new Set()
    for (const q of (NICHE_QUERIES[niche] || []).slice(0, 3)) {
      if (seen.size >= maxPerNiche) break
      ;(await serpSearch(q, niche)).forEach(r => { if (!seen.has(r.domain)) { seen.add(r.domain); DB.domains.upsert.run(r) } })
      await delay(2500)
    }
    ;(await keepaDiscover(niche)).forEach(r => { if (!seen.has(r.domain)) { seen.add(r.domain); DB.domains.upsert.run(r) } })
    logger.info(`[01-DISCOVER] ${niche}: ${seen.size} domains`)
    total += seen.size
    await delay(3000)
  }
  logger.info('[01-DISCOVER] COMPLETE', { total })
  return total
}

if (process.argv[1]?.endsWith('discover.js')) { runDiscover({ maxPerNiche: 20 }).catch(console.error) }
