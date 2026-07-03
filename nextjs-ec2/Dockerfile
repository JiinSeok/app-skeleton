FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache libc6-compat && corepack enable

# 전체 deps 설치(devDeps 포함): build + migrate(drizzle-kit) + seed(tsx)에 필요.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

COPY . .
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
