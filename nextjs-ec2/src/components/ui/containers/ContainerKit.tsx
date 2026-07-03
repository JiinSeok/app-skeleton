'use client'

import { ComponentProps, HeaderProps } from '@/lib/types'
import { cn } from '@/lib/utils/classnames'

/**
 * 콘텐츠 영역의 좌우 마진을 통일하기 위한 컴포넌트입니다.
 */

export function Container({ children, className, id }: ComponentProps) {
  return (
    <section
      id={id}
      className={cn('w-full mx-auto px-6 py-24 md:px-8 lg:px-12', className)}
    >
      {children}
    </section>
  )
}

export function Section({ children, className, id }: ComponentProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full max-w-7xl mx-auto px-6 py-24 md:px-8 lg:px-12',
        className,
      )}
    >
      {children}
    </section>
  )
}

function SectionHeader({ id, title, description }: HeaderProps) {
  return (
    <>
      <header className="text-center mb-20">
        <h2 id={id} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </header>
    </>
  )
}

Container.Section = Section
Container.SectionHeader = SectionHeader
