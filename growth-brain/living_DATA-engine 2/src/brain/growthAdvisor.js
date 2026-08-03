// src/brain/growthAdvisor.js — AI Growth Brain & Ascension Ladder Mapping (Root #11 / H1)
import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { DB } from '../lib/db.js'
import { logger } from '../lib/logger.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_offline_key' })

// KYA Method Step 1: Read the promise before the code
const rulesPath = path.join(__dirname, '../../THE-RULES.md')
const jobPath = path.join(__dirname, '../engine/step-2-check/THE-JOB.md')
const theRules = fs.existsSync(rulesPath) ? fs.readFileSync(rulesPath, 'utf-8') : ''
const theJob = fs.existsSync(jobPath) ? fs.readFileSync(jobPath, 'utf-8') : ''

const GROWTH_SYSTEM_PROMPT = `You are the AI Growth Brain for Rume Dominic (Methodical Titan Builder).
Your role is to analyze multi-channel traffic data (Substack, Social Media, Direct, Messaging) and diagnose engagement bottlenecks and opportunities for technical thought leadership.

---
THE RULES OF THIS SYSTEM (KYA Method):
${theRules}
---
YOUR SPECIFIC JOB FOR THIS STAGE:
${theJob}
---

You must ground every recommendation in the real numbers provided from SQLite. Never invent metrics.

You must align recommendations to Rume Dominic's Builder Engagement Framework (NEVER use consultancy sales pitches, pricing tiers, or book-a-call CTAs):
- Tier 1: Open Source Repositories — Drive traffic to GitHub to showcase raw code and architecture.
- Tier 2: Deep Dive Documentation — Encourage reading technical docs and system architectures.
- Tier 3: Substack Technical Essays — Convert passing traffic into technical subscribers.
- Tier 4: High-Level Role Inquiries — Engage with hiring managers or elite engineering teams.

When writing or suggesting copy in your actionable recommendations, you MUST apply the Methodical Titan Builder brand voice:
1. The Short Punchy Hook: Start with a 1-3 word hook followed by a period.
2. The Assembly: Break problems down methodically (like Rockefeller or Carnegie).
3. The Ask: "Check out the repo here" or "Read the docs". NEVER "Book a call".
4. Zero Fluff: Keep paragraphs to 1-2 lines max. No hype words ("7x faster", "elite").

Return ONLY valid JSON matching this schema:
{
  "top_channel": "string (name of highest performing channel)",
  "bottleneck": "string (clear diagnosis of where engagement is lagging)",
  "summary": "string (2-3 sentence executive overview of current growth state)",
  "recommendations": [
    {
      "id": "REC-1",
      "priority": "HIGH|MEDIUM|LOW",
      "channel": "Substack|Social|Direct|Messaging|Email|Overall",
      "action": "string (specific actionable step formatted with the Builder voice)",
      "rationale": "string (why this matters based on the data)",
      "expected_impact": "string (projected outcome)",
      "target_tier": "Tier 1 (GitHub)|Tier 2 (Docs)|Tier 3 (Substack)|Tier 4 (Hiring Inquiries)"
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
    
    let bottleneck = `Total visitors across all channels is ${totalVisitors}, but technical subscriber conversion rate is ${convRate}% (${totalSubs} subscribers). Top-of-funnel traffic is not effectively ascending into long-term technical readership.`
    if (totalSubs > 0 && totalRev === 0) {
      bottleneck = `Strong readership capture (${totalSubs} subscribers at ${convRate}%), but deep technical engagement (GitHub/Docs) needs to be measured and prioritized.`
    }

    const recommendations = [
      {
        id: 'REC-01',
        priority: 'HIGH',
        channel: 'Substack',
        action: 'Pin a deep-dive system architecture post on the Substack publication footer.',
        rationale: `Substack represents a major traffic stream (${topCatVisitors} visitors in top category) that needs seamless transition to long-form technical reading.`,
        expected_impact: 'Increase technical subscriber opt-in conversion rate by 15-25%.',
        target_tier: 'Tier 3 (Substack)'
      },
      {
        id: 'REC-02',
        priority: 'HIGH',
        channel: 'Overall',
        action: 'Configure automated email sequence showcasing specific GitHub repositories to new technical subscribers.',
        rationale: `With ${totalVisitors} total visitors recorded, automated nurture is required to guide readers to actual codebase implementations.`,
        expected_impact: 'Drive a 10% increase in GitHub repository views and stars.',
        target_tier: 'Tier 1 (GitHub)'
      },
      {
        id: 'REC-03',
        priority: 'MEDIUM',
        channel: 'Social',
        action: 'Share raw build-logs and technical challenges faced during recent AI agent deployments.',
        rationale: 'Social media visitors require authentic, show-your-work content rather than generic marketing fluff to build trust.',
        expected_impact: 'Boost technical discussion engagement by 40% in post comments.',
        target_tier: 'Tier 2 (Docs)'
      },
      {
        id: 'REC-04',
        priority: 'MEDIUM',
        channel: 'Direct',
        action: 'Add a clear "Read My Systems Architecture" CTA on the main portfolio root page pointing to verifiable project docs.',
        rationale: 'Direct traffic often includes high-intent hiring managers and engineering directors looking for bespoke AI architecture proof.',
        expected_impact: 'Secure 1-2 high-level technical interviews or direct engineering role inquiries per month.',
        target_tier: 'Tier 4 (Hiring Inquiries)'
      }
    ]

    return {
      top_channel: topCat,
      bottleneck,
      summary: `Living Engine analyzed ${totalVisitors} visitors across ${byCategory.length || 1} core channels. Conversion rate is currently ${convRate}%. Priority focus is optimizing technical engagement on ${topCat} and showcasing raw codebase builds.`,
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
