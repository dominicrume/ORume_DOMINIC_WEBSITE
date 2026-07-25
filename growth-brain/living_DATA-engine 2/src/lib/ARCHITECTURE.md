# ═══════════════════════════════════════════════════════════════
# ARCHITECTURE: DATABASE SCHEMA & WAL CONCURRENCY GROUNDING
# Domain: src/lib/ · Enforces ROOTS.md Root #7, #9, #10
# ═══════════════════════════════════════════════════════════════

## 1. Module Purpose & Boundary Contract
The `src/lib/` module provides the **Persistence and Logging Layer** for the Living Data Engine. It manages SQLite connection pooling, schema migrations, WAL concurrency pragmas, and telemetry logging via Winston.

> **Grounding Rule (Root #7):** All database operations touching real customer data or pipeline revenue MUST execute within structured try-catch boundaries and atomic transactions. No query may lock the event loop or block UI reading.

---

## 2. Zero-Lag Concurrency & Pragma Configuration
To support simultaneous high-frequency analytics querying from the React UI while background AI worker jobs ingest CSV traffic data, `db.js` enforces strict SQLite pragma settings:

```javascript
db.pragma('journal_mode = WAL')
db.pragma('synchronous = NORMAL')
db.pragma('cache_size = -64000') // Allocates 64MB RAM page cache
db.pragma('busy_timeout = 5000') // 5000ms busy wait before SQLITE_BUSY error
db.pragma('foreign_keys = ON')
```

### Why WAL Mode?
In standard rollback journal mode, readers block writers and writers block readers. **Write-Ahead Logging (WAL)** allows concurrent reads while a write transaction is active, eliminating database lock lags and API timeouts.

---

## 3. Normalized Database Schema
The database (`living-engine.db`) consists of 12 normalized tables:

1. **`growth_sources`**: Idempotent daily audience traffic metrics (`date`, `source`, `category`, `visitors`, `subscribers`, `revenue`).
2. **`growth_insights`**: Audit log of AI diagnostic diagnoses and JSON recommendations.
3. **`domains`**: Harvested target domains and MX provider intelligence.
4. **`leads`**: Scored and enriched contacts with AI qualification scores (0-100).
5. **`book_leads`**: Capture form opt-ins for *From Code to Consciousness*.
6. **`outreach_sequences` & `outreach_logs`**: Email sequence state tracking.
7. **`sales_matches` & `sales_revenue`**: Ascension ladder deal tracking towards the £8M target.
8. **`agent_decisions`, `cycle_metrics`, `learning_insights`, `audit_log`**: Autonomous agent memory and execution telemetry.

---

## 4. Native Binary Binding Stability
The project utilizes `better-sqlite3@9.6.0`, which provides prebuilt native binaries for Node v18+ across macOS (ARM64/x64) and Linux (Alpine/Debian). This prevents ABI version mismatch errors during Docker containerization or local execution.

---
*Signed by: Senior Director Principal Product Manager · Rume Dominic / Vorem Nigeria AI Platform.*
