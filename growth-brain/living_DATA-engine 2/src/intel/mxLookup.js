// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — Stage 02: MX INTELLIGENCE
// FREE DNS lookups reveal which email service every seller uses.
// We only proceed with premium non-Gmail providers.
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import { promises as dns } from 'dns'
import { DB } from '../lib/db.js'
import { delay } from '../lib/rateLimiter.js'
import { logger } from '../lib/logger.js'

export const MX_FINGERPRINTS = [
  // PRIME TARGETS — small biz, pays for email, fast decisions
  { pattern: 'networksolutions',      provider: 'network_solutions', tier: 'target' },
  { pattern: 'privateemail.com',      provider: 'private_email',     tier: 'target' },
  { pattern: 'titan.email',           provider: 'titan_email',       tier: 'target' },
  { pattern: 'emailsrvr.com',         provider: 'rackspace',         tier: 'target' },
  { pattern: 'messagingengine.com',   provider: 'fastmail',          tier: 'target' },
  { pattern: 'hushmail.com',          provider: 'hushmail',          tier: 'target' },
  { pattern: 'zoho.com',              provider: 'zoho',              tier: 'target' },
  { pattern: 'zohomail.com',          provider: 'zoho',              tier: 'target' },
  { pattern: 'secureserver.net',      provider: 'godaddy',           tier: 'target' },
  { pattern: 'bluehost.com',          provider: 'bluehost',          tier: 'target' },
  { pattern: 'hostgator.com',         provider: 'hostgator',         tier: 'target' },
  { pattern: 'dreamhost.com',         provider: 'dreamhost',         tier: 'target' },
  { pattern: 'siteground.com',        provider: 'siteground',        tier: 'target' },
  { pattern: 'ionos.com',             provider: 'ionos',             tier: 'target' },
  { pattern: '1and1.com',             provider: 'ionos',             tier: 'target' },
  { pattern: 'one.com',               provider: 'one_com',           tier: 'target' },
  { pattern: 'tsohost.com',           provider: 'tsohost',           tier: 'target' },
  { pattern: 'krystal.io',            provider: 'krystal',           tier: 'target' },
  { pattern: '123-reg.co.uk',         provider: '123reg',            tier: 'target' },
  { pattern: 'heart.internet',        provider: 'heart_internet',    tier: 'target' },
  { pattern: 'protonmail.ch',         provider: 'protonmail',        tier: 'target' },
  { pattern: 'proton.me',             provider: 'protonmail',        tier: 'target' },
  { pattern: 'tutanota.com',          provider: 'tutanota',          tier: 'target' },
  { pattern: 'runbox.com',            provider: 'runbox',            tier: 'target' },
  { pattern: 'pair.com',              provider: 'pair',              tier: 'target' },
  { pattern: 'web.com',               provider: 'web_com',           tier: 'target' },
  { pattern: 'register.com',          provider: 'register_com',      tier: 'target' },
  { pattern: 'hover.com',             provider: 'hover',             tier: 'target' },
  { pattern: 'namecheap.com',         provider: 'namecheap',         tier: 'target' },
  // UK-specific hosts
  { pattern: 'easily.co.uk',          provider: 'easily_uk',         tier: 'target' },
  { pattern: 'names.co.uk',           provider: 'names_uk',          tier: 'target' },
  { pattern: 'fasthosts.co.uk',       provider: 'fasthosts_uk',      tier: 'target' },
  { pattern: 'ukhost4u.com',          provider: 'ukhost4u',          tier: 'target' },

  // ACCEPTABLE — mid-market, worth attempting
  { pattern: 'protection.outlook.com',provider: 'microsoft365',      tier: 'acceptable' },
  { pattern: 'mail.protection.outlook',provider: 'microsoft365',     tier: 'acceptable' },

  // SKIP — wrong profile
  { pattern: 'google.com',    provider: 'gmail',   tier: 'skip' },
  { pattern: 'gmail.com',     provider: 'gmail',   tier: 'skip' },
  { pattern: 'googlemail',    provider: 'gmail',   tier: 'skip' },
  { pattern: 'outlook.com',   provider: 'outlook', tier: 'skip' },
  { pattern: 'hotmail.com',   provider: 'hotmail', tier: 'skip' },
  { pattern: 'yahoo.com',     provider: 'yahoo',   tier: 'skip' },
  { pattern: 'live.com',      provider: 'live',    tier: 'skip' },
  { pattern: 'icloud.com',    provider: 'icloud',  tier: 'skip' },
  { pattern: 'aol.com',       provider: 'aol',     tier: 'skip' },
]

export function fingerprintMx(records, domain) {
  if (!records?.length) return { provider: 'none', tier: 'unknown' }
  const exchanges = records.map(r => r.exchange.toLowerCase()).join(' ')

  // Check self-hosted first
  const domainBase = domain.split('.').slice(-2, -1)[0]
  const isSelfHosted = records.some(r => r.exchange.toLowerCase().includes(domainBase))
  if (isSelfHosted) return { provider: 'self_hosted', tier: 'target' }

  for (const fp of MX_FINGERPRINTS) {
    if (exchanges.includes(fp.pattern)) return { provider: fp.provider, tier: fp.tier }
  }
  return { provider: 'unknown', tier: 'unknown' }
}

export async function lookupMx(domain) {
  try {
    const records = await dns.resolveMx(domain)
    const sorted  = records.sort((a, b) => a.priority - b.priority)
    const fp      = fingerprintMx(sorted, domain)
    return { ...fp, mx_raw: JSON.stringify(sorted) }
  } catch {
    return { provider: 'none', tier: 'unknown', mx_raw: null }
  }
}

export async function runMxIntel({ limit = 200, targetProviders } = {}) {
  const domains = DB.domains.pendingMx.all(limit)
  logger.info(`[02-MX-INTEL] Checking ${domains.length} domains`)
  const stats = {}

  for (const row of domains) {
    const result = await lookupMx(row.domain)
    DB.domains.setMx.run({
      domain:      row.domain,
      mx_provider: result.provider,
      mx_tier:     result.tier,
      mx_raw:      result.mx_raw,
    })
    stats[result.tier] = (stats[result.tier] || 0) + 1
    if (result.tier === 'target') {
      logger.info(`[02-MX-INTEL] ✓ TARGET: ${row.domain} → ${result.provider}`)
    }
    await delay(80)
  }

  logger.info('[02-MX-INTEL] COMPLETE', stats)
  return stats
}

if (process.argv[1]?.endsWith('mxLookup.js')) {
  runMxIntel({ limit: 30 }).catch(console.error)
}
