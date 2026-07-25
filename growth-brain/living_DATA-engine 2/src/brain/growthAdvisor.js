// src/brain/growthAdvisor.js — AI Growth Brain & Ascension Ladder Mapping (Root #11 / H1)
import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import { DB } from '../lib/db.js'
import { logger } from '../lib/logger.js'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_offline_key' })

const GROWTH_SYSTEM_PROMPT = `You are the AI Growth Brain for Rume Dominic and Vorem Nigeria.
Your role is to analyze multi-channel traffic data (Substack, Social Media, Direct, Messaging) and diagnose growth bottlenecks and conversion opportunities.

You must ground every recommendation in the real numbers provided from SQLite. Never invent metrics.

You must align recommendations to Rume Dominic's 4-Tier Ascension Ladder:
- Tier 1: £19.99 Book ("From Code to Consciousness") — Top of funnel tripwire & opt-in gift.
- Tier 2: £97 Course ("Master AI in 9 Days" / Vorem AI) — Core educational offer.
- Tier 3: £1,500/mo AI Marketing & Growth Brain Service — Recurring retainer for businesses.
- Tier 4: £5,000 Consulting / Custom AI Systems — High-ticket enterprise architecture.

Return ONLY valid JSON matching this schema:
{
  "top_channel": "string (name of highest performing channel)",
  "bottleneck": "string (clear diagnosis of where conversion or revenue is lagging)",
  "summary": "string (2-3 sentence executive overview of current growth state)",
  "recommendations": [
    {
      "id": "REC-1",
      "priority": "HIGH|MEDIUM|LOW",
      "channel": "Substack|Social|Direct|Messaging|Email|Overall",
      "action": "string (specific actionable step)",
      "rationale": "string (why this matters based on the data)",
      "expected_impact": "string (projected outcome)",
      "target_tier": "Tier 1 (£19.99 Book)|Tier 2 (£97 Course)|Tier 3 (£1,500/mo Service)|Tier 4 (£5,000 Consulting)"
    }
  ]
}`

export class GrowthAdvisor {
  static generateOfflineHeuristics(stats, byCategory, bySource) {
    const totalVisitors = stats?.visitors || 0
    const totalSubs = stats?.subscribers || 0
    const totalRev = stats?.revenue || 0
    const convRate = totalVisitors > 0 ? ((totalSubs / totalVisitors) * 100).toFixed(1) : '0.0'

    const topCat = byCategory?.[0]?.category || 'Substack'
    const topCatVisitors = byCategory?.[0]?.total_visitors || 0
    
    let bottleneck = `Total visitors across all channels is ${totalVisitors}, but overall opt-in conversion rate is ${convRate}% (${totalSubs} subscribers). Top-of-funnel traffic is not effectively ascending into lead capture.`
    if (totalSubs > 0 && totalRev === 0) {
      bottleneck = `Strong lead capture (${totalSubs} subscribers at ${convRate}%), but monetization is lagging at £0 revenue. Need immediate activation of Tier 1 (£19.99 Book) and Tier 2 (£97 Course) tripwire offers.`
    }

    const recommendations = [
      {
        id: 'REC-01',
        priority: 'HIGH',
        channel: 'Substack',
        action: 'Implement instant PDF book opt-in hook on Substack publication footer and welcome email.',
        rationale: `Substack represents a major traffic stream (${topCatVisitors} visitors in top category) that needs seamless transition to Vorem CRM.`,
        expected_impact: 'Increase Substack-to-email opt-in conversion rate by 15-25%.',
        target_tier: 'Tier 1 (£19.99 Book)'
      },
      {
        id: 'REC-02',
        priority: 'HIGH',
        channel: 'Overall',
        action: 'Configure automated Brevo email sequence for all new free book/course claimants.',
        rationale: `With ${totalVisitors} total visitors recorded, automated nurture is required to ascend leads from free access to paid courses without manual intervention.`,
        expected_impact: 'Convert 5-8% of free book recipients into £97 course buyers within 9 days.',
        target_tier: 'Tier 2 (£97 Course)'
      },
      {
        id: 'REC-03',
        priority: 'MEDIUM',
        channel: 'Social',
        action: 'Deploy interactive AI demo widgets (e.g., Vaida AI demo) on landing pages linked in Social bios.',
        rationale: 'Social media visitors require immediate interactive value to bridge from passive scrolling to active consciousness.',
        expected_impact: 'Boost dwell time by 40% and generate qualified business leads.',
        target_tier: 'Tier 3 (£1,500/mo Service)'
      },
      {
        id: 'REC-04',
        priority: 'MEDIUM',
        channel: 'Direct',
        action: 'Add VIP executive consultation booking CTA on the main Rume Dominic portfolio root page.',
        rationale: 'Direct traffic often includes high-intent founders and enterprise decision makers looking for bespoke AI architecture.',
        expected_impact: 'Secure 1-2 high-ticket consulting inquiries per month (£5k+ LTV).',
        target_tier: 'Tier 4 (£5,000 Consulting)'
      }
    ]

    return {
      top_channel: topCat,
      bottleneck,
      summary: `Living Engine analyzed ${totalVisitors} visitors across ${byCategory.length || 1} core channels. Conversion rate is currently ${convRate}%. Priority focus is optimizing lead capture on ${topCat} and activating automated email ascension sequences.`,
      recommendations
    }
  }

  static async analyzeGrowth() {
    logger.info('[GROWTH-BRAIN] Awakening AI Growth Advisor...')

    const stats = DB.growth.stats.get() || { visitors: 0, subscribers: 0, revenue: 0 }
    const byCategory = DB.growth.byCategory.all() || []
    const bySource = DB.growth.bySource.all() || []
    const timeline = DB.growth.timeline.all() || []

    const metricsSummary = {
      timestamp: new Date().toISOString(),
      stats,
      byCategory,
      topSource: bySource?.[0]?.source || 'None',
      dataPoints: timeline.length
    }

    let diagnosis = null

    // Attempt online AI diagnosis if valid key exists
    if (process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY.includes('dummy') && !process.env.ANTHROPIC_API_KEY.includes('your_')) {
      try {
        const prompt = `Analyze this real growth engine data from SQLite and provide strategic diagnosis and recommendations:
        
Metrics Summary:
${JSON.stringify(metricsSummary, null, 2)}
        
Channel Breakdown:
${JSON.stringify(byCategory, null, 2)}
        
Top 5 Specific Traffic Sources:
${JSON.stringify(bySource.slice(0, 5), null, 2)}`

        const response = await claude.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 1500,
          system: GROWTH_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: prompt }]
        })

        const rawText = response.content[0].text
        const jsonStr = rawText.replace(/```json|```/g, '').trim()
        diagnosis = JSON.parse(jsonStr)
        logger.info('[GROWTH-BRAIN] Online Anthropic AI diagnosis completed successfully.')
      } catch (err) {
        logger.warn('[GROWTH-BRAIN] Online AI call failed or unavailable, switching to intelligent offline heuristics engine.', { error: err.message })
      }
    }

    // Fallback to grounded heuristic engine
    if (!diagnosis) {
      logger.info('[GROWTH-BRAIN] Executing offline data-grounded heuristic analysis...')
      diagnosis = this.generateOfflineHeuristics(stats, byCategory, bySource)
    }

    // Persist insight into SQLite
    try {
      const recsJson = JSON.stringify(diagnosis.recommendations || [])
      const metricsJson = JSON.stringify(metricsSummary)
      
      DB.insights.insert.run({
        top_channel: diagnosis.top_channel || 'Substack',
        bottleneck: diagnosis.bottleneck || 'No bottleneck identified.',
        recommendations_json: recsJson,
        metrics_summary_json: metricsJson
      })

      logger.info('[GROWTH-BRAIN] Growth diagnosis persisted to SQLite living-engine.db', {
        top_channel: diagnosis.top_channel,
        recs_count: diagnosis.recommendations?.length || 0
      })
    } catch (err) {
      logger.error('[GROWTH-BRAIN] Failed to persist growth insight to DB', { error: err.message })
    }

    return diagnosis
  }
}

// Allow CLI execution
if (process.argv[1] && process.argv[1].endsWith('growthAdvisor.js')) {
  GrowthAdvisor.analyzeGrowth()
    .then(res => {
      console.log('✅ Growth Brain Analysis Complete:')
      console.log(JSON.stringify(res, null, 2))
      process.exit(0)
    })
    .catch(err => {
      console.error('❌ Growth Brain Analysis Failed:', err)
      process.exit(1)
    })
}
