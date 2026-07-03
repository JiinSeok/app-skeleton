import '@/app/globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import ClientSideProviders from '@/lib/providers/ClientSideProviders'
import { cn } from '@/lib/utils/classnames'

export const metadata: Metadata = {
  title: { default: 'App Skeleton', template: '%s | App Skeleton' },
  description: 'Next.js + EC2/Docker/Caddy 배포 스켈레톤',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={cn('relative min-h-screen w-full bg-background')}>
        {children}
        <ClientSideProviders />
      </body>
    </html>
  )
}
