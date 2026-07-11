// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — Database · H1/H3/H7
// New in v3: agent_decisions, cycle_metrics, learning_insights
// ═══════════════════════════════════════════════════════════════
import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH   = process.env.DB_PATH || path.join(__dirname, '../../data/living-engine.db')

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
fs.mkdirSync(path.join(__dirname, '../../logs'), { recursive: true })
fs.mkdirSync(path.join(__dirname, '../../exports'), { recursive: true })
fs.mkdirSync(process.env.MEMORY_PATH || path.join(__dirname, '../../memory'), { recursive: true })

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  -- ── Core tables ─────────────────────────────────────────────

  CREATE TABLE IF NOT EXISTS domains (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    domain        TEXT UNIQUE NOT NULL,
    niche         TEXT,
    source        TEXT,
    robots_ok     INTEGER DEFAULT 0,
    mx_checked    INTEGER DEFAULT 0,
    mx_provider   TEXT,
    mx_tier       TEXT,
    mx_raw        TEXT,
    status        TEXT DEFAULT 'pending',
    discovered_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS leads (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    domain           TEXT NOT NULL,
    niche            TEXT,
    store_name       TEXT,
    email            TEXT,
    email_verified   INTEGER DEFAULT 0,
    email_source     TEXT,
    email_provider   TEXT,
    mx_provider      TEXT,
    first_name       TEXT,
    last_name        TEXT,
    job_title        TEXT,
    linkedin_url     TEXT,
    company_size     TEXT,
    country          TEXT DEFAULT 'GB',
    bsr              INTEGER,
    est_rev_month    INTEGER,
    review_count     INTEGER,
    pain_point       TEXT,
    buy_signal       TEXT,
    email_hook       TEXT,
    score            INTEGER DEFAULT 0,
    score_reason     TEXT,
    status           TEXT DEFAULT 'new',
    enriched_at      DATETIME,
    scored_at        DATETIME,
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS outreach (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id       INTEGER REFERENCES leads(id),
    touch         INTEGER,
    subject       TEXT,
    body          TEXT,
    sent_at       DATETIME,
    opened        INTEGER DEFAULT 0,
    clicked       INTEGER DEFAULT 0,
    replied       INTEGER DEFAULT 0,
    bounced       INTEGER DEFAULT 0,
    unsubscribed  INTEGER DEFAULT 0,
    instantly_id  TEXT
  );

  CREATE TABLE IF NOT EXISTS book_leads (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    email          TEXT UNIQUE NOT NULL,
    first_name     TEXT,
    source         TEXT,
    book_id        TEXT,
    sequence_step  INTEGER DEFAULT 0,
    status         TEXT DEFAULT 'active',
    opted_in_at    DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- ── Agent learning tables ────────────────────────────────────

  -- One row per agent cycle (weekly run)
  CREATE TABLE IF NOT EXISTS agent_cycles (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    cycle_number    INTEGER NOT NULL,
    started_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    finished_at     DATETIME,
    status          TEXT DEFAULT 'running',
    -- What Claude decided before this cycle
    ai_directives   TEXT,    -- JSON: what Claude told agent to do differently
    -- Results of this cycle
    domains_found   INTEGER DEFAULT 0,
    mx_filtered     INTEGER DEFAULT 0,
    emails_harvested INTEGER DEFAULT 0,
    leads_enriched  INTEGER DEFAULT 0,
    leads_scored    INTEGER DEFAULT 0,
    emails_sent     INTEGER DEFAULT 0,
    opens           INTEGER DEFAULT 0,
    replies         INTEGER DEFAULT 0,
    conversions     INTEGER DEFAULT 0,
    -- What Claude learned after this cycle
    ai_learnings    TEXT     -- JSON: what Claude observed and will change next time
  );

  -- Per-niche performance over time
  CREATE TABLE IF NOT EXISTS niche_performance (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    cycle_id     INTEGER REFERENCES agent_cycles(id),
    niche        TEXT,
    leads_found  INTEGER DEFAULT 0,
    emails_sent  INTEGER DEFAULT 0,
    open_rate    REAL DEFAULT 0,
    reply_rate   REAL DEFAULT 0,
    conversion   INTEGER DEFAULT 0,
    avg_score    REAL DEFAULT 0,
    recorded_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Per email-provider performance
  CREATE TABLE IF NOT EXISTS provider_performance (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    cycle_id     INTEGER REFERENCES agent_cycles(id),
    provider     TEXT,
    leads_found  INTEGER DEFAULT 0,
    emails_sent  INTEGER DEFAULT 0,
    open_rate    REAL DEFAULT 0,
    reply_rate   REAL DEFAULT 0,
    avg_score    REAL DEFAULT 0,
    recorded_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Decisions log — what the AI brain decided and why
  CREATE TABLE IF NOT EXISTS agent_decisions (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    cycle_id    INTEGER REFERENCES agent_cycles(id),
    stage       TEXT,
    decision    TEXT,   -- what Claude decided
    reasoning   TEXT,   -- why
    impact      TEXT,   -- measured result (filled in next cycle)
    decided_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Full audit trail (H7)
  CREATE TABLE IF NOT EXISTS audit_log (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    entity     TEXT,
    entity_id  INTEGER,
    action     TEXT,
    detail     TEXT,
    ts         DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Pipeline stage runs
  CREATE TABLE IF NOT EXISTS pipeline_runs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    cycle_id    INTEGER,
    stage       TEXT,
    status      TEXT DEFAULT 'running',
    leads_in    INTEGER DEFAULT 0,
    leads_out   INTEGER DEFAULT 0,
    errors      INTEGER DEFAULT 0,
    started_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    finished_at DATETIME
  );

  -- ── Sales engine tables (Stage 08-09) ───────────────────────

  -- Product match per lead (Stage 08 output)
  CREATE TABLE IF NOT EXISTS sales_matches (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id             INTEGER REFERENCES leads(id),
    entry_product_id    TEXT,
    entry_product_name  TEXT,
    entry_price         REAL,
    entry_reason        TEXT,
    ascension_path      TEXT,   -- JSON array of product ids
    ltv_estimate        REAL,   -- lifetime value if they ascend full path
    primary_hook        TEXT,
    objection           TEXT,
    sequenced           INTEGER DEFAULT 0,
    sold                INTEGER DEFAULT 0,
    sold_product_id     TEXT,
    revenue             REAL DEFAULT 0,
    matched_at          DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Sales email sequences (Stage 09 output)
  CREATE TABLE IF NOT EXISTS sales_sequences (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    match_id    INTEGER REFERENCES sales_matches(id),
    lead_id     INTEGER REFERENCES leads(id),
    touch       INTEGER,
    product_id  TEXT,
    subject     TEXT,
    body        TEXT,
    sent_at     DATETIME,
    opened      INTEGER DEFAULT 0,
    clicked     INTEGER DEFAULT 0,
    purchased   INTEGER DEFAULT 0
  );

  -- Revenue ledger — every sale recorded (the £8M tracker)
  CREATE TABLE IF NOT EXISTS revenue_ledger (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id       INTEGER REFERENCES leads(id),
    product_id    TEXT,
    product_name  TEXT,
    amount        REAL,
    recurring     TEXT,    -- one_time|monthly|annual
    rung          INTEGER,
    sold_at       DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_leads_status   ON leads(status);
  CREATE INDEX IF NOT EXISTS idx_leads_score    ON leads(score DESC);
  CREATE INDEX IF NOT EXISTS idx_leads_niche    ON leads(niche);
  CREATE INDEX IF NOT EXISTS idx_leads_provider ON leads(email_provider);
  CREATE INDEX IF NOT EXISTS idx_domains_mx     ON domains(mx_tier);
  CREATE INDEX IF NOT EXISTS idx_cycles_num     ON agent_cycles(cycle_number DESC);
  CREATE INDEX IF NOT EXISTS idx_match_lead     ON sales_matches(lead_id);
  CREATE INDEX IF NOT EXISTS idx_revenue_sold   ON revenue_ledger(sold_at DESC);
`)

export const DB = {
  domains: {
    upsert:    db.prepare(`INSERT OR IGNORE INTO domains (domain,niche,source) VALUES (@domain,@niche,@source)`),
    pendingMx: db.prepare(`SELECT * FROM domains WHERE mx_checked=0 ORDER BY discovered_at LIMIT ?`),
    pending:   db.prepare(`SELECT * FROM domains WHERE status='pending' AND mx_tier='target' LIMIT ?`),
    setStatus: db.prepare(`UPDATE domains SET status=? WHERE domain=?`),
    setRobots: db.prepare(`UPDATE domains SET robots_ok=1 WHERE domain=?`),
    setMx:     db.prepare(`UPDATE domains SET mx_checked=1,mx_provider=@mx_provider,mx_tier=@mx_tier,mx_raw=@mx_raw WHERE domain=@domain`),
    count:     db.prepare(`SELECT COUNT(*) AS n FROM domains`),
    mxStats:   db.prepare(`SELECT mx_tier, COUNT(*) AS n FROM domains WHERE mx_checked=1 GROUP BY mx_tier`),
  },
  leads: {
    insert:       db.prepare(`INSERT OR IGNORE INTO leads (domain,niche,store_name,email,email_source,email_provider,mx_provider,bsr,est_rev_month,review_count) VALUES (@domain,@niche,@store_name,@email,@email_source,@email_provider,@mx_provider,@bsr,@est_rev_month,@review_count)`),
    updateEnrich: db.prepare(`UPDATE leads SET email_verified=@email_verified,first_name=@first_name,last_name=@last_name,job_title=@job_title,linkedin_url=@linkedin_url,company_size=@company_size,pain_point=@pain_point,buy_signal=@buy_signal,email_hook=@email_hook,enriched_at=CURRENT_TIMESTAMP WHERE id=@id`),
    updateScore:  db.prepare(`UPDATE leads SET score=@score,score_reason=@score_reason,scored_at=CURRENT_TIMESTAMP WHERE id=@id`),
    updateStatus: db.prepare(`UPDATE leads SET status=? WHERE id=?`),
    forEnrich:    db.prepare(`SELECT * FROM leads WHERE enriched_at IS NULL AND email IS NOT NULL LIMIT ?`),
    forScore:     db.prepare(`SELECT * FROM leads WHERE scored_at IS NULL AND email IS NOT NULL LIMIT ?`),
    forOutreach:  db.prepare(`SELECT * FROM leads WHERE status='new' AND score>=? ORDER BY score DESC LIMIT ?`),
    all:          db.prepare(`SELECT * FROM leads ORDER BY score DESC LIMIT 500`),
    byId:         db.prepare(`SELECT * FROM leads WHERE id=?`),
    byProvider:   db.prepare(`SELECT * FROM leads WHERE email_provider=? ORDER BY score DESC LIMIT 100`),
    stats:        db.prepare(`
      SELECT COUNT(*) AS total,
        SUM(CASE WHEN email IS NOT NULL THEN 1 END) AS with_email,
        SUM(CASE WHEN email_verified=1 THEN 1 END) AS verified,
        SUM(CASE WHEN score>=80 THEN 1 END) AS hot,
        SUM(CASE WHEN score>=65 AND score<80 THEN 1 END) AS warm,
        SUM(CASE WHEN status='sent' THEN 1 END) AS sent,
        SUM(CASE WHEN status='replied' THEN 1 END) AS replied,
        SUM(CASE WHEN status='converted' THEN 1 END) AS converted,
        ROUND(AVG(CASE WHEN score>0 THEN score END),1) AS avg_score
      FROM leads
    `),
    providerBreakdown: db.prepare(`SELECT email_provider, COUNT(*) AS n, ROUND(AVG(score),1) AS avg FROM leads WHERE email_provider IS NOT NULL GROUP BY email_provider ORDER BY n DESC`),
    nicheBreakdown:    db.prepare(`SELECT niche, COUNT(*) AS n, ROUND(AVG(score),1) AS avg, SUM(CASE WHEN status='replied' THEN 1 END) AS replies FROM leads GROUP BY niche ORDER BY replies DESC`),
  },
  outreach: {
    insert:   db.prepare(`INSERT INTO outreach (lead_id,touch,subject,body,sent_at) VALUES (@lead_id,@touch,@subject,@body,CURRENT_TIMESTAMP)`),
    forLead:  db.prepare(`SELECT * FROM outreach WHERE lead_id=? ORDER BY touch`),
    recent:   db.prepare(`SELECT o.*,l.email,l.store_name,l.niche FROM outreach o JOIN leads l ON o.lead_id=l.id ORDER BY o.sent_at DESC LIMIT 100`),
    stats:    db.prepare(`SELECT COUNT(*) AS total, SUM(opened) AS opens, SUM(replied) AS replies, SUM(bounced) AS bounces FROM outreach`),
  },
  bookLeads: {
    insert:   db.prepare(`INSERT OR IGNORE INTO book_leads (email,first_name,source,book_id) VALUES (@email,@first_name,@source,@book_id)`),
    forStep:  db.prepare(`SELECT * FROM book_leads WHERE sequence_step=? AND status='active' LIMIT ?`),
    nextStep: db.prepare(`UPDATE book_leads SET sequence_step=sequence_step+1 WHERE email=?`),
    unsub:    db.prepare(`UPDATE book_leads SET status='unsubscribed' WHERE email=?`),
    stats:    db.prepare(`SELECT COUNT(*) AS total, SUM(CASE WHEN status='active' THEN 1 END) AS active FROM book_leads`),
    all:      db.prepare(`SELECT * FROM book_leads ORDER BY opted_in_at DESC LIMIT 200`),
  },
  cycles: {
    start:         db.prepare(`INSERT INTO agent_cycles (cycle_number,ai_directives) VALUES (@cycle_number,@ai_directives)`),
    finish:        db.prepare(`UPDATE agent_cycles SET status=@status,finished_at=CURRENT_TIMESTAMP,domains_found=@domains_found,mx_filtered=@mx_filtered,emails_harvested=@emails_harvested,leads_enriched=@leads_enriched,leads_scored=@leads_scored,emails_sent=@emails_sent,ai_learnings=@ai_learnings WHERE id=@id`),
    latest:        db.prepare(`SELECT * FROM agent_cycles ORDER BY cycle_number DESC LIMIT 1`),
    recent:        db.prepare(`SELECT * FROM agent_cycles ORDER BY cycle_number DESC LIMIT 10`),
    updateMetrics: db.prepare(`UPDATE agent_cycles SET opens=@opens,replies=@replies,conversions=@conversions WHERE id=@id`),
  },
  nichePerf: {
    insert: db.prepare(`INSERT INTO niche_performance (cycle_id,niche,leads_found,emails_sent,open_rate,reply_rate,conversion,avg_score) VALUES (@cycle_id,@niche,@leads_found,@emails_sent,@open_rate,@reply_rate,@conversion,@avg_score)`),
    history: db.prepare(`SELECT * FROM niche_performance ORDER BY recorded_at DESC LIMIT 80`),
  },
  providerPerf: {
    insert: db.prepare(`INSERT INTO provider_performance (cycle_id,provider,leads_found,emails_sent,open_rate,reply_rate,avg_score) VALUES (@cycle_id,@provider,@leads_found,@emails_sent,@open_rate,@reply_rate,@avg_score)`),
    history: db.prepare(`SELECT * FROM provider_performance ORDER BY recorded_at DESC LIMIT 80`),
  },
  decisions: {
    insert: db.prepare(`INSERT INTO agent_decisions (cycle_id,stage,decision,reasoning) VALUES (@cycle_id,@stage,@decision,@reasoning)`),
    recent: db.prepare(`SELECT * FROM agent_decisions ORDER BY decided_at DESC LIMIT 50`),
  },
  audit: {
    log:    db.prepare(`INSERT INTO audit_log (entity,entity_id,action,detail) VALUES (?,?,?,?)`),
    recent: db.prepare(`SELECT * FROM audit_log ORDER BY ts DESC LIMIT 200`),
  },
  pipeline: {
    start:  db.prepare(`INSERT INTO pipeline_runs (cycle_id,stage,status) VALUES (?,?,?)`),
    finish: db.prepare(`UPDATE pipeline_runs SET status=?,leads_out=?,finished_at=CURRENT_TIMESTAMP WHERE id=?`),
    recent: db.prepare(`SELECT * FROM pipeline_runs ORDER BY started_at DESC LIMIT 30`),
  },

  // ── Sales engine queries ──────────────────────────────────
  salesMatch: {
    insert:       db.prepare(`INSERT INTO sales_matches (lead_id,entry_product_id,entry_product_name,entry_price,entry_reason,ascension_path,ltv_estimate,primary_hook,objection) VALUES (@lead_id,@entry_product_id,@entry_product_name,@entry_price,@entry_reason,@ascension_path,@ltv_estimate,@primary_hook,@objection)`),
    unmatched:    db.prepare(`SELECT l.* FROM leads l WHERE l.scored_at IS NOT NULL AND l.id NOT IN (SELECT lead_id FROM sales_matches) ORDER BY l.score DESC LIMIT ?`),
    readyToSell:  db.prepare(`SELECT * FROM sales_matches WHERE sequenced=0 ORDER BY ltv_estimate DESC LIMIT ?`),
    markSequenced:db.prepare(`UPDATE sales_matches SET sequenced=1 WHERE id=?`),
    markSold:     db.prepare(`UPDATE sales_matches SET sold=1, sold_product_id=?, revenue=? WHERE id=?`),
    all:          db.prepare(`SELECT m.*, l.store_name, l.niche, l.email FROM sales_matches m JOIN leads l ON m.lead_id=l.id ORDER BY m.ltv_estimate DESC LIMIT 200`),
    stats:        db.prepare(`SELECT COUNT(*) AS total, SUM(sold) AS sold, ROUND(SUM(ltv_estimate),0) AS pipeline_value, ROUND(SUM(revenue),0) AS realised FROM sales_matches`),
  },
  salesSequence: {
    insert:  db.prepare(`INSERT INTO sales_sequences (match_id,lead_id,touch,product_id,subject,body) VALUES (@match_id,@lead_id,@touch,@product_id,@subject,@body)`),
    forMatch:db.prepare(`SELECT * FROM sales_sequences WHERE match_id=? ORDER BY touch`),
    recent:  db.prepare(`SELECT s.*, l.store_name FROM sales_sequences s JOIN leads l ON s.lead_id=l.id ORDER BY s.id DESC LIMIT 100`),
  },
  revenue: {
    record:  db.prepare(`INSERT INTO revenue_ledger (lead_id,product_id,product_name,amount,recurring,rung) VALUES (@lead_id,@product_id,@product_name,@amount,@recurring,@rung)`),
    total:   db.prepare(`SELECT ROUND(SUM(amount),0) AS total, COUNT(*) AS sales FROM revenue_ledger`),
    byProduct: db.prepare(`SELECT product_name, COUNT(*) AS sales, ROUND(SUM(amount),0) AS revenue FROM revenue_ledger GROUP BY product_id ORDER BY revenue DESC`),
    byRung:  db.prepare(`SELECT rung, COUNT(*) AS sales, ROUND(SUM(amount),0) AS revenue FROM revenue_ledger GROUP BY rung ORDER BY rung`),
    recent:  db.prepare(`SELECT * FROM revenue_ledger ORDER BY sold_at DESC LIMIT 50`),
    monthlyRecurring: db.prepare(`SELECT ROUND(SUM(amount),0) AS mrr FROM revenue_ledger WHERE recurring='monthly'`),
  },
}

export default db
