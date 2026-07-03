'use client'

import { Button } from '@/components/ui/Button/Button'
import Modal, { ModalProps } from '@/components/ui/containers/Modal/Modal'
import Form from '@/components/ui/input/Form'
import { cn } from '@/lib/utils/classnames'
import { FieldValues } from 'react-hook-form'

export default function FormModal({
  isOpen,
  onRequestCloseAction,
}: ModalProps) {
  const handleSubmit = async (data: FieldValues): Promise<void> => {
    console.log(data)
    onRequestCloseAction()
  }

  return (
    <Modal isOpen={isOpen} onRequestCloseAction={onRequestCloseAction}>
      <Modal.CloseButton onClick={onRequestCloseAction} />

      <Modal.Icon>
        <span className="text-3xl text-blue-500">✏️</span>
      </Modal.Icon>

      <Form
        formId={`$Update`}
        onSubmit={handleSubmit}
        className={cn('w-full max-w-md mx-auto')}
      >
        <Modal.Body>
          <div className="space-y-6">
            <Modal.Title>서비스 이용 사전 등록</Modal.Title>

            <Form.Fieldset className="mb-1">
              <Form.Field>
                <Form.Legend>서비스 이용 조직</Form.Legend>
                <Form.Input
                  name="storeName"
                  type="text"
                  // required
                  placeholder="조직 이름을 입력해 주세요."
                  className="focus:ring-2 focus:ring-blue-200"
                />
              </Form.Field>
            </Form.Fieldset>

            <Form.Fieldset className="mb-1">
              <Form.Field>
                <Form.Legend>조직 규모</Form.Legend>
                <Form.Input
                  name="organizationSize"
                  type="text"
                  placeholder="문의하시는 조직의 규모를 입력해 주세요."
                  className="focus:ring-2 focus:ring-blue-200"
                />
              </Form.Field>
            </Form.Fieldset>

            <Form.Fieldset className="mb-1">
              <Form.Field>
                <Form.Legend required>연락 받으실 이메일</Form.Legend>
                <Form.Input
                  name="email"
                  type="email"
                  required
                  placeholder="조직 이메일을 입력해 주세요."
                  className="focus:ring-2 focus:ring-blue-200"
                />
              </Form.Field>
            </Form.Fieldset>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Form.SubmitButton>등록 요청</Form.SubmitButton>
          <Button
            className="py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
            type="button"
            variant="outline"
            size="lg"
            onClick={onRequestCloseAction}
          >
            취소
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
