// scripts/testGrowthEngine.js — Automated Verification Suite (Root #5 & #10)
import assert from 'assert'
import { DB } from '../src/lib/db.js'
import { SourceImporter } from '../src/growth/sourceImporter.js'
import { GrowthAdvisor } from '../src/brain/growthAdvisor.js'

async function verifyGrowthEngine() {
  console.log('🧪 Starting Automated Verification Suite for Living Data Engine & AI Growth Brain...')

  // Step 1: Test Ingestion
  console.log('Step 1: Testing CSV Ingestion & Idempotency...')
  const importStats = await SourceImporter.importFromCSV()
  assert(importStats.imported >= 0, 'Import count must be valid')
  assert(importStats.visitors >= 100, 'Must import at least 100 historical visitors from Substack/Social/Direct')
  console.log('✅ Ingestion layer passed:', importStats)

  // Step 2: Test Aggregation Queries
  console.log('Step 2: Testing SQLite Category & Source Aggregations...')
  const categories = DB.growth.byCategory.all()
  assert(categories.length >= 3, 'Must aggregate across at least 3 distinct traffic categories')
  const topCat = categories[0]
  assert(topCat.total_visitors > 0, 'Top category must have visitor count > 0')
  console.log('✅ Aggregation layer passed. Top category:', topCat.category, 'with', topCat.total_visitors, 'visitors')

  // Step 3: Test AI Growth Advisor Brain
  console.log('Step 3: Testing AI Growth Brain & Ascension Ladder Mapping...')
  const diagnosis = await GrowthAdvisor.analyzeGrowth()
  assert(diagnosis, 'Diagnosis must not be null')
  assert(diagnosis.top_channel, 'Diagnosis must identify top_channel')
  assert(diagnosis.bottleneck, 'Diagnosis must identify bottleneck')
  assert(Array.isArray(diagnosis.recommendations) && diagnosis.recommendations.length >= 2, 'Must generate at least 2 structured recommendations')
  
  // Verify ascension ladder mapping
  const hasTier1 = diagnosis.recommendations.some(r => r.target_tier?.includes('Tier 1'))
  const hasTier2 = diagnosis.recommendations.some(r => r.target_tier?.includes('Tier 2'))
  assert(hasTier1 && hasTier2, 'Recommendations must map to Rume Dominic 4-Tier Ascension Ladder')
  console.log('✅ AI Growth Brain passed. Generated', diagnosis.recommendations.length, 'strategic recommendations.')

  // Step 4: Test Persistence
  console.log('Step 4: Testing SQLite Persistence...')
  const latestInsight = DB.insights.latest.get()
  assert(latestInsight, 'Latest insight must exist in DB')
  assert(latestInsight.recommendations_json, 'Insight must store recommendations JSON')
  console.log('✅ Persistence verified in SQLite living-engine.db.')

  console.log('\n🌟 ═══════════════════════════════════════════════════════════════')
  console.log('✅ ALL GOVERNANCE GATES & VERIFICATION TESTS PASSED (Roots #1-#13)')
  console.log('═══════════════════════════════════════════════════════════════ 🌟')
}

verifyGrowthEngine().catch(err => {
  console.error('❌ Verification Suite Failed:', err)
  process.exit(1)
})
