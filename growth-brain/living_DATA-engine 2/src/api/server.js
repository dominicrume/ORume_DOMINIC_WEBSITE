// LIVING ENGINE — REST API Server
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { DB } from '../lib/db.js'
import { Memory } from '../lib/memory.js'
import { logger } from '../lib/logger.js'
import { SourceImporter } from '../growth/sourceImporter.js'
import { GrowthAdvisor } from '../brain/growthAdvisor.js'
import { runLearningCycle } from '../brain/socialLearning.js'
import { lifecycleRouter } from './lifecycleRoutes.js'
import crypto from 'crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app  = express()
const PORT = process.env.PORT || 3001
app.use(cors())
app.use(express.json())

// Mount routes
app.use('/api/lifecycle', lifecycleRouter)

// Enterprise Liveness and Readiness Probes
app.get('/api/health', (_, res) => {
  try {
    const dbStatus = DB.domains.count.get() !== undefined ? 'ok' : 'error'
    res.json({ status: 'ok', db: dbStatus, timestamp: new Date().toISOString() })
  } catch (err) {
    res.status(503).json({ status: 'error', error: err.message })
  }
})

app.get('/api/ready', (_, res) => {
  res.json({ ready: true, uptime: process.uptime() })
})

// Dashboard stats
app.get('/api/stats', (_, res) => {
  try {
    res.json({
      leads:     DB.leads.stats.get(),
      domains:   DB.domains.count.get(),
      books:     DB.bookLeads.stats.get(),
      outreach:  DB.outreach.stats.get(),
      cycles:    DB.cycles.recent.all(),
      niches:    DB.leads.nicheBreakdown.all(),
      providers: DB.leads.providerBreakdown.all(),
    })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Agent memory / brain state
app.get('/api/memory', (_, res) => {
  try { res.json(Memory.getFullSnapshot()) }
  catch (err) { res.status(500).json({ error: err.message }) }
})

// Learning log
app.get('/api/learnings', (_, res) => {
  try { res.json({ learnings: Memory.getRecentLearnings(20), decisions: DB.decisions.recent.all() }) }
  catch (err) { res.status(500).json({ error: err.message }) }
})

// Leads
app.get('/api/leads', (req, res) => {
  try {
    const { status, provider } = req.query
    const leads = provider ? DB.leads.byProvider.all(provider) : status ? DB.leads.byStatus.all(status) : DB.leads.all.all()
    res.json(leads)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Outreach
app.get('/api/outreach', (_, res) => {
  try { res.json(DB.outreach.recent.all()) }
  catch (err) { res.status(500).json({ error: err.message }) }
})

// Book leads
app.get('/api/book-leads', (_, res) => {
  try { res.json(DB.bookLeads.all.all()) }
  catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/book-leads', (req, res) => {
  try {
    const { email, firstName, bookId, source } = req.body
    DB.bookLeads.insert.run({ email, first_name: firstName, source, book_id: bookId })
    res.json({ ok: true })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// Audit log
app.get('/api/audit', (_, res) => {
  try { res.json(DB.audit.recent.all()) }
  catch (err) { res.status(500).json({ error: err.message }) }
})

// ── Sales engine endpoints ────────────────────────────────────
app.get('/api/sales/matches', (_, res) => {
  try { res.json(DB.salesMatch.all.all()) }
  catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/sales/stats', (_, res) => {
  try {
    res.json({
      matches:  DB.salesMatch.stats.get(),
      revenue:  DB.revenue.total.get(),
      byProduct: DB.revenue.byProduct.all(),
      byRung:   DB.revenue.byRung.all(),
      mrr:      DB.revenue.monthlyRecurring.get(),
    })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/sales/sequences', (_, res) => {
  try { res.json(DB.salesSequence.recent.all()) }
  catch (err) { res.status(500).json({ error: err.message }) }
})

// Record a sale (called when a lead converts)
app.post('/api/sales/record', (req, res) => {
  try {
    const { leadId, productId, productName, amount, recurring, rung } = req.body
    DB.revenue.record.run({ lead_id: leadId, product_id: productId, product_name: productName, amount, recurring, rung })
    DB.audit.log.run('lead', leadId, 'sale_recorded', `${productName} £${amount}`)
    res.json({ ok: true })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// H8: Unsubscribe
app.get('/unsubscribe/:email', (req, res) => {
  try {
    DB.bookLeads.unsub.run(req.params.email)
    DB.audit.log.run('book_lead', 0, 'unsubscribed', req.params.email)
    res.send('<h2 style="font-family:sans-serif;text-align:center;padding:40px">You have been unsubscribed. Thank you.</h2>')
  } catch (err) { res.status(500).send('Error') }
})

// ── Growth Engine & Substack Analytics routes ─────────────────
app.get('/api/growth/sources', (_, res) => {
  try { res.json(DB.growth.all.all()) }
  catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/growth/stats', (_, res) => {
  try {
    res.json({
      stats: DB.growth.stats.get(),
      byCategory: DB.growth.byCategory.all(),
      bySource: DB.growth.bySource.all(),
      timeline: DB.growth.timeline.all()
    })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/growth/insights', async (_, res) => {
  try {
    let row = DB.insights.latest.get()
    if (!row) {
      await GrowthAdvisor.analyzeGrowth()
      row = DB.insights.latest.get()
    }
    if (row && row.recommendations_json) {
      row.recommendations = JSON.parse(row.recommendations_json)
      row.metrics_summary = JSON.parse(row.metrics_summary_json || '{}')
    }
    res.json(row || { bottleneck: 'No insights generated yet.', recommendations: [] })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/growth/import', async (req, res) => {
  try {
    const importStats = await SourceImporter.importFromCSV()
    const diagnosis = await GrowthAdvisor.analyzeGrowth()
    res.json({ ok: true, importStats, diagnosis })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── Social ML Feedback Loop Endpoints ─────────────────────────────

// POST /api/social/metrics — Called by Make.com every 24h with platform analytics
// Make.com sends: { platform, post_copy, post_hash, impressions, engagements, link_clicks, likes, shares, comments }
app.post('/api/social/metrics', (req, res) => {
  try {
    const { platform, post_copy, post_hash, impressions = 0, engagements = 0, link_clicks = 0, likes = 0, shares = 0, comments = 0 } = req.body
    if (!platform) return res.status(400).json({ error: 'platform is required' })

    DB.socialAnalytics.insert.run({
      post_hash: post_hash || null,
      platform,
      post_copy: post_copy || null,
      impressions,
      engagements,
      link_clicks,
      likes,
      shares,
      comments
    })

    logger.info(`[SOCIAL-ANALYTICS] Metrics ingested for platform: ${platform}`, { link_clicks, engagements })
    res.json({ ok: true, message: `Analytics recorded for ${platform}` })
  } catch (err) {
    logger.error('[SOCIAL-ANALYTICS] Failed to ingest metrics', { error: err.message })
    res.status(500).json({ error: err.message })
  }
})

// GET /api/social/analytics — Dashboard: view all ingested analytics
app.get('/api/social/analytics', (_, res) => {
  try {
    res.json({
      stats: DB.socialAnalytics.stats.all(),
      recent: DB.socialAnalytics.recent.all(),
      topPerformers: DB.socialAnalytics.topPerformers.all(),
      worstPerformers: DB.socialAnalytics.worstPerformers.all()
    })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// GET /api/social/learnings — Dashboard: view all learning cycles
app.get('/api/social/learnings', (_, res) => {
  try {
    res.json({
      history: DB.socialLearnings.history.all(),
      latest: DB.socialLearnings.latest.get()
    })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// POST /api/social/learn — Manually trigger a learning cycle
app.post('/api/social/learn', async (_, res) => {
  try {
    logger.info('[SOCIAL-LEARNING] Manual learning cycle triggered via API...')
    const result = await runLearningCycle()
    res.json({ ok: true, result })
  } catch (err) {
    logger.error('[SOCIAL-LEARNING] Manual learning cycle failed', { error: err.message })
    res.status(500).json({ error: err.message })
  }
})

// ── Human-In-The-Loop (HITL) Queue routes ─────────────────────
app.get('/api/queue', (_, res) => {
  try {
    const queue = DB.hitl.pending.all()
    res.json(queue)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// KYA Audits - Cryptographic Seals
app.get('/api/proofs', (_, res) => {
  try {
    const proofs = DB.proofs.all.all() || []
    res.json(proofs)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/queue/:id/approve', async (req, res) => {
  try {
    const { id } = req.params
    const { payload_json } = req.body
    
    // 1. Update status in DB
    DB.hitl.approve.run({ id, payload_json })
    
    const record = DB.hitl.byId.get({ id })
    
    // KYA Step 4: Prove (Cryptographic Sealing)
    const latestProof = DB.proofs.latest.get()
    const prevHash = latestProof ? latestProof.payload_hash : 'GENESIS_BLOCK'
    const dataToHash = JSON.stringify({
      hitl_id: id,
      action_type: record.action_type,
      payload: payload_json,
      prev_hash: prevHash,
      timestamp: new Date().toISOString()
    })
    const payloadHash = crypto.createHash('sha256').update(dataToHash).digest('hex')
    
    DB.proofs.insert.run({
      hitl_id: id,
      action_type: record.action_type,
      payload_hash: payloadHash,
      prev_hash: prevHash
    })
    
    logger.info(`KYA Step 4: Action ${id} sealed mathematically. Hash: ${payloadHash.substring(0, 8)}...`)
    
    // 2. Execute the action based on type
    if (record.action_type === 'social_post') {
      const payloadObj = JSON.parse(payload_json)
      logger.info(`HITL: Firing approved social post to Make.com`, { id })
      
      const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL
      if (MAKE_WEBHOOK_URL) {
        await fetch(MAKE_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: "Warm Engine Omni-Channel Blast (HITL Approved)",
            twitter_copy: payloadObj.twitter_copy,
            linkedin_personal_copy: payloadObj.linkedin_personal_copy,
            linkedin_company_copy: payloadObj.linkedin_company_copy,
            youtube_copy: payloadObj.youtube_copy,
            gmb_copy: payloadObj.gmb_copy,
            text: payloadObj.linkedin_personal_copy || payloadObj.twitter_copy || "Warm Engine Omni-Channel Update",
            image_url: "https://rumedominic.com/kya-logo.png",
            timestamp: new Date().toISOString()
          })
        })
      }
    }
    
    res.json({ ok: true })
  } catch (err) {
    logger.error(`HITL Approve Error: ${err.message}`)
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/queue/:id/decline', (req, res) => {
  try {
    const { id } = req.params
    const { feedback } = req.body
    DB.hitl.decline.run({ id, feedback })
    logger.info(`HITL: Declined action ${id} with feedback: ${feedback}`)
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// Trigger single-stage run
app.post('/api/agent/run', async (req, res) => {
  const { stage } = req.body
  if (!stage) return res.status(400).json({ error: 'stage required' })
  res.json({ ok: true, message: `Triggered stage: ${stage}` })
  const { default: { runCycle } } = await import('../agent/agent.js').catch(() => ({}))
  logger.info(`API: stage ${stage} triggered`)
})

// Production static UI serving
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../dist/dashboard')
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'))
    }
  })
}

app.listen(PORT, () => logger.info(`API: http://localhost:${PORT}`))
