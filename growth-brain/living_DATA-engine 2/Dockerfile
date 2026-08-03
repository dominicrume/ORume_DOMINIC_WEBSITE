# ═══════════════════════════════════════════════════════════════
# LIVING ENGINE 2.0 & AI GROWTH BRAIN — ENTERPRISE DOCKERFILE
# Multi-stage production build with native SQLite C++ toolchains
# ═══════════════════════════════════════════════════════════════

# Stage 1: Dependencies & Native Compilation
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Builder (UI Bundle & Code Prep)
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN mkdir -p /app/dist
RUN npm run ui:build

# Stage 3: Production Runner (Zero-Lag Execution)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

# Install runtime dependencies for SQLite WAL and Playwright (if needed)
RUN apk add --no-cache libc6-compat

# Create non-root user and directories
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 engine
RUN mkdir -p /app/data /app/logs /app/exports /app/memory /app/dist
RUN chown -R engine:nodejs /app

COPY --from=builder --chown=engine:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=engine:nodejs /app/src ./src
COPY --from=builder --chown=engine:nodejs /app/scripts ./scripts
COPY --from=builder --chown=engine:nodejs /app/package.json ./package.json
COPY --from=builder --chown=engine:nodejs /app/dist ./dist
COPY --from=builder --chown=engine:nodejs /app/data ./data
COPY --from=builder --chown=engine:nodejs /app/ROOTS.md ./ROOTS.md
COPY --from=builder --chown=engine:nodejs /app/CLAUDE.md ./CLAUDE.md

USER engine
EXPOSE 3001

# Healthcheck targeting liveness probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

CMD ["npm", "start"]
