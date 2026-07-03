import Form from '@/components/ui/input/Form'
import koMessages from '@/lib/constants/locales/ko.json'
import React from 'react'
import { FieldValues } from 'react-hook-form'

// Step1Form 컴포넌트: 연락처 대화상자의 첫 번째 단계 (기본 정보)
interface Step1FormProps {
  formData: Record<string, any>
  onSubmit: (data: FieldValues) => void
}

export default function Step1Form({ formData, onSubmit }: Step1FormProps) {
  // JSON 직접 접근
  const stepperDialog = koMessages.StepperDialog

  return (
    <Form formId="contact-step1" onSubmit={onSubmit} defaultValues={formData}>
      <div className="space-y-6">
        {/* 이름 필드 */}
        <Form.Fieldset>
          <Form.Field>
            <Form.Legend required className="text-lg font-medium mb-2">
              {stepperDialog.step1.name || '이름'}
            </Form.Legend>
            <Form.Input
              name="name"
              type="text"
              required
              className="text-base p-4 rounded-md"
              placeholder={
                stepperDialog.step1.namePlaceholder || '이름을 입력해 주세요'
              }
            />
          </Form.Field>
        </Form.Fieldset>

        {/* 이메일 필드 */}
        <Form.Fieldset>
          <Form.Field>
            <Form.Legend required className="text-lg font-medium mb-2">
              {stepperDialog.step1.email || '이메일'}
            </Form.Legend>
            <Form.Input
              name="email"
              type="email"
              required
              className="text-base p-4 rounded-md"
              placeholder={
                stepperDialog.step1.emailPlaceholder || '이메일을 입력해 주세요'
              }
            />
          </Form.Field>
        </Form.Fieldset>

        {/* 조직명 필드 (선택사항) */}
        <Form.Fieldset>
          <Form.Field>
            <Form.Legend className="text-lg font-medium mb-2">
              {stepperDialog.step1.organization || '조직명'}
            </Form.Legend>
            <Form.Input
              name="organization"
              type="text"
              className="text-base p-4 rounded-md"
              placeholder={
                stepperDialog.step1.organizationPlaceholder ||
                '조직명을 입력해 주세요 (선택사항)'
              }
            />
          </Form.Field>
        </Form.Fieldset>
      </div>

      {/* 다음 버튼 */}
      <div className="mt-10 flex justify-between">
        <div></div>
        {/* 첫 단계에서는 이전 버튼이 없지만 레이아웃 일관성을 위해 공간 확보 */}
        {/*<Form.SubmitButton className="text-lg px-6 py-3 rounded-md">*/}
        {/*  {stepperDialog.next || '다음'}*/}
        {/*</Form.SubmitButton>*/}
      </div>
    </Form>
  )
}
