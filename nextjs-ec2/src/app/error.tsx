'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/Button/Button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">문제가 발생했습니다</h1>
        <p className="text-muted-foreground">잠시 후 다시 시도해 주세요.</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={reset}>
          다시 시도
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">홈으로</Link>
        </Button>
      </div>
      {error.digest && (
        <p className="text-sm text-muted-foreground">오류 ID: {error.digest}</p>
      )}
    </div>
  )
}
