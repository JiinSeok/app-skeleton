# nextjs-ec2

Next.js(App Router) 앱을 **EC2 + Docker Compose + Caddy**로 배포하는 스켈레톤.
GitHub Actions가 이미지를 빌드해 GHCR에 올리고, OIDC로 AWS 자격을 얻어 EC2에 SSH로 배포한다.

## 스택

- Next.js 15 (App Router) · React 19 · TypeScript
- shadcn/ui(new-york) · Tailwind v4 · sonner · react-hook-form · zod · zustand · @tanstack/react-query
- Auth.js v5 (Credentials) · Drizzle ORM(PostgreSQL) · pnpm(corepack)

## 이 배포 방식이 앱 코드에 요구하는 것 (배포 계약)

| 요구 | 어디에 |
|---|---|
| `PORT`/`HOSTNAME`로 리슨 (컨테이너 3000) | `Dockerfile` (`ENV PORT=3000`, `HOSTNAME=0.0.0.0`) |
| `pnpm build` → `pnpm start` | `package.json` scripts, `Dockerfile` |
| 마이그레이션을 이미지에서 실행 | `pnpm db:push` (drizzle-kit) — 전체 deps 필요 → **standalone 미사용** |
| 초기 시드(선택) | `pnpm db:seed` (`scripts/seed.ts`) |
| 런타임 env 계약 | `src/lib/config/env.ts` (zod 검증, 없으면 부팅 실패) |
| 헬스체크 엔드포인트 200 | `src/app/api/health/route.ts` (`GET /api/health`) |
| 인증 | `src/lib/auth.ts` + `src/app/api/auth/[...nextauth]/route.ts` |

> **왜 standalone을 안 쓰나**: `compose.yml`의 `migrate`/`seed` 서비스가 **앱과 같은 이미지**로
> `pnpm db:push`/`pnpm db:seed`를 돌린다. standalone 출력은 pnpm·drizzle-kit·tsx를 이미지에서
> 빼버려 이 서비스들이 깨진다. 이미지를 더 줄이려면 migrate 전용 스테이지를 분리하는 구조로 확장.

## 배포 구성

```
deploy/
├── ec2/
│   ├── compose.yml     # postgres + migrate + app + caddy 4서비스
│   └── deploy.sh       # EC2에서 실행: 시크릿 로드 → compose up → /api/health 대기
└── github/
    └── deploy-staging.yml   # ⚠️ 리포 루트 .github/workflows/ 로 옮겨야 동작
```

### 워크플로 배치
```bash
mkdir -p .github/workflows
cp deploy/github/deploy-staging.yml .github/workflows/deploy-staging.yml
```

### 필요한 설정
- **GitHub Actions variables** (environment `staging`): `AWS_DEPLOY_ROLE_ARN`, `DEPLOY_HOST`,
  `DEPLOY_SECURITY_GROUP_ID`, `DEPLOY_SECRET_ID`, `AWS_REGION`
- **AWS Secrets Manager** (`DEPLOY_SECRET_ID`): `STAGING_SSH_PRIVATE_KEY`, `POSTGRES_PASSWORD`,
  `AUTH_SECRET`, `S3_BUCKET`, `INITIAL_ADMIN_*`
- **EC2**: Docker + docker compose, ubuntu 유저, `sudo -n` 무암호, `/data/postgres` 볼륨 경로

### 흐름
1. push(main) → 이미지 빌드 → GHCR push
2. OIDC로 AWS 자격 → runner IP를 SG 22번에 임시 허용 → Secrets에서 SSH키 로드
3. compose.yml·deploy.sh를 scp → SSH로 `deploy.sh` 실행
4. `postgres` → `migrate(db:push)` → (`db:seed`) → `app`+`caddy` up
5. Caddy가 `PUBLIC_DOMAIN`으로 HTTPS 자동 발급, `app:3000`으로 리버스 프록시
6. `/api/health` 200 확인 → 오래된 이미지 prune → SG 규칙 회수

## 로컬 개발

```bash
corepack enable
pnpm install
cp .env.example .env    # 값 채우기
pnpm db:push            # 스키마 반영 (DATABASE_URL 필요)
pnpm dev
```
