import { ReactNode } from 'react'

/**
 * Types for Skeleton components
 */
export interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  circle?: boolean
  rounded?: boolean
}

export interface SkeletonTextProps {
  className?: string
  lines?: number
}

export interface SectionSkeletonProps {
  className?: string
  background?: string
  title?: boolean
  titleWidth?: string | number
  description?: boolean
  descriptionLines?: number
  descriptionClassName?: string
  children?: ReactNode
}
