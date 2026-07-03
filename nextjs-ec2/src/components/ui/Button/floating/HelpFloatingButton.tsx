'use client'

import StepperDialog from '@/components/ui/containers/Modal/StepperDialog'
import { useModal } from '@/lib/hooks/useModal'
import { HelpCircle, MessageCircle } from 'lucide-react'
import { JSX } from 'react'
/**
 * HelpFloatingButton 컴포넌트
 *
 * 화면 우측 하단에 고정된 도움말 플로팅 버튼을 제공합니다.
 * 전화 문의, 이메일 문의, 자주 묻는 질문 등의 도움말 옵션을 포함합니다.
 * 버튼 설정 배열을 사용하여 동적으로 버튼을 생성합니다.
 */
import FloatingButtonGroup, { ButtonConfig } from './FloatingButtonGroup'

export default function HelpFloatingButton(): JSX.Element {
  const { modalName, closeModal, openModal } = useModal()
  // const homePage = koMessage.HomePage

  // 버튼 설정 배열 정의
  const helpButtons: ButtonConfig[] = [
    // {
    //   icon: <Phone size={18} aria-hidden="true" />,
    //   text: '전화 문의하기',
    //   onClick: () => window.open('tel:+82-10-1234-5678'),
    //   ariaLabel: '전화 문의하기',
    // },
    {
      icon: <MessageCircle size={18} aria-hidden="true" />,
      text: '이메일',
      onClick: () => window.open('mailto:admin@intellifam.com'),
      ariaLabel: '문의하기',
    },
    {
      icon: <HelpCircle size={18} aria-hidden="true" />,
      text: '문의하기',
      onClick: () => openModal('contactDialog'),
      ariaLabel: '자주 묻는 질문',
    },
  ]

  return (
    <>
      <StepperDialog
        isOpen={modalName === 'contactDialog'}
        onRequestCloseAction={closeModal}
        aria-labelledby="contact-dialog-title"
        role="dialog"
      />
      <FloatingButtonGroup
        mainIcon={<HelpCircle aria-hidden="true" />}
        buttons={helpButtons}
        title="도움이 필요하신가요?"
        mainAriaLabel="도움말 메뉴 열기"
      />
      {/*<Button*/}
      {/*  onClick={}*/}
      {/*  className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-6 py-3 rounded-md"*/}
      {/*>*/}
      {/*  {homePage.header.nav.contact}*/}
      {/*</Button>*/}
      {/* 문의하기 다이얼로그 */}
    </>
  )
}
