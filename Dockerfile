FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN --mount=type=secret,id=env \
    if [ -f /run/secrets/env ]; then cp /run/secrets/env .env.production; fi; \
    SITE_URL=http://localhost:3000 API_SERVER_URL=http://localhost:3001 npm run build

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["node", "dist/server/index.mjs"]
