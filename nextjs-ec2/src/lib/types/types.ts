import React, { JSX, ReactNode } from 'react'

export interface ClickProps {
  onClick?: () => void
}

export type ParentProps = {
  children?: ReactNode
  className?: string
}

export type ComponentProps<
  T extends keyof React.JSX.IntrinsicElements = 'div',
> = {
  children?: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  id?: string
} & React.JSX.IntrinsicElements[T]

export interface HeaderProps extends ComponentProps {
  id?: string
  title?: string
  description?: string
}

export interface ChildrenProps {
  children: ReactNode
}

export type LayoutProps = Readonly<ChildrenProps>

export interface MenuItem {
  id: string
  name: string
  icon: ReactNode
  path: string
}

export interface BaseDashboardLayoutProps extends LayoutProps {
  menuItems: MenuItem[]
  title?: string
  logoPath?: string
  logoAlt?: string
}

export interface CustomMessage {
  title?: string
  message?: string
}

export interface MarkdownRendererProps {
  content: string
  className?: string
}
