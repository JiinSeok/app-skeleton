import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // standalone은 쓰지 않는다: compose.yml의 migrate/seed 서비스가 같은 이미지로
  // `pnpm db:push`/`pnpm db:seed`를 돌리므로, 이미지에 pnpm과 drizzle-kit(전체 deps)이
  // 남아 있어야 한다. 이미지를 더 줄이려면 migrate 전용 스테이지를 따로 두는 구조로 확장.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
}

export default nextConfig
