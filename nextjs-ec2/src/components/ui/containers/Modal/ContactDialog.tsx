import { Button } from '@/components/ui/Button/Button'
import Modal from '@/components/ui/containers/Modal/Modal'
import Form from '@/components/ui/input/Form'
import React, { JSX } from 'react'
import { FieldValues } from 'react-hook-form'

export default function ContactDialog({
  isOpen,
  onRequestClose,
}: {
  isOpen: boolean
  onRequestClose: () => void
}): JSX.Element {
  const handleSubmit = async (data: FieldValues): Promise<void> => {
    console.log(data)
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestCloseAction={onRequestClose}
      aria-labelledby="contact-dialog-title"
      role="dialog"
      className={'w-700px'}
    >
      <Modal.CloseButton onClick={onRequestClose} />
      <Modal.Body className={'w-full'}>
        <Modal.Title>
          문의하기
          <p className="text-muted-foreground mt-4 text-lg font-normal leading-relaxed">
            아래 양식을 작성하여 문의사항을 보내주세요.
          </p>
        </Modal.Title>
        <Form formId="contact" onSubmit={handleSubmit}>
          <Form.Fieldset>
            <Form.Field>
              <Form.Legend required className="text-lg font-medium mb-2">
                {'이름'}
              </Form.Legend>
              <Form.Input
                name="name"
                type="text"
                required
                className="text-base p-4 rounded-md"
                placeholder={'이름을 입력해 주세요'}
              />
            </Form.Field>
          </Form.Fieldset>

          <Form.Fieldset>
            <Form.Field>
              <Form.Legend className="text-lg font-medium mb-2">
                {'조직명'}
              </Form.Legend>
              <Form.Input
                name="organization"
                type="text"
                className="text-base p-4 rounded-md"
                placeholder={'조직명을 입력해 주세요 (선택사항)'}
              />
            </Form.Field>
          </Form.Fieldset>

          <Form.Fieldset>
            <Form.Field>
              <Form.Legend required className="text-lg font-medium mb-2">
                {'이메일'}
              </Form.Legend>
              <Form.Input
                name="email"
                type="email"
                required
                className="text-base p-4 rounded-md"
                placeholder={'이메일을 입력해 주세요'}
              />
            </Form.Field>
          </Form.Fieldset>

          <Form.Fieldset>
            <Form.Field>
              <Form.Legend required className="text-lg font-medium mb-2">
                문의 내용
              </Form.Legend>
              <Form.Textarea
                name="message"
                required
                className="text-base p-4 rounded-md"
                placeholder={'문의 내용을 입력해 주세요'}
              />
            </Form.Field>
          </Form.Fieldset>

          <div className="mt-4 flex justify-between">
            <div></div>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {'제출하기'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
