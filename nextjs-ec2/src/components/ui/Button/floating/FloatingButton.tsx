'use client'

/**
 * FloatingButton 컴포넌트
 *
 * 화면 우측 하단에 고정된 플로팅 버튼과 클릭 시 나타나는 팝오버를 제공합니다.
 * 버튼 클릭 시 팝오버가 표시되며, 팝오버 외부를 클릭하면 팝오버가 닫힙니다.
 */
import { Button } from '@/components/ui/Button/Button'
import { ComponentProps } from '@/lib/types'
import { cn } from '@/lib/utils/classnames'
import { X } from 'lucide-react'
import React, { ReactNode, useState } from 'react'

export interface FloatingButtonProps {
  icon: ReactNode
  children: ReactNode
  className?: string
  ariaLabel?: string
}

export default function FloatingButton({
  icon,
  children,
  className,
  ariaLabel = '도움말 메뉴 열기',
}: FloatingButtonProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopover = () => {
    setIsOpen(!isOpen)
  }

  const closePopover = () => {
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 플로팅 버튼 */}
      <Button
        variant="default"
        size="icon"
        className={cn('rounded-full shadow-lg', className)}
        onClick={togglePopover}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
      >
        {icon}
      </Button>

      {/* 팝오버 */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-popover rounded-lg shadow-lg p-4 animate-in fade-in-50 slide-in-from-bottom-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">도움이 필요하신가요?</h3>
            <button
              onClick={closePopover}
              className="text-gray-500 hover:text-gray-700"
              aria-label="닫기"
            >
              <X size={18} />
            </button>
          </div>
          <div className="space-y-4">{children}</div>
        </div>
      )}

      {/* 배경 오버레이 - 팝오버가 열렸을 때만 표시 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closePopover}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

/**
 * 팝오버 내부의 항목 컴포넌트
 */
function Item({
  children,
  className,
  ...props
}: ComponentProps<'button'>): React.JSX.Element {
  return (
    <button
      className={cn(
        'w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// 하위 컴포넌트 연결
FloatingButton.Item = Item
