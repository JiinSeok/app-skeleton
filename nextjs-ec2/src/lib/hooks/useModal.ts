import { useState } from 'react'

// 모달 프롭스 타입 정의
type ModalPropsValue = string | number | boolean | object | null | undefined

// 모달 상태 인터페이스
interface ModalState {
  modalName: string | null
  modalProps?: Record<string, ModalPropsValue> | null
}

// 모달 훅 반환 타입
interface UseModalReturn {
  modalName: string | null
  modalProps: Record<string, ModalPropsValue> | null | undefined
  openModal: (
    modalName: string,
    modalProps?: Record<string, ModalPropsValue>,
  ) => void
  closeModal: () => void
}

export function useModal(): UseModalReturn {
  const [modalState, setModalState] = useState<ModalState>({
    modalName: null,
    modalProps: null,
  })

  const openModal = (
    modalName: string,
    modalProps: Record<string, ModalPropsValue> = {},
  ): void => {
    setModalState({ modalName, modalProps })
  }

  const closeModal = (): void => {
    setModalState({ modalName: null, modalProps: null })
  }

  return {
    modalName: modalState.modalName,
    modalProps: modalState.modalProps,
    openModal,
    closeModal,
  }
}
