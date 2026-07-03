'use client'

import { cn } from '@/lib/utils/classnames'
/**
 * DemoShowcase 컴포넌트
 *
 * 앱의 데모 영상이나 애니메이션 이미지를 롤링 배너 형태로 보여주는 컴포넌트입니다.
 * Compound Component 패턴을 사용하여 구현되었습니다.
 */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

// DemoShowcase 컨텍스트 타입 정의
interface DemoShowcaseContextType {
  currentIndex: number
  setCurrentIndex: (index: number | ((prev: number) => number)) => void
  itemsCount: number
  setItemsCount: (count: number) => void
  goToSlide: (index: number) => void
  sliderRef: React.RefObject<HTMLDivElement | null>
}

// DemoShowcase 컨텍스트 생성
const DemoShowcaseContext = createContext<DemoShowcaseContextType | undefined>(
  undefined,
)

// 컨텍스트 훅
const useDemoShowcase = () => {
  const context = useContext(DemoShowcaseContext)
  if (!context) {
    throw new Error('DemoShowcase 컴포넌트 내부에서만 사용할 수 있습니다')
  }
  return context
}

// 메인 DemoShowcase 컴포넌트 타입 정의
interface DemoShowcaseProps {
  children: ReactNode
  className?: string
  autoSlideInterval?: number
}

// 메인 DemoShowcase 컴포넌트
export default function DemoShowcase({
  children,
  className,
  autoSlideInterval = 5000,
}: DemoShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsCount, setItemsCount] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  // 자동 슬라이드 기능
  useEffect(() => {
    if (itemsCount === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsCount)
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [itemsCount, autoSlideInterval])

  // 슬라이드 변경 시 스크롤 처리
  useEffect(() => {
    if (sliderRef.current && itemsCount > 0) {
      const itemWidth = sliderRef.current.offsetWidth / 3 // 중앙 아이템 + 좌우 부분 아이템
      sliderRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth',
      })
    }
  }, [currentIndex, itemsCount])

  // 수동 슬라이드 변경 함수
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // 아이템 개수 설정 함수 (SliderKit 컴포넌트에서 호출)
  // const setItems = (count: number) => {
  //   setItemsCount(count)
  // }

  return (
    <DemoShowcaseContext.Provider
      value={{
        currentIndex,
        setCurrentIndex,
        itemsCount,
        setItemsCount,
        goToSlide,
        sliderRef,
      }}
    >
      <div className={cn('overflow-hidden', className)}>{children}</div>
    </DemoShowcaseContext.Provider>
  )
}

// Header 컴포넌트
interface HeaderProps {
  title: string
  description?: string
  className?: string
  id?: string
}

function Header({
  title,
  description,
  className,
  id = 'demo-heading',
}: HeaderProps) {
  return (
    <div className={cn('text-center mb-16', className)}>
      <h2 id={id} className="text-3xl md:text-4xl font-bold mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}

// SliderKit 컴포넌트
interface SliderProps {
  children: ReactNode
  className?: string
}

function SliderKit({ children, className }: SliderProps) {
  const { sliderRef } = useDemoShowcase()

  // 자식 요소 수를 계산하여 컨텍스트에 설정
  // const childrenArray = React.Children.toArray(children)
  const { setCurrentIndex } = useDemoShowcase()

  // 컴포넌트 마운트 시 아이템 개수 업데이트
  const { setItemsCount } = useDemoShowcase()

  useEffect(() => {
    // 아이템 개수를 컨텍스트에 설정
    // 직접 자식 요소 수를 카운트 (여백 div는 SliderKit 내부에서 추가되므로 제외됨)
    const itemCount = React.Children.count(children)

    setItemsCount(itemCount)
    setCurrentIndex(0) // 초기 인덱스 설정
  }, [children, setItemsCount, setCurrentIndex])

  // Add event listener to update center status when scrolling
  useEffect(() => {
    const currentSliderRef = sliderRef.current
    const handleScroll = () => {
      // This will trigger a re-render which will cause the SliderItems to check their position
      setCurrentIndex((prev: number) => prev)
    }

    if (currentSliderRef) {
      currentSliderRef.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (currentSliderRef) {
        currentSliderRef.removeEventListener('scroll', handleScroll)
      }
    }
  }, [sliderRef, setCurrentIndex])

  return (
    <div
      className={cn('relative overflow-hidden mx-auto max-w-7xl', className)}
    >
      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide gap-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* 슬라이더 내부에 여백을 추가하여 첫 번째와 마지막 아이템이 중앙에 올 수 있도록 함 */}
        <div className="flex-shrink-0 w-[15%] md:w-[25%]"></div>

        {children}

        {/* 슬라이더 내부에 여백을 추가하여 첫 번째와 마지막 아이템이 중앙에 올 수 있도록 함 */}
        <div className="flex-shrink-0 w-[15%] md:w-[25%]"></div>
      </div>
    </div>
  )
}

// SliderItem 컴포넌트
interface SliderItemProps {
  children: ReactNode
  className?: string
  href?: string
  title?: string
}

function SliderItem({ children, className, href, title }: SliderItemProps) {
  const hoverClass = href ? 'hover:scale-[1.02]' : ''
  const { currentIndex } = useDemoShowcase()
  const itemRef = useRef<HTMLDivElement>(null)
  const [isCenter, setIsCenter] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // 컴포넌트가 마운트되면 로드 상태를 true로 설정
  useEffect(() => {
    // 클라이언트 사이드 렌더링 시 크기 변동을 방지하기 위해 약간의 지연 후 로드 상태 변경
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  // Check if this item is in the center of the viewport - 성능 최적화를 위해 throttle 적용
  useEffect(() => {
    const checkIfCenter = () => {
      if (!itemRef.current) return

      const rect = itemRef.current.getBoundingClientRect()
      const viewportCenter = window.innerWidth / 2
      const itemCenter = rect.left + rect.width / 2
      const isInCenter = Math.abs(viewportCenter - itemCenter) < rect.width / 3

      if (isCenter !== isInCenter) {
        setIsCenter(isInCenter)
      }
    }

    // 성능 최적화를 위한 throttle 함수
    let throttleTimeout: ReturnType<typeof setTimeout> | null = null
    const throttledCheckIfCenter = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          checkIfCenter()
          throttleTimeout = null
        }, 100) // 100ms 간격으로 제한
      }
    }

    checkIfCenter()
    window.addEventListener('scroll', throttledCheckIfCenter, { passive: true })
    window.addEventListener('resize', throttledCheckIfCenter, { passive: true })

    return () => {
      if (throttleTimeout) clearTimeout(throttleTimeout)
      window.removeEventListener('scroll', throttledCheckIfCenter)
      window.removeEventListener('resize', throttledCheckIfCenter)
    }
  }, [currentIndex, isCenter])

  // 명시적인 너비와 높이 (9:16 비율)
  // const width = 900
  const height = 1600

  const content = (
    <div
      className={cn(
        'relative aspect-[9/16] bg-card rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-300',
        'border border-gray-100 dark:border-gray-800',
        'phone-mockup', // Custom class for phone-like appearance
        hoverClass,
        !isCenter &&
          'after:absolute after:inset-0 after:bg-black/20 after:z-10',
      )}
      style={{
        minHeight: isLoaded ? 'auto' : `${height / 4}px`, // 로드 전 최소 높이 설정
      }}
      role="figure"
      aria-label={title || '데모 이미지'}
    >
      {children}
    </div>
  )

  return (
    <article
      ref={itemRef}
      className={cn(
        'flex-shrink-0 w-[70%] sm:w-[60%] md:w-[45%] lg:w-[35%] px-4 snap-center',
        'transition-all duration-300',
        className,
      )}
      aria-hidden={!isCenter}
      tabIndex={isCenter ? 0 : -1}
    >
      {href ? (
        <a
          href={href}
          className="block"
          aria-label={title || '데모 상세 보기'}
          tabIndex={isCenter ? 0 : -1}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </article>
  )
}

// Image 컴포넌트
interface ImageProps {
  src: string
  alt: string
  className?: string
  sizes?: string
}

function Image({ src, alt, className, sizes = '100vw' }: ImageProps) {
  // 이미지 경로에서 확장자 추출
  const extension = src.split('.').pop() || 'png'
  // 확장자를 제외한 기본 경로
  const basePath = src.substring(0, src.lastIndexOf('.'))

  // 이미지 비율 유지를 위한 기본 너비와 높이 (9:16 비율)
  const width = 900
  const height = 1600

  return (
    <picture>
      {/* WebP 포맷 지원 */}
      <source
        srcSet={`${basePath}-small.webp 640w, ${basePath}-medium.webp 1280w, ${basePath}.webp 1920w`}
        sizes={sizes}
        type="image/webp"
      />
      {/* 원본 포맷 (PNG/JPG) 대체 */}
      <source
        srcSet={`${basePath}-small.${extension} 640w, ${basePath}-medium.${extension} 1280w, ${basePath}.${extension} 1920w`}
        sizes={sizes}
        type={`image/${extension === 'jpg' ? 'jpeg' : extension}`}
      />
      {/* 대체 이미지 - 명시적 width와 height 속성 추가 */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn('w-full h-full object-cover', className)}
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}

// Video 컴포넌트
interface VideoProps {
  src: string
  className?: string
  title?: string
  ariaLabel?: string
  poster?: string
}

function Video({ src, className, title, ariaLabel, poster }: VideoProps) {
  // 비디오 비율 유지를 위한 기본 너비와 높이 (9:16 비율)
  const width = 900
  const height = 1600

  return (
    <div className="video-container relative w-full h-full">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        width={width}
        height={height}
        className={cn('w-full h-full object-cover', className)}
        title={title || '데모 영상'}
        aria-label={ariaLabel || '제품 데모 영상'}
        poster={poster}
        disablePictureInPicture
        controlsList="nodownload"
      >
        <track kind="captions" src="" label="한국어" />
        <p>
          브라우저가 비디오 태그를 지원하지 않습니다.
          <a href={src} download>
            비디오 다운로드
          </a>
        </p>
      </video>
    </div>
  )
}

// Indicators 컴포넌트
interface IndicatorsProps {
  className?: string
  labelledBy?: string
  role?: string
  'aria-label'?: string
}

function Indicators({
  className,
  labelledBy,
  role = 'tablist',
  'aria-label': ariaLabel = '슬라이드 페이지네이션',
}: IndicatorsProps) {
  const { currentIndex, goToSlide, itemsCount } = useDemoShowcase()

  return (
    <div
      className={cn('flex justify-center mt-6 space-x-2', className)}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={labelledBy}
    >
      {Array.from({ length: itemsCount }).map((_, index) => {
        const isActive = currentIndex === index
        return (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              isActive
                ? 'bg-primary scale-125'
                : 'bg-muted hover:bg-primary/50',
            )}
            aria-label={`${index + 1}번 슬라이드로 이동`}
            aria-selected={isActive}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            type="button"
          />
        )
      })}
    </div>
  )
}

// NavigationButtons 컴포넌트
interface NavigationButtonsProps {
  className?: string
  'aria-label'?: string
}

function NavigationButtons({
  className,
  'aria-label': ariaLabel = '슬라이더 탐색',
}: NavigationButtonsProps) {
  const { currentIndex, goToSlide, itemsCount } = useDemoShowcase()

  // 이전 슬라이드 인덱스 계산
  const prevIndex = (currentIndex - 1 + itemsCount) % itemsCount
  // 다음 슬라이드 인덱스 계산
  const nextIndex = (currentIndex + 1) % itemsCount

  return (
    <div className="slider-navigation" role="navigation" aria-label={ariaLabel}>
      <button
        onClick={() => goToSlide(prevIndex)}
        className={cn(
          'absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-md',
          'hover:bg-background/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'transition-colors transform hover:scale-105 active:scale-95',
          className,
        )}
        aria-label={`이전 슬라이드로 이동 (${prevIndex + 1}/${itemsCount})`}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide(nextIndex)}
        className={cn(
          'absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-md',
          'hover:bg-background/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'transition-colors transform hover:scale-105 active:scale-95',
          className,
        )}
        aria-label={`다음 슬라이드로 이동 (${nextIndex + 1}/${itemsCount})`}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}

// SliderItemSkeleton 컴포넌트
interface SliderItemSkeletonProps {
  className?: string
}

function SliderItemSkeleton({ className }: SliderItemSkeletonProps) {
  // 명시적인 너비와 높이 (9:16 비율) - SliderItem과 동일하게 유지
  // const width = 900
  const height = 1600

  return (
    <article
      className={cn(
        'flex-shrink-0 w-[70%] sm:w-[60%] md:w-[45%] lg:w-[35%] px-4 snap-center',
        'transition-all duration-300',
        className,
      )}
    >
      <div
        className={cn(
          'relative aspect-[9/16] bg-secondary/70 animate-pulse rounded-2xl overflow-hidden shadow-xl',
          'border border-gray-100 dark:border-gray-800',
          'phone-mockup', // Custom class for phone-like appearance
        )}
        style={{
          minHeight: `${height / 4}px`, // SliderItem과 동일한 최소 높이 설정
        }}
        role="figure"
        aria-label="로딩 중"
      />
    </article>
  )
}

// 하위 컴포넌트 연결
DemoShowcase.Header = Header
DemoShowcase.Slider = SliderKit
DemoShowcase.SliderItem = SliderItem
DemoShowcase.SliderItemSkeleton = SliderItemSkeleton
DemoShowcase.Image = Image
DemoShowcase.Video = Video
DemoShowcase.Indicators = Indicators
DemoShowcase.NavigationButtons = NavigationButtons
