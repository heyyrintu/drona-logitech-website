# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────
# Build stage — produce the Next.js static export in /app/out
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps first so this layer caches until the lockfile changes.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Build. next.config.mjs sets output:'export', so this writes /app/out.
COPY . .
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_CONTACT_EMAIL=${NEXT_PUBLIC_CONTACT_EMAIL}
ENV NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=${NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}
RUN npm run build

# Fail loudly here rather than shipping an empty site.
RUN test -f out/index.html || (echo "Build produced no out/index.html" && exit 1)

# ─────────────────────────────────────────────────────────────
# Runtime stage — serve the static files with nginx
# ─────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
