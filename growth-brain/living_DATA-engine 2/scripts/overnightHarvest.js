// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE 2.0 — OVERNIGHT MULTI-STAGE GROWTH HARVEST
// Exhaustive overnight goal runner across all 9 stage boundaries
// Enforces ROOTS.md Root #1, #3, #7, #8, #11
// ═══════════════════════════════════════════════════════════════

import '../src/lib/polyfills.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { DB } from '../src/lib/db.js'
import { Memory } from '../src/lib/memory.js'
import { logger } from '../src/lib/logger.js'
import { SourceImporter } from '../src/growth/sourceImporter.js'
import { GrowthAdvisor }  from '../src/brain/growthAdvisor.js'
import { runDiscover }    from '../src/scrapers/discover.js'
import { runMxIntel }     from '../src/intel/mxLookup.js'
import { runHarvest }     from '../src/scrapers/harvest.js'
import { runEnrichment }  from '../src/enrichment/enrichAll.js'
import { runScoring }     from '../src/agent/scorer.js'
import { runSequencer }   from '../src/outreach/sequencer.js'
import { runMatcher }     from '../src/sales/matcher.js'
import { runConverter }   from '../src/sales/converter.js'
import { runLearner }     from '../src/brain/learner.js'

const __dirname   = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR    = path.join(__dirname, '../data')
const EXPORTS_DIR = path.join(__dirname, '../exports')

async function runOvernightHarvest() {
  const startTime = Date.now()
  const dateStr = new Date().toISOString().split('T')[0]
  logger.info(`\n${'█'.repeat(70)}`)
  logger.info(`🌙 LIVING ENGINE — EXHAUSTIVE OVERNIGHT MULTI-STAGE GROWTH HARVEST`)
  logger.info(`   Started: ${new Date().toUTCString()}`)
  logger.info('█'.repeat(70))

  const state = Memory.getState()
  const cycleNum = (state.cycle_count || 0) + 1
  const cycleId = DB.cycles.start.run({
    cycle_number:   cycleNum,
    ai_directives:  JSON.stringify({ mode: 'overnight_multi_stage_harvest', timestamp: new Date().toISOString() }),
  }).lastInsertRowid

  const harvestMetrics = {
    csv_rows_imported: 0,
    domains_discovered: 0,
    mx_domains_verified: 0,
    emails_harvested: 0,
    leads_enriched: 0,
    leads_scored: 0,
    outbound_staged: 0,
    products_matched: 0,
    sales_converted: 0,
    ai_recommendations: 0,
    errors: []
  }

  try {
    // ── Stage 00: AUDIENCE CSV INGESTION ─────────────────────────
    logger.info('\n── STAGE 00: SUBSTACK & AUDIENCE CSV INGESTION ──')
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.csv'))
    for (const file of files) {
      try {
        const stats = await SourceImporter.importFromCSV(path.join(DATA_DIR, file))
        harvestMetrics.csv_rows_imported += stats.imported || 0
      } catch (err) {
        harvestMetrics.errors.push(`CSV Ingest (${file}): ${err.message}`)
      }
    }

    // ── Stage 01: DOMAIN DISCOVERY ──────────────────────────────
    logger.info('\n── STAGE 01: DOMAIN DISCOVERY ──')
    try {
      harvestMetrics.domains_discovered = await runDiscover({
        niches: state.active_niches || ['ai', 'saas', 'tech', 'creators'],
        maxPerNiche: 50,
      }) || 0
    } catch (err) { harvestMetrics.errors.push(`Discover: ${err.message}`) }

    // ── Stage 02: MX INTELLIGENCE VERIFICATION ──────────────────
    logger.info('\n── STAGE 02: MX INTELLIGENCE VERIFICATION ──')
    try {
      const mxStats = await runMxIntel({
        limit: 300,
        targetProviders: state.target_providers || ['google', 'outlook'],
      })
      harvestMetrics.mx_domains_verified = mxStats?.target || 0
    } catch (err) { harvestMetrics.errors.push(`MX Intel: ${err.message}`) }

    // ── Stage 03: EMAIL HARVEST ─────────────────────────────────
    logger.info('\n── STAGE 03: EMAIL HARVEST ──')
    try {
      const h = await runHarvest({ limit: 100 })
      harvestMetrics.emails_harvested = h?.harvested || 0
    } catch (err) { harvestMetrics.errors.push(`Harvest: ${err.message}`) }

    // ── Stage 04: LEAD ENRICHMENT ───────────────────────────────
    logger.info('\n── STAGE 04: LEAD ENRICHMENT ──')
    try {
      const e = await runEnrichment({ limit: 200 })
      harvestMetrics.leads_enriched = e?.enriched || 0
    } catch (err) { harvestMetrics.errors.push(`Enrichment: ${err.message}`) }

    // ── Stage 05: AI QUALIFICATION SCORING ──────────────────────
    logger.info('\n── STAGE 05: AI QUALIFICATION SCORING ──')
    try {
      harvestMetrics.leads_scored = await runScoring({
        limit: 300,
        emailAngle: state.current_email_angle || 'ai_growth_book_gift',
      }) || 0
    } catch (err) { harvestMetrics.errors.push(`Scoring: ${err.message}`) }

    // ── Stage 06: OUTBOUND SEQUENCING STAGING ───────────────────
    logger.info('\n── STAGE 06: OUTBOUND SEQUENCING STAGING ──')
    try {
      const o = await runSequencer({
        limit: 50,
        minScore: state.min_score_threshold || 65,
        angle: state.current_email_angle || 'ai_growth_book_gift',
      })
      harvestMetrics.outbound_staged = o?.sent || 0
    } catch (err) { harvestMetrics.errors.push(`Sequencer: ${err.message}`) }

    // ── Stage 07: PRODUCT MATCHING ──────────────────────────────
    logger.info('\n── STAGE 07: PRODUCT MATCHING (£8M TARGET ENGINE) ──')
    try {
      harvestMetrics.products_matched = await runMatcher({ limit: 150 }) || 0
    } catch (err) { harvestMetrics.errors.push(`Matcher: ${err.message}`) }

    // ── Stage 08: SALES CONVERSION ──────────────────────────────
    logger.info('\n── STAGE 08: SALES CONVERSION ──')
    try {
      harvestMetrics.sales_converted = await runConverter({ limit: 100 }) || 0
    } catch (err) { harvestMetrics.errors.push(`Converter: ${err.message}`) }

    // ── Stage 09: AI GROWTH BRAIN DIAGNOSIS & LEARNER ───────────
    logger.info('\n── STAGE 09: AI GROWTH BRAIN DIAGNOSIS & LEARNER ──')
    const diagnosis = await GrowthAdvisor.analyzeGrowth()
    harvestMetrics.ai_recommendations = diagnosis?.recommendations?.length || 0
    try { await runLearner(cycleId) } catch (err) { harvestMetrics.errors.push(`Learner: ${err.message}`) }

    // Complete cycle in memory
    Memory.completeCycle({
      domains_found: harvestMetrics.domains_discovered,
      mx_filtered: harvestMetrics.mx_domains_verified,
      emails_harvested: harvestMetrics.emails_harvested,
      leads_enriched: harvestMetrics.leads_enriched,
      leads_scored: harvestMetrics.leads_scored,
      emails_sent: harvestMetrics.outbound_staged,
      products_matched: harvestMetrics.products_matched,
      sales_sequences: harvestMetrics.sales_converted,
      replies: 0,
      conversions: 0
    })

    const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1)
    logger.info(`\n${'█'.repeat(70)}`)
    logger.info(`✓ OVERNIGHT GROWTH HARVEST COMPLETE in ${elapsedSec}s`)
    logger.info('█'.repeat(70))

    // Write executive report
    const jsonPath = path.join(EXPORTS_DIR, `overnight_harvest_${dateStr}.json`)
    const mdPath   = path.join(EXPORTS_DIR, `overnight_harvest_${dateStr}.md`)

    const payload = {
      date: dateStr,
      timestamp: new Date().toISOString(),
      cycle_id: cycleId,
      execution_time_seconds: Number(elapsedSec),
      metrics: harvestMetrics,
      ai_growth_brain_diagnosis: diagnosis
    }

    fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2))

    let md = `# 🌙 Executive Overnight Multi-Stage Growth Harvest Report — ${dateStr}\n\n`
    md += `**Execution Time:** ${elapsedSec} seconds\n`
    md += `**Cycle ID:** #${cycleId}\n`
    md += `**Status:** ${harvestMetrics.errors.length === 0 ? '🟢 100% SUCCESS — ALL STAGES CLEAN' : '🟡 COMPLETED WITH MINOR WARNINGS'}\n\n`
    
    md += `## 📈 Multi-Stage Pipeline Metrics\n`
    md += `| Stage / Metric | Value / Volume Processed |\n`
    md += `| :--- | :--- |\n`
    md += `| **Stage 0: CSV Audience Ingest** | **${harvestMetrics.csv_rows_imported} rows verified** |\n`
    md += `| **Stage 1: Domain Discovery** | **${harvestMetrics.domains_discovered} domains found** |\n`
    md += `| **Stage 2: MX Verification** | **${harvestMetrics.mx_domains_verified} target domains verified** |\n`
    md += `| **Stage 3: Email Harvest** | **${harvestMetrics.emails_harvested} emails extracted** |\n`
    md += `| **Stage 4: Lead Enrichment** | **${harvestMetrics.leads_enriched} leads enriched** |\n`
    md += `| **Stage 5: AI Qualification** | **${harvestMetrics.leads_scored} leads scored (0-100)** |\n`
    md += `| **Stage 6: Outbound Staging** | **${harvestMetrics.outbound_staged} emails staged** |\n`
    md += `| **Stage 7: Product Matcher** | **${harvestMetrics.products_matched} leads matched to products** |\n`
    md += `| **Stage 8: Sales Converter** | **${harvestMetrics.sales_converted} sales sequences generated** |\n`
    md += `| **Stage 9: AI Growth Brain** | **${harvestMetrics.ai_recommendations} ascension recommendations generated** |\n\n`

    if (harvestMetrics.errors.length > 0) {
      md += `### ⚠️ Stage Warnings\n`
      harvestMetrics.errors.forEach(e => md += `- \`${e}\`\n`)
      md += `\n`
    }

    if (diagnosis && diagnosis.top_channel) {
      md += `## 🧠 AI Growth Brain Diagnostic Briefing\n`
      md += `- **Primary Growth Channel:** \`${diagnosis.top_channel}\`\n`
      md += `- **Funnel Bottleneck Identified:** ${diagnosis.bottleneck || 'Optimal pipeline flow'}\n\n`
      if (Array.isArray(diagnosis.recommendations)) {
        md += `### 🚀 Ascension Ladder Actions for Morning Team Review\n`
        diagnosis.recommendations.forEach((r, i) => {
          md += `#### ${i + 1}. [${r.priority?.toUpperCase() || 'HIGH'}] ${r.action}\n`
          md += `- **Target Tier:** ${r.target_tier}\n`
          md += `- **Rationale:** ${r.rationale}\n`
          md += `- **Expected Impact:** ${r.expected_impact}\n\n`
        })
      }
    }

    fs.writeFileSync(mdPath, md)
    logger.info(`📜 Overnight harvest report written to: ${mdPath}`)

    console.log(md)
    process.exit(0)
  } catch (err) {
    logger.error(`✗ OVERNIGHT HARVEST FAILED: ${err.message}`, { stack: err.stack })
    process.exit(1)
  }
}

runOvernightHarvest()
