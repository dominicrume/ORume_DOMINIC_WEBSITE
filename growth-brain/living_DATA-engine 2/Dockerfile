# ═══════════════════════════════════════════════════════════════
# LIVING ENGINE 2.0 — SIMPLIFIED RAILWAY DOCKERFILE
# Single-stage build: no multi-stage node_modules copying
# ═══════════════════════════════════════════════════════════════

FROM node:20-alpine

# Install native build tools for SQLite
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy all source files
COPY . .

# Build the UI dashboard
RUN npm run ui:build

# Create runtime directories and non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 engine && \
    mkdir -p /app/data /app/logs /app/exports /app/memory && \
    chown -R engine:nodejs /app

USER engine

ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

CMD ["npm", "start"]
