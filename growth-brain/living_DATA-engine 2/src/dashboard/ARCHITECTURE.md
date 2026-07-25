# ═══════════════════════════════════════════════════════════════
# ARCHITECTURE: FULL-SCALE UI & VISUALIZATION GROUNDING
# Domain: src/dashboard/ · Enforces ROOTS.md Root #1, #2, #5, #11
# ═══════════════════════════════════════════════════════════════

## 1. Module Purpose & Boundary Contract
The `src/dashboard/` module is the **Executive Product Command Center**. Built with React 18, Vite, and Lucide Icons, it visualizes real-time audience traffic streams, AI Growth Brain prescriptions, and lead pipelines in a high-density, zero-lag UI.

> **Grounding Rule (Root #5 & #11):** The UI must never display placeholder metrics or static mock arrays in production. All KPI cards, tables, and AI advisor output MUST bind directly to REST API payloads fetched from `/api/growth/*` and `/api/stats`.

---

## 2. Multi-Tab Component Architecture
The application (`App.jsx`) is organized into two primary analytical domains:

### Tab 1: Substack & Audience Growth Intelligence (`activeTab === 'growth'`)
- **Executive KPI Cards:** Displays Total Visitors, Total Subscribers, Conversion Rate (`%`), and Total Revenue (`£`).
- **AI Growth Advisor Prescription Card:** Features glowing cyan glassmorphism accents, rendering the latest AI diagnosis, target monetization tier, and prioritized recommendation cards (Action, Rationale, Impact, Channel).
- **Traffic by Channel Table:** Renders visitor volume, subscriber conversion, and RPV across all 5 canonical categories (`Direct`, `Substack`, `Social`, `Search`, `Email/Other`).
- **Audience Origin & Source Analysis Table:** Displays granular performance for specific referzers (e.g., `twitter.com`, `substack.com`, `google.com`), allowing instant attribution of high-converting audience segments.
- **Data Import Trigger Button:** Allows on-demand execution of CSV ingestion (`POST /api/growth/import`) without leaving the UI.

### Tab 2: ICM Pipeline & Lead Intelligence (`activeTab === 'pipeline'`)
- **Pipeline KPI Cards:** Displays Total Leads, Scored Leads, Domains Harvested, Book Opt-ins, and Outbound Emails Sent.
- **Sales Match & Target Progress:** Tracks revenue generation against the £8,000,000 annual target.
- **Lead Exploration Table:** Filterable table displaying high-scoring leads, niche classifications, MX provider verification status, and AI qualification rationale.

---

## 3. Styling & Zero-Lag Performance Design
- **Design System (`index.css`):** Built with pure CSS custom properties, featuring deep dark mode aesthetics (`#0a0b0e` background), glassmorphism borders (`rgba(255, 255, 255, 0.08)`), and vibrant neon status badges.
- **Zero-Lag Polling:** Uses asynchronous `fetch` with 15-second polling intervals and proper React cleanup hooks to ensure smooth transitions without memory leaks or UI freezes.

---
*Signed by: Senior Director Principal Product Manager · Rume Dominic / Vorem Nigeria AI Platform.*
