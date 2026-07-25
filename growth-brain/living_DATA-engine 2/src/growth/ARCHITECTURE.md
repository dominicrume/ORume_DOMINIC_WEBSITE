# ═══════════════════════════════════════════════════════════════
# ARCHITECTURE: AUDIENCE INGESTION & ATTRIBUTION GROUNDING
# Domain: src/growth/ · Enforces ROOTS.md Root #3, #6, #11
# ═══════════════════════════════════════════════════════════════

## 1. Module Purpose & Boundary Contract
The `src/growth/` module is the **Audience Intelligence Gateway** for the Living Data Engine. Its sole responsibility is ingesting, deduplicating, normalizing, and persisting raw historical and live traffic streams from Substack, social media, organic search, and direct referrals.

> **Grounding Rule (Root #11):** No audience metric, visitor count, or conversion rate may be estimated or hallucinated by any AI agent. All traffic figures MUST trace directly to an ingested CSV record or verified API payload stored in `growth_sources`.

---

## 2. Audience Ingestion Workflow & Idempotency
When `SourceImporter.importFromCSV()` executes, it enforces the following transactional pipeline:

1. **Payload Discovery:** Locates target data files (e.g., `data/growth_sources.csv` or root CSV exports).
2. **Stream Normalization:** Maps arbitrary referrer strings into 5 canonical traffic categories:
   - `Direct`: Direct browser navigation, bookmarks, and internal app redirects.
   - `Substack`: Native Substack recommendation network, notes, and leaderboards.
   - `Social`: Twitter/X, LinkedIn, Facebook, Instagram, YouTube, TikTok, Reddit.
   - `Search`: Google, Bing, DuckDuckGo, Yahoo, Baidu, Yandex.
   - `Email/Other`: Email newsletters, RSS feeds, RSS campaigns, and unclassified web referrals.
3. **Atomic Transactional Upsert:** Executes within a `better-sqlite3` atomic transaction (`db.transaction()`). To prevent duplicate counting across repeated runs, records are idempotently upserted on the composite unique key `(date, source, category)`.

---

## 3. Data Schema & Attribution Mapping
The ingested data populates `growth_sources` with the following schema invariants:
```sql
CREATE TABLE IF NOT EXISTS growth_sources (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  date        TEXT NOT NULL,
  source      TEXT NOT NULL,
  category    TEXT NOT NULL,
  visitors    INTEGER DEFAULT 0,
  subscribers INTEGER DEFAULT 0,
  revenue     REAL DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date, source, category)
);
```

### Attribution Rules:
- **Visitor-to-Subscriber Conversion Rate:** Calculated dynamically as `(SUM(subscribers) * 100.0) / SUM(visitors)`.
- **Revenue Yield per Visitor (RPV):** Calculated as `SUM(revenue) / SUM(visitors)`.

---

## 4. Verification & Testing Gates
Any modification to `src/growth/` must pass the automated ingestion test gate in `scripts/testGrowthEngine.js`:
- `assert(importStats.imported >= 0)`
- `assert(importStats.visitors >= 100)`
- `assert(categories.length >= 3)`

---
*Signed by: Senior Director Principal Product Manager · Rume Dominic / Vorem Nigeria AI Platform.*
