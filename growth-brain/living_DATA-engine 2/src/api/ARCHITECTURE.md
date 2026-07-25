# ═══════════════════════════════════════════════════════════════
# ARCHITECTURE: REST API TELEMETRY & HEALTH GROUNDING
# Domain: src/api/ · Enforces ROOTS.md Root #1, #7, #12
# ═══════════════════════════════════════════════════════════════

## 1. Module Purpose & Boundary Contract
The `src/api/` module (`server.js`) is the **REST API and Telemetry Gateway**. It exposes database aggregations, AI Growth Brain insights, and pipeline triggers to the frontend UI and external webhooks over HTTP (Port 3001).

> **Grounding Rule (Root #7):** API endpoints MUST remain stateless and lightweight. Intensive tasks (like scraping or full web crawls) must be delegated to background workers or scheduled cron jobs, ensuring API response times remain under 100ms without UI lags.

---

## 2. API Endpoint Specification

### Core Telemetry & Liveness Probes
- **`GET /api/health`**: Enterprise liveness probe for Docker Compose / Kubernetes / PM2. Returns `{ status: 'ok', db: 'ok', timestamp }` with HTTP 200 (or HTTP 503 if database fails).
- **`GET /api/ready`**: Readiness probe returning `{ ready: true, uptime }`.

### Growth Intelligence & Substack Analytics
- **`GET /api/growth/sources`**: Returns raw historical audience traffic rows from `growth_sources`.
- **`GET /api/growth/stats`**: Returns aggregated KPI metrics, breakdown by category (`byCategory`), breakdown by specific source (`bySource`), and historical timeline data (`timeline`).
- **`GET /api/growth/insights`**: Returns the latest AI Growth Advisor diagnosis from `growth_insights`. If no diagnosis exists, it triggers an on-demand analysis cycle automatically.
- **`POST /api/growth/import`**: Triggers an atomic CSV ingestion cycle and AI diagnosis, returning `{ ok: true, importStats, diagnosis }`.

### ICM Layer 0 Pipeline & Sales
- **`GET /api/stats`**: Returns overall lead qualification, domain count, book opt-ins, and outreach stats.
- **`GET /api/leads`**: Returns scored lead records, filterable by `status` or `provider`.
- **`GET /api/sales/stats`**: Returns pipeline valuation, realized revenue, and product breakdown towards the £8M target.
- **`POST /api/sales/record`**: Records a converted sale and logs to the audit trail.
- **`GET /unsubscribe/:email`**: One-click CAN-SPAM compliant unsubscribe handler.

---

## 3. Production Static UI Serving (Root #12)
When running in production mode (`NODE_ENV=production`), Express automatically serves the compiled Vite dashboard from `../../dist/dashboard`. Non-API requests fall back to `index.html`, creating a unified, container-friendly web server on port 3001.

---
*Signed by: Senior Director Principal Product Manager · Rume Dominic / Vorem Nigeria AI Platform.*
