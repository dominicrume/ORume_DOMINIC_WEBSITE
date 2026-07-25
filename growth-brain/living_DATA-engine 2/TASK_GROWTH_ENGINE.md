# TASK_GROWTH_ENGINE.md — Specification & Architecture for Living Data Engine & AI Growth Brain

**Project:** Rume Dominic / Vorem Nigeria — Living Data Engine & AI Growth Brain
**Author:** AI Growth Brain & Marketing Agent (Antigravity)
**Date:** 2026-07-25
**Governance Standard:** Enforcing ROOTS.md (Soil Check) Roots #1 through #13.

---

## 1. Executive Summary
This specification defines the build out of the **Living Data Engine** and **AI Growth Brain** inside `growth-brain/living_DATA-engine 2/`. The system transitions from an outbound-only scraper/sequencer into a full-scale multi-channel revenue intelligence platform by ingesting historical and live traffic data from Substack, Social Media, Direct Traffic, and WhatsApp (`growth_sources.csv`).

## 2. Core Modules & Specifications

### 2.1 Database & Schema (`src/lib/db.js`)
- **Table: `growth_sources`**
  - `id` (INTEGER PRIMARY KEY)
  - `date` (TEXT NOT NULL) — Format: YYYY/MM/DD
  - `source` (TEXT NOT NULL) — e.g., "Substack > Other", "Facebook", "Direct"
  - `category` (TEXT NOT NULL) — Normalized: "Substack", "Social", "Direct", "Messaging", "Email", "Other"
  - `unique_visitors` (INTEGER DEFAULT 0)
  - `new_subscribers` (INTEGER DEFAULT 0)
  - `new_revenue` (REAL DEFAULT 0)
  - `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)
  - *Index:* Unique constraint on `(date, source, category)` for idempotent upserts.

- **Table: `growth_insights`**
  - `id` (INTEGER PRIMARY KEY)
  - `cycle_date` (DATETIME DEFAULT CURRENT_TIMESTAMP)
  - `top_channel` (TEXT)
  - `bottleneck` (TEXT)
  - `recommendations_json` (TEXT) — JSON array of structured advice items
  - `metrics_summary_json` (TEXT) — JSON object of KPI summary at time of diagnosis

### 2.2 Growth Source Importer (`src/growth/sourceImporter.js`)
- Read `data/growth_sources.csv` (and support programmatic JSON/CSV ingestion).
- Parse rows, sanitize numbers, normalize categories.
- Execute atomic SQLite transaction using `db.prepare().run()` for high performance and integrity (Root #7).
- Log summary statistics (total visitors, subscribers, revenue imported).

### 2.3 AI Growth Advisor Brain (`src/brain/growthAdvisor.js`)
- Query SQLite for aggregated channel performance (Total Visitors, Conversion Rates, Revenue by Category).
- Apply AI reasoning (Anthropic API with intelligent offline heuristic fallback) to diagnose:
  - **High Traffic / Zero Conversion Anomalies:** e.g., Social media driving visitors without opt-ins.
  - **Conversion Champions:** e.g., Substack driving highest opt-in rate.
  - **Ascension Ladder Mapping:** Aligning traffic streams to Rume Dominic's 4-tier ladder (£19.99 Book -> £97 Course -> £1,500/mo Service -> £5,000 Consulting).
- Save generated insights to `growth_insights` table.

### 2.4 API Server Layer (`src/api/server.js`)
- `GET /api/growth/sources` — Query parameters: `category`, `limit`, `offset`. Returns raw traffic rows.
- `GET /api/growth/stats` — Returns aggregated KPIs (Total Visitors, Subscribers, Revenue, Conversion Rates by Category).
- `GET /api/growth/insights` — Returns latest AI diagnosis and strategic recommendations.
- `POST /api/growth/import` — Triggers import and analysis cycle.

### 2.5 Full Scale Dashboard UI (`src/dashboard/`)
- Multi-tab navigation switching between `[Pipeline & Leads]` (existing 9-stage pipeline) and `[Substack & Growth Intelligence]` (new growth engine).
- **Substack & Growth Intelligence Tab Components:**
  - **4 KPI Cards:** Total Visitors, Substack Subscribers, Overall Conversion Rate, Revenue Generated.
  - **Channel Breakdown Table:** Comparing metrics across Substack, Direct, Social, and WhatsApp.
  - **AI Growth Advisor Panel:** Displaying live strategic recommendations with priority badges and action hooks.

## 3. Governance & Exit Criteria (Root #5 & #10)
- `npm run test:growth` must pass 100% of automated checks (ingestion, aggregation, AI diagnosis, API response).
- Zero hardcoded secrets (Root #2 / H2).
- All database operations wrapped in try/catch and transactions (Root #7 / H6).
- All AI recommendations grounded in real numbers from SQLite (Root #11).
