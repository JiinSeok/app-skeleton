'use client'

/**
 * 앱 다운로드 버튼 컴포넌트
 *
 * 클라이언트 렌더링에 따라 href가 달라지는 앱 다운로드 버튼을 구현합니다.
 * PC OS(Windows, macOS, Linux)와 모바일 기기(iOS, Android)를 감지하여 적절한 스토어로 연결합니다.
 * - macOS 및 iOS 기기: App Store로 연결
 * - Windows, Linux 및 Android 기기: Google Play Store로 연결
 */
import { Button } from '@/components/ui/Button/Button'
import { useEffect, useState } from 'react'

interface AppDownloadButtonProps {
  label: string
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
}

export default function AppDownloadButton({
  label,
  className = 'bg-secondary text-secondary-foreground hover:bg-secondary/90 flex items-center gap-2',
  size = 'lg',
  variant = 'secondary',
}: AppDownloadButtonProps) {
  // 앱 스토어 URL 상태
  const [appStoreUrl, setAppStoreUrl] = useState(
    'https://play.google.com/store/apps/details?id=co.nexca.app',
  )

  // 클라이언트 사이드에서 디바이스 및 OS 감지
  useEffect(() => {
    const userAgent = navigator.userAgent

    // PC OS 감지 (Windows, macOS, Linux)
    const isWindows = /Windows/.test(userAgent)
    const isMac =
      /Macintosh/.test(userAgent) && !/iPhone|iPad|iPod/.test(userAgent)
    const isLinux = /Linux/.test(userAgent) && !/Android/.test(userAgent)
    const isPC = isWindows || isMac || isLinux

    // 모바일 기기 감지
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MediaStream
    const isAndroid = /Android/.test(userAgent)
    const isMobile = isIOS || isAndroid

    if (isPC) {
      // PC 환경에 따라 다른 URL 제공
      if (isMac) {
        setAppStoreUrl('https://apps.apple.com/app/nexca/id123456789')
      } else {
        // Windows 및 Linux 사용자를 위한 URL
        setAppStoreUrl(
          'https://play.google.com/store/apps/details?id=co.nexca.app',
        )
      }
    } else if (isMobile) {
      // 모바일 환경에 따라 다른 URL 제공
      if (isIOS) {
        setAppStoreUrl('https://apps.apple.com/app/nexca/id123456789')
      } else {
        setAppStoreUrl(
          'https://play.google.com/store/apps/details?id=co.nexca.app',
        )
      }
    } else {
      // 기타 환경에 대한 기본 URL
      setAppStoreUrl(
        'https://play.google.com/store/apps/details?id=co.nexca.app',
      )
    }
  }, [])

  return (
    <a
      href={appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <Button size={size} variant={variant} className={className}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-download"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        {label}
      </Button>
    </a>
  )
}
