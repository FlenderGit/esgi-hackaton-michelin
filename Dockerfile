# ==========================================
# Stage 1: Base
# ==========================================
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ==========================================
# Stage 2: Dependencies
# ==========================================
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# ==========================================
# Stage 3: Development
# ==========================================
FROM base AS development
ENV NODE_ENV=development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ==========================================
# Stage 4: Builder (production)
# ==========================================
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ==========================================
# Stage 5: Production runtime
# ==========================================
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
