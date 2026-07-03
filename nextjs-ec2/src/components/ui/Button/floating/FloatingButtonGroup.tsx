'use client'

/**
 * FloatingButtonGroup 컴포넌트
 *
 * 수직으로 여러 버튼을 담을 수 있는 플로팅 버튼 그룹 컴포넌트입니다.
 * 버튼 설정 배열을 받아 .map()을 사용하여 동적으로 버튼을 생성합니다.
 */
import FloatingButton from '@/components/ui/Button/floating/index'
import React, { ReactNode } from 'react'

export interface ButtonConfig {
  icon: ReactNode
  text: string
  onClick: () => void
  ariaLabel?: string
}

export interface FloatingButtonGroupProps {
  mainIcon: ReactNode
  buttons: ButtonConfig[]
  title?: string
  mainAriaLabel?: string
  className?: string
}

export default function FloatingButtonGroup({
  mainIcon,
  buttons,
  mainAriaLabel = '메뉴 열기',
  className,
}: FloatingButtonGroupProps): React.JSX.Element {
  return (
    <FloatingButton
      icon={mainIcon}
      ariaLabel={mainAriaLabel}
      className={className}
    >
      {buttons.map((button, index) => (
        <FloatingButton.Item
          key={index}
          onClick={button.onClick}
          aria-label={button.ariaLabel || button.text}
        >
          <div className="flex items-center gap-2">
            {button.icon}
            <span>{button.text}</span>
          </div>
        </FloatingButton.Item>
      ))}
    </FloatingButton>
  )
}
