import Link from 'next/link'
import { Button } from '@/components/ui/Button/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h2>
        <p className="text-muted-foreground">주소가 바뀌었거나 삭제된 페이지입니다.</p>
      </div>
      <Button asChild size="lg">
        <Link href="/">홈으로</Link>
      </Button>
    </div>
  )
}
