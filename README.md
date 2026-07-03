# app-skeleton

프레임워크별 앱 시작 스켈레톤 모음.

## 브랜치 / 폴더

| 위치 | 내용 |
|---|---|
| `main` · [`nextjs-ec2/`](./nextjs-ec2) | **Next.js 15(App Router) + EC2/Docker/Caddy 배포** 스켈레톤. shadcn/ui · Auth.js v5 · Drizzle · Tailwind v4 · pnpm |
| [`remix`](../../tree/remix) 브랜치 | **Remix 2.15 + Vite + Tailwind + React 18** 스켈레톤 (pretendard 폰트, lint 설정 포함). 기존 `my-remix-app-skeleton` |

## nextjs-ec2 요약

GitHub Actions가 이미지를 GHCR에 빌드·푸시하고, OIDC로 AWS 자격을 얻어 EC2에 SSH 배포.
서버에서는 Docker Compose로 `postgres → migrate → app → caddy`를 올리고, Caddy가 HTTPS를
자동 발급하며 `/api/health` 200으로 헬스체크한다.

자세한 내용은 [`nextjs-ec2/README.md`](./nextjs-ec2/README.md) 참고.
