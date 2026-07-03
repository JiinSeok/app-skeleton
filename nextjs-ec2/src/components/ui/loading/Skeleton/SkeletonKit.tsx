import {
  SectionSkeletonProps,
  SkeletonProps,
  SkeletonTextProps,
} from '@/components/ui/loading/Skeleton/types'
import { cn } from '@/lib/utils/classnames'

/**
 * Skeleton component for loading states
 */
export const Skeleton = ({
  className,
  width = 'full',
  height = '1rem',
  circle = false,
  rounded = true,
}: SkeletonProps) => {
  const widthClass = typeof width === 'string' ? `w-${width}` : `w-[${width}px]`
  const heightClass =
    typeof height === 'string' ? `h-${height}` : `h-[${height}px]`

  return (
    <div
      className={cn(
        'animate-pulse bg-secondary/70',
        widthClass,
        heightClass,
        {
          'rounded-full': circle,
          rounded: rounded && !circle,
        },
        className,
      )}
    />
  )
}

/**
 * Skeleton text component for loading text
 */
export const SkeletonText = ({ className, lines = 1 }: SkeletonTextProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={i === lines - 1 && lines > 1 ? 'w-4/5' : 'w-full'}
        />
      ))}
    </div>
  )
}

/**
 * Section Skeleton - reusable component for section skeletons
 */
export const SectionSkeleton = ({
  className,
  background = 'bg-background',
  title = true,
  titleWidth = '300px',
  description = true,
  descriptionLines = 2,
  descriptionClassName = 'max-w-2xl mx-auto',
  children,
}: SectionSkeletonProps) => {
  return (
    <section className={cn('w-full py-16', background, className)}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <Skeleton
                height="2.5rem"
                width={titleWidth}
                className="mx-auto mb-4"
              />
            )}
            {description && (
              <SkeletonText
                lines={descriptionLines}
                className={descriptionClassName}
              />
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

/**
 * Navigation Skeleton
 * Mimics the structure of the Navigation component
 */
export const NavigationSkeleton = () => {
  return (
    <nav className="w-full max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
      {/* Logo Area Skeleton */}
      <div className="flex items-center">
        <Skeleton height="2rem" width="100px" />
      </div>

      {/* Menu Links Area Skeleton */}
      <div className="flex space-x-8">
        <Skeleton height="1.5rem" width="80px" />
        <Skeleton height="1.5rem" width="80px" />
        <Skeleton height="1.5rem" width="80px" />
      </div>

      {/* CTA Button Area Skeleton */}
      <div className="flex items-center space-x-4 justify-end">
        <Skeleton height="2.5rem" width="100px" />
      </div>
    </nav>
  )
}
