# ═══════════════════════════════════════════════════════════════
# ARCHITECTURE: CONTAINERIZATION, PM2 STABILIZATION & DEVOPS
# Domain: docs/ · Enforces ROOTS.md Root #7, #12, #13
# ═══════════════════════════════════════════════════════════════

## 1. Executive Summary & Infrastructure Overview
This document is the master DevOps specification for deploying the **Living Data Engine 2.0 & AI Growth Brain** in enterprise production environments. By transitioning from local development scripts to production-grade containerization (`Docker`), orchestration (`Docker Compose`), and zero-downtime process clustering (`PM2`), we ensure 24/7 self-healing uptime, zero-lag UI performance, and zero data loss during deployments.

---

## 2. Containerization Strategy (Docker & Docker Compose)

### Multi-Stage Dockerfile Architecture
The `Dockerfile` employs a 3-stage pipeline to minimize image size and ensure ABI compatibility for native C++ SQLite bindings (`better-sqlite3@9.6.0`):
1. **`deps` Stage (`node:20-alpine`):** Installs native build toolchains (`python3`, `make`, `g++`) and executes `npm ci` to compile `better-sqlite3` specifically for Alpine Linux target architectures.
2. **`builder` Stage:** Copied over node_modules and compiles the frontend React dashboard via Vite (`npm run ui:build` $\rightarrow$ `dist/dashboard`).
3. **`runner` Stage:** Strips build toolchains, sets up a non-root user (`engine:nodejs`, UID 1001), exposes port `3001`, and configures an automated container liveness probe (`HEALTHCHECK`).

### Volume Persistence & Zero Data Loss
To guarantee that historical audience traffic analytics and AI memory survive container restarts and image rebuilds, `docker-compose.yml` mounts 4 persistent named volumes:
- `engine_data:/app/data` — Persists `living-engine.db` and ingested CSV files.
- `engine_logs:/app/logs` — Persists Winston JSON logs and PM2 error output.
- `engine_memory:/app/memory` — Persists autonomous agent stage memory and learning insights.
- `engine_exports:/app/exports` — Persists generated CSV/JSON audit reports.

---

## 3. Bare-Metal & VM Process Management (PM2)
For deployments on bare-metal servers, AWS EC2, or VPS environments where Docker is not utilized, `ecosystem.config.cjs` manages process clustering and automated cron schedules:

```javascript
module.exports = {
  apps: [
    {
      name: 'living-engine-api',
      script: 'src/api/server.js',
      instances: 1, // Single instance ensures SQLite WAL write safety
      max_memory_restart: '500M',
      env_production: { NODE_ENV: 'production', PORT: 3001 },
      autorestart: true,
    },
    {
      name: 'living-engine-worker',
      script: 'src/agent/agent.js',
      args: '--once',
      cron_restart: '0 * * * *', // Triggers hourly autonomous diagnostic cycle
      autorestart: false,
    }
  ]
};
```

---

## 4. Rollback & Disaster Recovery Protocol (Root #12)
1. **Automated Database Backups:** SQLite WAL mode ensures consistent point-in-time snapshots. To backup without stopping the server, execute:
   ```bash
   sqlite3 data/living-engine.db ".backup 'data/backup_$(date +%F).db'"
   ```
2. **Instant Container Rollback:** If a deployment fails health checks, Docker Compose automatically halts routing to the container. Revert to the previous image tag via:
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

---
*Signed by: Senior Director Principal Product Manager · Rume Dominic / Vorem Nigeria AI Platform.*
