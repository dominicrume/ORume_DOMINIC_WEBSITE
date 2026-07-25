// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE 2.0 — MORNING AUDIENCE INGESTION & BRIEFING
// Automated morning cron task for Substack & CSV analytics
// Enforces ROOTS.md Root #3, #6, #11
// ═══════════════════════════════════════════════════════════════

import '../src/lib/polyfills.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { DB } from '../src/lib/db.js'
import { logger } from '../src/lib/logger.js'
import { SourceImporter } from '../src/growth/sourceImporter.js'
import { GrowthAdvisor } from '../src/brain/growthAdvisor.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR  = path.join(__dirname, '../data')
const EXPORTS_DIR = path.join(__dirname, '../exports')

async function runMorningIngestion() {
  const startTime = Date.now()
  logger.info(`\n${'═'.repeat(70)}`)
  logger.info(`🌅 LIVING ENGINE — MORNING SUBSTACK & AUDIENCE INGESTION STARTING`)
  logger.info(`   Time: ${new Date().toISOString()}`)
  logger.info('═'.repeat(70))

  try {
    // 1. Scan for CSV exports in data/ directory
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.csv'))
    logger.info(`Found ${files.length} CSV file(s) in data directory:`, files)

    let totalImported = 0
    let totalVisitors = 0
    let totalSubscribers = 0
    let totalRevenue = 0

    // 2. Ingest all CSV exports idempotently
    for (const file of files) {
      const filePath = path.join(DATA_DIR, file)
      logger.info(`Ingesting ${file}...`)
      try {
        const stats = await SourceImporter.importFromCSV(filePath)
        totalImported += stats.imported || 0
        totalVisitors += stats.visitors || 0
        totalSubscribers += stats.subscribers || 0
        totalRevenue += stats.revenue || 0
      } catch (err) {
        logger.warn(`Failed to import ${file}: ${err.message}`)
      }
    }

    logger.info(`✓ Ingestion complete across all CSVs:`, { totalImported, totalVisitors, totalSubscribers, totalRevenue })

    // 3. Trigger AI Growth Brain Diagnosis
    logger.info(`🧠 Awakening AI Growth Advisor for morning diagnosis...`)
    const diagnosis = await GrowthAdvisor.analyzeGrowth()

    // 4. Generate Daily Morning Briefing Report
    const dateStr = new Date().toISOString().split('T')[0]
    const reportPath = path.join(EXPORTS_DIR, `morning_briefing_${dateStr}.json`)
    const mdPath     = path.join(EXPORTS_DIR, `morning_briefing_${dateStr}.md`)

    const briefingPayload = {
      date: dateStr,
      timestamp: new Date().toISOString(),
      ingestion_summary: {
        files_processed: files.length,
        rows_imported: totalImported,
        total_visitors: totalVisitors,
        total_subscribers: totalSubscribers,
        total_revenue: totalRevenue,
        conversion_rate_pct: totalVisitors > 0 ? ((totalSubscribers * 100) / totalVisitors).toFixed(2) : '0.00',
        rpv: totalVisitors > 0 ? (totalRevenue / totalVisitors).toFixed(2) : '0.00'
      },
      ai_growth_brain_diagnosis: diagnosis,
      execution_time_ms: Date.now() - startTime
    }

    fs.writeFileSync(reportPath, JSON.stringify(briefingPayload, null, 2))

    // Create readable Markdown briefing
    let mdContent = `# 🌅 Morning Audience & Substack Briefing — ${dateStr}\n\n`
    mdContent += `**Generated:** ${new Date().toUTCString()}\n`
    mdContent += `**Execution Time:** ${((Date.now() - startTime) / 1000).toFixed(2)}s\n\n`
    mdContent += `## 📊 Ingestion KPI Summary\n`
    mdContent += `- **Files Processed:** ${files.length} (${files.join(', ')})\n`
    mdContent += `- **Rows Imported / Idempotently Verified:** ${totalImported}\n`
    mdContent += `- **Total Visitors:** ${totalVisitors.toLocaleString()}\n`
    mdContent += `- **Total Subscribers:** ${totalSubscribers.toLocaleString()} (${briefingPayload.ingestion_summary.conversion_rate_pct}% conversion)\n`
    mdContent += `- **Total Revenue:** £${totalRevenue.toLocaleString()} (RPV: £${briefingPayload.ingestion_summary.rpv})\n\n`
    
    mdContent += `## 🧠 AI Growth Brain Diagnosis\n`
    if (diagnosis && diagnosis.top_channel) {
      mdContent += `- **Primary Growth Channel:** \`${diagnosis.top_channel}\`\n`
      mdContent += `- **Funnel Bottleneck Identified:** ${diagnosis.bottleneck || 'None — healthy conversion flow'}\n\n`
      mdContent += `### 🎯 Prioritized Ascension Ladder Recommendations\n`
      if (Array.isArray(diagnosis.recommendations)) {
        diagnosis.recommendations.forEach((rec, idx) => {
          mdContent += `#### ${idx + 1}. [${rec.priority?.toUpperCase() || 'HIGH'}] ${rec.action}\n`
          mdContent += `- **Target Tier:** ${rec.target_tier || 'Tier 1 Book / Tier 2 Course'}\n`
          mdContent += `- **Channel:** ${rec.channel || diagnosis.top_channel}\n`
          mdContent += `- **Rationale:** ${rec.rationale}\n`
          mdContent += `- **Expected Impact:** ${rec.expected_impact}\n\n`
        })
      }
    } else {
      mdContent += `*Diagnosis data available in JSON report: \`${reportPath}\`*\n\n`
    }

    fs.writeFileSync(mdPath, mdContent)
    logger.info(`📜 Morning briefing written to: ${mdPath}`)
    logger.info(`\n${'═'.repeat(70)}`)
    logger.info(`✓ MORNING AUDIENCE INGESTION & BRIEFING COMPLETE`)
    logger.info('═'.repeat(70))

    console.log(mdContent)
    process.exit(0)
  } catch (err) {
    logger.error(`✗ MORNING INGESTION FAILED: ${err.message}`, { stack: err.stack })
    process.exit(1)
  }
}

runMorningIngestion()
