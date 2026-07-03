import Link from 'next/link'

export default function HomePage() {
  return (
    <main
      role="main"
      className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-6 py-16"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">App Skeleton</h1>
        <p className="text-muted-foreground">
          Next.js(App Router) + EC2/Docker/Caddy 배포 스켈레톤. shadcn/ui,
          Auth.js v5, Drizzle, sonner가 배선돼 있습니다.
        </p>
      </div>

      <ul className="flex flex-col gap-2 text-sm">
        <li>
          <span className="font-medium">헬스체크</span> —{' '}
          <Link className="underline" href="/api/health">
            /api/health
          </Link>{' '}
          (배포 파이프라인이 200을 기다림)
        </li>
        <li>
          <span className="font-medium">배포 계약</span> — 루트{' '}
          <code>README.md</code>와 <code>deploy/</code> 참고
        </li>
      </ul>
    </main>
  )
}
