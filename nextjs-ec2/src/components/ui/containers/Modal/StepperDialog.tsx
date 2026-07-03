'use client'

import Modal from '@/components/ui/containers/Modal/Modal'
import Step1Form from '@/components/ui/containers/Modal/StepperModal/Step1Form'
import Step2Form from '@/components/ui/containers/Modal/StepperModal/Step2Form'
import Step3Confirmation from '@/components/ui/containers/Modal/StepperModal/Step3Confirmation'
import Stepper from '@/components/ui/containers/StepperKit'
import koMessages from '@/lib/constants/locales/ko.json'
import { ModalProps } from '@/lib/types'
import React, { useState } from 'react'
import { FieldValues } from 'react-hook-form'

export default function StepperDialog({
  isOpen,
  onRequestCloseAction,
}: ModalProps) {
  const stepperDialog = koMessages.StepperDialog

  const [formData, setFormData] = useState<Record<string, any>>({})

  const handleStepSubmit = (data: FieldValues): void => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleFinalSubmit = (): void => {
    console.log('최종 폼 데이터:', formData)
    onRequestCloseAction()
  }

  return (
    <Modal
      isOpen={isOpen}
      className={'w-[700px]'}
      onRequestCloseAction={onRequestCloseAction}
    >
      <Modal.CloseButton onClick={onRequestCloseAction} />

      <Modal.Body className={'w-full'}>
        <Modal.Title>
          {stepperDialog.title || '문의하기'}
          <p className="text-muted-foreground mt-4 text-lg font-normal leading-relaxed">
            {stepperDialog.description ||
              '아래 양식을 작성하여 문의사항을 보내주세요.'}
          </p>
        </Modal.Title>

        <Stepper>
          <Stepper.Step title={stepperDialog.step1.title || '문의 내용'}>
            <Stepper.Content step={0}>
              <Step2Form formData={formData} onSubmit={handleStepSubmit} />
            </Stepper.Content>
          </Stepper.Step>

          <Stepper.Step title={stepperDialog.step2.title || '기본 정보'}>
            <Stepper.Content step={1}>
              <Step1Form formData={formData} onSubmit={handleStepSubmit} />
            </Stepper.Content>
          </Stepper.Step>

          <Stepper.Step title={stepperDialog.step3.title || '확인'}>
            <Stepper.Content step={2}>
              <Step3Confirmation
                formData={formData}
                onSubmit={handleFinalSubmit}
              />
            </Stepper.Content>
          </Stepper.Step>
        </Stepper>
      </Modal.Body>
    </Modal>
  )
}
