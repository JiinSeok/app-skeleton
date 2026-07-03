# app-skeleton · `remix` 브랜치

**Remix 2.15 + Vite + Tailwind + React 18** 앱 시작 스켈레톤 (기존 `my-remix-app-skeleton`).
pretendard 폰트와 eslint·prettier·stylelint 설정(`config/`)이 포함돼 있다.

> 📌 이 레포는 프레임워크별로 브랜치를 나눈다. 최신 인덱스와 다른 스켈레톤은
> [`main` 브랜치](../../tree/main)에서 확인 — 현재 default는 `main`(Next.js + EC2/Docker/Caddy 배포)이다.

## 스택

- Remix 2.15 (`@remix-run/node` · `react` · `serve` · `dev`)
- Vite (`remix vite:dev` / `remix vite:build`)
- Tailwind CSS + PostCSS
- React 18 · TypeScript
- 폰트: pretendard

## 시작

```bash
npm install
npm run dev      # remix vite:dev
npm run build    # remix vite:build
npm run start    # remix-serve ./build/server/index.js
```
