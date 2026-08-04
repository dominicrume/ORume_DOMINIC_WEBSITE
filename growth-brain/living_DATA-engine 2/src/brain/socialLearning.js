// ═══════════════════════════════════════════════════════════════
// SOCIAL LEARNING BRAIN — Autonomous ML Feedback Loop
// Pulls post analytics, critiques own output, rewrites memory rules
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { DB } from '../lib/db.js'
import { logger } from '../lib/logger.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MEMORY_PATH = path.join(__dirname, '../../memory/x-learning.json')

// ── Defaults if no memory file exists yet ────────────────────────
const DEFAULT_MEMORY = {
  version: 1,
  lastUpdated: null,
  currentStrategy: 'Focus on high-signal tech truths. Use 1-3 word hooks. Maximum 15 words per sentence.',
  hardRules: [
    'MAXIMUM 15 words per sentence. No exceptions.',
    'Start every post with a 1-3 word hook followed by a period.',
    'Use 3rd-grade level English only.',
    'Every paragraph must be 1-2 lines max.',
    'End every post with the Hormozi HVCO offer.',
    'Never use words like: groundbreaking, revolutionary, innovative, elite.',
    'Never use em-dashes.',
    'Never ask engagement bait questions.'
  ],
  bannedPatterns: [],
  winningPatterns: [],
  lessonsLearned: []
}

function loadMemory() {
  if (fs.existsSync(MEMORY_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf-8'))
    } catch {
      logger.warn('[SOCIAL-LEARNING] Could not parse x-learning.json, using defaults.')
    }
  }
  return { ...DEFAULT_MEMORY }
}

function saveMemory(memory) {
  const dir = path.dirname(MEMORY_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  memory.lastUpdated = new Date().toISOString()
  fs.writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2))
  logger.info('[SOCIAL-LEARNING] Memory updated and saved to x-learning.json')
}

async function runLearningCycle() {
  logger.info('[SOCIAL-LEARNING] Starting ML feedback learning cycle...')

  const topPerformers = DB.socialAnalytics.topPerformers.all()
  const worstPerformers = DB.socialAnalytics.worstPerformers.all()
  const analytics = DB.socialAnalytics.stats.all()

  // If no data yet, nothing to learn from — initialize memory only
  if (!analytics || analytics.length === 0) {
    logger.info('[SOCIAL-LEARNING] No analytics data yet. Initialising default memory rules.')
    const memory = loadMemory()
    if (!fs.existsSync(MEMORY_PATH)) saveMemory(memory)
    return { status: 'no_data', message: 'No analytics yet. Default memory rules in place.' }
  }

  const openaiKey = process.env.OPENAI_API_KEY
  if (!openaiKey) {
    logger.warn('[SOCIAL-LEARNING] No OPENAI_API_KEY. Skipping AI critique cycle.')
    return { status: 'skipped', message: 'No API key.' }
  }

  // ── LLM Self-Critique ─────────────────────────────────────────
  const prompt = `You are a ruthless conversion-rate copywriting expert. You review social media post data and provide strict formatting improvement rules.

Here are the WORST performing posts (lowest clicks and engagement):
${JSON.stringify(worstPerformers, null, 2)}

Here are the BEST performing posts (highest clicks and engagement):
${JSON.stringify(topPerformers, null, 2)}

Here is the platform-level analytics summary:
${JSON.stringify(analytics, null, 2)}

Your job:
1. Identify exactly what STRUCTURAL or WORDING patterns caused the worst posts to fail (e.g., sentences too long, hooks not punchy, CTA missing, too much jargon).
2. Identify exactly what patterns made the best posts succeed.
3. Produce a JSON object with EXACTLY these keys:

{
  "diagnosis": "string (2-3 sentence summary of the core problem)",
  "banned_patterns": ["string array of specific patterns/phrases/structures to NEVER use again"],
  "winning_patterns": ["string array of specific patterns/structures to replicate"],
  "new_rules": ["string array of max 5 strict, precise, measurable formatting rules"],
  "strategy_update": "string (one sentence updating the core content strategy)"
}

Return ONLY valid JSON. No explanation outside the JSON.`

  try {
    const { default: OpenAI } = await import('openai')
    const openai = new OpenAI({ apiKey: openaiKey })

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are a ruthless conversion copywriting expert. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ]
    })

    const critique = JSON.parse(response.choices[0].message.content)
    logger.info('[SOCIAL-LEARNING] AI critique completed.', { diagnosis: critique.diagnosis })

    // ── Update the live memory file ───────────────────────────────
    const memory = loadMemory()

    // Add new learned rules (avoid duplicates)
    if (critique.new_rules) {
      critique.new_rules.forEach(rule => {
        if (!memory.hardRules.includes(rule)) memory.hardRules.push(rule)
      })
    }

    // Track banned patterns
    if (critique.banned_patterns) {
      memory.bannedPatterns = [...new Set([...memory.bannedPatterns, ...critique.banned_patterns])]
    }

    // Track winning patterns
    if (critique.winning_patterns) {
      memory.winningPatterns = [...new Set([...memory.winningPatterns, ...critique.winning_patterns])]
    }

    // Update core strategy
    if (critique.strategy_update) {
      memory.currentStrategy = critique.strategy_update
    }

    // Add lesson to history log (keep last 20)
    memory.lessonsLearned = [
      { date: new Date().toISOString(), lesson: critique.diagnosis },
      ...(memory.lessonsLearned || []).slice(0, 19)
    ]

    saveMemory(memory)

    // ── Persist to SQLite for dashboard visibility ────────────────
    DB.socialLearnings.insert.run({
      top_performer: JSON.stringify(topPerformers[0] || {}),
      worst_performer: JSON.stringify(worstPerformers[0] || {}),
      rules_updated: JSON.stringify(critique.new_rules || []),
      ai_diagnosis: critique.diagnosis || ''
    })

    logger.info('[SOCIAL-LEARNING] Learning cycle complete. Memory and DB updated.')
    return { status: 'updated', critique }

  } catch (err) {
    logger.error('[SOCIAL-LEARNING] AI critique failed.', { error: err.message })
    return { status: 'error', error: err.message }
  }
}

export { runLearningCycle, loadMemory }

// Allow CLI execution
if (process.argv[1] && process.argv[1].endsWith('socialLearning.js')) {
  runLearningCycle()
    .then(res => {
      console.log('✅ Social Learning Cycle Complete:')
      console.log(JSON.stringify(res, null, 2))
      process.exit(0)
    })
    .catch(err => {
      console.error('❌ Social Learning Cycle Failed:', err)
      process.exit(1)
    })
}
