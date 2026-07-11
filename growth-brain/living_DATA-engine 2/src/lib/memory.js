// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — Agent Memory System
// The agent's persistent brain. Reads before each cycle.
// Writes after each cycle. Never resets unless you tell it to.
// ═══════════════════════════════════════════════════════════════
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const MEMORY_DIR = process.env.MEMORY_PATH || path.join(__dirname, '../../memory')
fs.mkdirSync(MEMORY_DIR, { recursive: true })

const PATHS = {
  state:    path.join(MEMORY_DIR, 'agent-state.json'),
  niches:   path.join(MEMORY_DIR, 'niche-performance.json'),
  providers:path.join(MEMORY_DIR, 'provider-performance.json'),
  queries:  path.join(MEMORY_DIR, 'query-performance.json'),
  log:      path.join(MEMORY_DIR, 'learning-log.jsonl'),
}

// ── Default initial state ─────────────────────────────────────
const DEFAULT_STATE = {
  cycle_count:       0,
  total_leads:       0,
  total_sent:        0,
  total_replies:     0,
  total_conversions: 0,
  best_niche:        null,
  best_provider:     null,
  min_score_threshold: 65,
  active_niches: [
    'Kitchen & Home','Pet Supplies','Beauty & Health',
    'Sports & Fitness','Baby Products','Garden & Outdoor',
    'Electronics Accessories','Automotive','Toys & Games','Home Office'
  ],
  target_providers: [
    'network_solutions','private_email','titan_email','zoho','godaddy',
    'rackspace','fastmail','ionos','protonmail','siteground',
    'krystal','123reg','hushmail','self_hosted'
  ],
  queries_per_niche: 3,
  max_outreach_per_cycle: 30,
  current_email_angle: 'supply_chain_pain',
  last_updated: null,
  directives: []
}

function readJson(filePath, defaultVal) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch {
    return defaultVal
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
}

// ── Public Memory API ─────────────────────────────────────────

export const Memory = {
  // Read the full agent state
  getState() {
    return readJson(PATHS.state, DEFAULT_STATE)
  },

  // Save updated agent state
  setState(state) {
    writeJson(PATHS.state, { ...state, last_updated: new Date().toISOString() })
  },

  // Apply Claude's directives to the state
  applyDirectives(directives) {
    const state = this.getState()
    if (directives.min_score_threshold) state.min_score_threshold = directives.min_score_threshold
    if (directives.active_niches)       state.active_niches       = directives.active_niches
    if (directives.target_providers)    state.target_providers    = directives.target_providers
    if (directives.queries_per_niche)   state.queries_per_niche   = directives.queries_per_niche
    if (directives.max_outreach)        state.max_outreach_per_cycle = directives.max_outreach
    if (directives.email_angle)         state.current_email_angle = directives.email_angle
    state.directives = [...(state.directives || []).slice(-10), directives]
    this.setState(state)
    return state
  },

  // Record cycle completion
  completeCycle(cycleData) {
    const state = this.getState()
    state.cycle_count       = (state.cycle_count || 0) + 1
    state.total_leads       = (state.total_leads || 0) + (cycleData.leads_scored || 0)
    state.total_sent        = (state.total_sent  || 0) + (cycleData.emails_sent  || 0)
    state.total_replies     = (state.total_replies|| 0) + (cycleData.replies     || 0)
    state.total_conversions = (state.total_conversions||0)+(cycleData.conversions||0)
    this.setState(state)
  },

  // Niche performance history
  getNichePerformance() {
    return readJson(PATHS.niches, {})
  },

  updateNichePerformance(niche, data) {
    const perf = this.getNichePerformance()
    if (!perf[niche]) perf[niche] = { cycles: 0, total_sent: 0, total_replies: 0, avg_score: 0 }
    const n = perf[niche]
    n.cycles++
    n.total_sent    += data.sent    || 0
    n.total_replies += data.replies || 0
    n.reply_rate     = n.total_sent > 0 ? (n.total_replies / n.total_sent) : 0
    n.avg_score      = ((n.avg_score * (n.cycles - 1)) + (data.avg_score || 0)) / n.cycles
    n.last_updated   = new Date().toISOString()
    writeJson(PATHS.niches, perf)
  },

  // Provider performance history
  getProviderPerformance() {
    return readJson(PATHS.providers, {})
  },

  updateProviderPerformance(provider, data) {
    const perf = this.getProviderPerformance()
    if (!perf[provider]) perf[provider] = { cycles: 0, total_sent: 0, total_replies: 0, avg_score: 0 }
    const p = perf[provider]
    p.cycles++
    p.total_sent    += data.sent    || 0
    p.total_replies += data.replies || 0
    p.reply_rate     = p.total_sent > 0 ? (p.total_replies / p.total_sent) : 0
    p.avg_score      = ((p.avg_score * (p.cycles - 1)) + (data.avg_score || 0)) / p.cycles
    p.last_updated   = new Date().toISOString()
    writeJson(PATHS.providers, perf)
  },

  // Append to learning log (never overwrite — append only)
  logLearning(entry) {
    const line = JSON.stringify({ ...entry, ts: new Date().toISOString() }) + '\n'
    fs.appendFileSync(PATHS.log, line, 'utf8')
  },

  // Get last N learning entries
  getRecentLearnings(n = 10) {
    try {
      const lines = fs.readFileSync(PATHS.log, 'utf8').trim().split('\n').filter(Boolean)
      return lines.slice(-n).map(l => JSON.parse(l))
    } catch { return [] }
  },

  // Full memory snapshot for Claude to read
  getFullSnapshot() {
    return {
      state:            this.getState(),
      niche_performance: this.getNichePerformance(),
      provider_performance: this.getProviderPerformance(),
      recent_learnings: this.getRecentLearnings(5),
    }
  },

  // Reset to defaults (use with care)
  reset() {
    writeJson(PATHS.state, DEFAULT_STATE)
    writeJson(PATHS.niches, {})
    writeJson(PATHS.providers, {})
    fs.writeFileSync(PATHS.log, '', 'utf8')
  }
}
