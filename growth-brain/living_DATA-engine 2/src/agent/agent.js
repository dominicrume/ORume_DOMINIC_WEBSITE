// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — The Agent
// This is the organism. It wakes up, thinks, acts, learns, sleeps.
// Run once: npm run agent:once
// Run forever: npm run agent   (starts cron scheduler)
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import cron from 'node-cron'
import { DB } from '../lib/db.js'
import { Memory } from '../lib/memory.js'
import { logger } from '../lib/logger.js'
import { runDiscover } from '../scrapers/discover.js'
import { runMxIntel }  from '../intel/mxLookup.js'
import { runHarvest }  from '../scrapers/harvest.js'
import { runEnrichment } from '../enrichment/enrichAll.js'
import { runScoring }  from './scorer.js'
import { runSequencer } from '../outreach/sequencer.js'
import { runMatcher }   from '../sales/matcher.js'
import { runConverter } from '../sales/converter.js'
import { runLearner }  from '../brain/learner.js'

const ARGS        = process.argv.slice(2)
const RUN_ONCE    = ARGS.includes('--once')
const SINGLE_STAGE= ARGS.includes('--stage') ? ARGS[ARGS.indexOf('--stage') + 1] : null

// ── Run one full agent cycle ──────────────────────────────────
async function runCycle() {
  const state = Memory.getState()
  const cycleNum = (state.cycle_count || 0) + 1

  logger.info(`\n${'═'.repeat(70)}`)
  logger.info(`⚡ LIVING ENGINE — CYCLE ${cycleNum} STARTING`)
  logger.info(`   Active niches: ${state.active_niches?.length}`)
  logger.info(`   Min score:     ${state.min_score_threshold}`)
  logger.info(`   Email angle:   ${state.current_email_angle}`)
  logger.info(`   Max outreach:  ${state.max_outreach_per_cycle}`)
  logger.info('═'.repeat(70))

  // Start cycle record
  const cycleId = DB.cycles.start.run({
    cycle_number:   cycleNum,
    ai_directives:  JSON.stringify(state.directives?.slice(-1)[0] || {}),
  }).lastInsertRowid

  const metrics = {
    domains_found:    0,
    mx_filtered:      0,
    emails_harvested: 0,
    leads_enriched:   0,
    leads_scored:     0,
    emails_sent:      0,
    products_matched: 0,
    sales_sequences:  0,
    replies:          0,
    conversions:      0,
  }

  try {
    // ── Stage 01: DISCOVER ──────────────────────────────────
    if (!SINGLE_STAGE || SINGLE_STAGE === 'discover') {
      logger.info('\n── STAGE 01: DISCOVER ──')
      metrics.domains_found = await runDiscover({
        niches:       state.active_niches,
        maxPerNiche:  30,
      })
    }

    // ── Stage 02: MX INTELLIGENCE ──────────────────────────
    if (!SINGLE_STAGE || SINGLE_STAGE === 'mx') {
      logger.info('\n── STAGE 02: MX INTELLIGENCE ──')
      const mxStats = await runMxIntel({
        limit:            Number(process.env.MAX_DOMAINS_PER_CYCLE) || 200,
        targetProviders:  state.target_providers,
      })
      metrics.mx_filtered = mxStats?.target || 0
    }

    // ── Stage 03: HARVEST ───────────────────────────────────
    if (!SINGLE_STAGE || SINGLE_STAGE === 'harvest') {
      logger.info('\n── STAGE 03: HARVEST ──')
      const h = await runHarvest({ limit: 50 })
      metrics.emails_harvested = h?.harvested || 0
    }

    // ── Stage 04: ENRICH ────────────────────────────────────
    if (!SINGLE_STAGE || SINGLE_STAGE === 'enrich') {
      logger.info('\n── STAGE 04: ENRICH ──')
      const e = await runEnrichment({
        limit: Number(process.env.MAX_LEADS_TO_ENRICH) || 100,
      })
      metrics.leads_enriched = e?.enriched || 0
    }

    // ── Stage 05: SCORE ─────────────────────────────────────
    if (!SINGLE_STAGE || SINGLE_STAGE === 'score') {
      logger.info('\n── STAGE 05: SCORE ──')
      metrics.leads_scored = await runScoring({
        limit:      Number(process.env.MAX_LEADS_TO_SCORE) || 200,
        emailAngle: state.current_email_angle,
      })
    }

    // ── Stage 06: OUTREACH ──────────────────────────────────
    if (!SINGLE_STAGE || SINGLE_STAGE === 'outreach') {
      logger.info('\n── STAGE 06: OUTREACH ──')
      const o = await runSequencer({
        limit:    state.max_outreach_per_cycle || 30,
        minScore: state.min_score_threshold || 65,
        angle:    state.current_email_angle,
      })
      metrics.emails_sent = o?.sent || 0
    }

    // ── Stage 08: PRODUCT MATCH (data → product) ────────────
    if (!SINGLE_STAGE || SINGLE_STAGE === 'match') {
      logger.info('\n── STAGE 08: PRODUCT MATCH ──')
      metrics.products_matched = await runMatcher({ limit: 100 })
    }

    // ── Stage 09: CONVERT (product → sales sequence) ────────
    if (!SINGLE_STAGE || SINGLE_STAGE === 'convert') {
      logger.info('\n── STAGE 09: CONVERT ──')
      metrics.sales_sequences = await runConverter({ limit: 50 })
    }

    // ── Stage 07: LEARN ─────────────────────────────────────
    logger.info('\n── STAGE 07: LEARN (AI BRAIN) ──')
    await runLearner(cycleId)

    // Update memory with cycle completion
    Memory.completeCycle(metrics)

    // Persist niche + provider performance
    const nicheBreak    = DB.leads.nicheBreakdown.all()
    const providerBreak = DB.leads.providerBreakdown.all()

    nicheBreak.forEach(n => {
      Memory.updateNichePerformance(n.niche, {
        sent:      n.n,
        replies:   n.replies || 0,
        avg_score: n.avg,
      })
    })

    providerBreak.forEach(p => {
      Memory.updateProviderPerformance(p.email_provider, {
        sent:      p.n,
        avg_score: p.avg,
      })
    })

    const elapsed = ((Date.now() - cycleStart) / 1000 / 60).toFixed(1)
    logger.info(`\n${'═'.repeat(70)}`)
    logger.info(`✓ CYCLE ${cycleNum} COMPLETE in ${elapsed} minutes`)
    logger.info('  ' + JSON.stringify(metrics))
    logger.info('═'.repeat(70))

  } catch (err) {
    logger.error(`✗ CYCLE ${cycleNum} FAILED`, { error: err.message, stack: err.stack })
    DB.audit.log.run('agent', cycleId, 'cycle_error', err.message)
  }
}

// ── Entrypoint ────────────────────────────────────────────────
let cycleStart = Date.now()

if (RUN_ONCE) {
  // Single run — for testing or manual trigger
  logger.info('Running single cycle (--once flag)')
  runCycle().catch(console.error)

} else {
  // Scheduled mode — runs forever
  const mainCron   = process.env.AGENT_CRON   || '0 6 * * 1,4'
  const learnCron  = process.env.LEARN_CRON   || '0 20 * * *'
  const timezone   = process.env.AGENT_TIMEZONE|| 'Europe/London'

  logger.info('⚡ LIVING ENGINE STARTED — SCHEDULED MODE')
  logger.info(`   Main cycle:  ${mainCron} (${timezone})`)
  logger.info(`   Learn cycle: ${learnCron} (${timezone})`)
  logger.info('   Waiting for next scheduled run...')

  // Full pipeline — runs Monday + Thursday at 6am
  cron.schedule(mainCron, () => {
    cycleStart = Date.now()
    logger.info('⏰ Scheduled cycle triggered')
    runCycle().catch(err => logger.error('Scheduled cycle failed', { error: err.message }))
  }, { timezone })

  // Learn-only — runs every night at 8pm
  cron.schedule(learnCron, () => {
    logger.info('⏰ Nightly learn cycle triggered')
    runLearner(null).catch(err => logger.error('Learn cycle failed', { error: err.message }))
  }, { timezone })

  // Keep process alive
  process.on('SIGTERM', () => { logger.info('SIGTERM received — agent shutting down gracefully'); process.exit(0) })
  process.on('SIGINT',  () => { logger.info('SIGINT received — agent shutting down gracefully');  process.exit(0) })
}
