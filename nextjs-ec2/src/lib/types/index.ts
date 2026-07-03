import React, {
  InputHTMLAttributes,
  JSX,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

// ==========================================
// Base Types
// ==========================================

/**
 * Base interface for components that can be clicked
 */
export interface ClickableProps {
  onClick?: () => void
}

/**
 * Base interface for components that can have children
 */
export interface ChildrenProps {
  children?: ReactNode
}

/**
 * Base interface for components that can have a className
 */
export interface ClassNameProps {
  className?: string
}

/**
 * Base interface for components that can have both children and className
 */
export interface ParentProps extends ChildrenProps, ClassNameProps {}

/**
 * Base interface for components that can have children, className, and an HTML element type
 */
export type ComponentProps<
  T extends keyof React.JSX.IntrinsicElements = 'div',
> = ParentProps & {
  as?: keyof JSX.IntrinsicElements
  id?: string
} & React.JSX.IntrinsicElements[T]

/**
 * Base interface for UI components with common properties
 */
export interface UIComponentProps extends ParentProps {
  id?: string
  role?: string
  'aria-label'?: string
}

/**
 * Base interface for form components
 */
export interface FormComponentProps extends UIComponentProps {
  name: string
  required?: boolean
}

// Alias for backward compatibility
export type ClickProps = ClickableProps

// ==========================================
// Button Types
// ==========================================

export interface ButtonBaseProps extends UIComponentProps {
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
}

export interface AppDownloadButtonProps extends ButtonBaseProps {
  label: string
}

export interface ContentCardProps extends ParentProps {
  title: string
  icon?: ReactNode
}

export type FloatingButtonContextType = {
  activeButton: 'none' | 'contact' | 'share' | 'toc' | 'help'
  setActiveButton: (
    button: 'none' | 'contact' | 'share' | 'toc' | 'help',
  ) => void
  copied: 'none' | 'contact' | 'url'
  setCopied: (type: 'none' | 'contact' | 'url') => void
  headings: Array<{
    id: string
    text: string
    level: number
    element: HTMLElement
  }>
  activeId: string
  viewedIds: Set<string>
  isMobile: boolean
  scrollToHeading: (id: string) => void
  copyContactToClipboard: () => Promise<void>
  copyUrlToClipboard: () => Promise<void>
  shareOnTwitter: () => void
  shareOnFacebook: () => void
  githubLink: string
  linkedinLink: string
}

export interface ToggleButtonProps {
  type: 'toc' | 'contact' | 'share' | 'help'
  icon: React.ReactNode
  iconSize?: string
  ariaLabelOpen?: string
  ariaLabelClose?: string
}

export interface FloatingMenuProps extends ParentProps {
  type: 'contact' | 'share' | 'help' | 'toc'
  title: string
}

// ==========================================
// Form Types
// ==========================================

export type StepIndex = 1 | 2 | 3
export type StepTitle = '모집 내용' | '모집 조건' | '근무 조건'

export const STEP_BUTTONS: { index: StepIndex; title: StepTitle }[] = [
  { index: 1, title: '모집 내용' },
  { index: 2, title: '모집 조건' },
  { index: 3, title: '근무 조건' },
]

export interface FormCreateStepProp {
  step: StepIndex
}

export type FormInProgress = { step: StepIndex; isProgress: boolean }

export type NumberOfPositionsType = '00명 (인원미정)' | '직접입력' | number
export type GenderType = '성별무관' | '남성' | '여성'
export type EducationType = '학력무관' | '고등학교 졸업' | '대학교 졸업'
export type AgeType =
  | '20세 ~ 29세'
  | '30세 ~ 39세'
  | '40세 ~ 49세'
  | '50세 ~ 59세'
  | '60세 이상'
  | '직접입력'
  | string
export type PreferredType = '없음' | '직접입력' | string
export type WorkDaysType = '일' | '월' | '화' | '수' | '목' | '금' | '토'

export interface ImageUrl {
  /** 이미지 주소 */
  url: string
  /** 이미지 이름 */
  name: string
}

export interface FormStep1 {
  title: string
  description: string
  recruitmentStartDate: Date | string
  recruitmentEndDate: Date | string
  imageUrls: ImageUrl[]
}

export interface FormStep2 {
  numberOfPositions: NumberOfPositionsType
  gender: GenderType
  education: EducationType
  age: AgeType
  preferred: PreferredType
}

export interface FormStep3 {
  location: string
  workStartDate: Date | string
  workEndDate: Date | string
  workStartTime: string
  workEndTime: string
  workDays: WorkDaysType[]
  isNegotiableWorkDays: boolean
  hourlyWage: number
  isPublic: boolean
}

export interface EditingFormData extends FormStep1, FormStep2, FormStep3 {}

export type EditingFormDataTypes = keyof EditingFormData
export type EditingFormDataValues = EditingFormData[EditingFormDataTypes]

export type AlbatalkPropsType =
  | 'updatedAt'
  | 'createdAt'
  | 'commentCount'
  | 'likeCount'
  | 'imageUrl'
  | 'content'
  | 'title'
  | 'id'
  | 'isLiked'

export interface AnnoucementProps {
  createdAt: string
  recruitmentEndDate: string
  recruitmentStartDate: string
  isPublic: boolean
}

export interface ContactInfoProps {
  id: number
  title: string
  ownerId: number
  recruitmentEndDate: string
  recruitmentStartDate: string
  storePhoneNumber: string
  phoneNumber: string
}

export interface CurrentApplicationProps {
  ownerId: number
  applyCount: number
}

export interface ImageProps {
  imageUrls: string[] | string
}

export interface LocationProps {
  location: string
  storeName: string
}

export interface RequirementsProps {
  numberOfPositions: number
  preferred: string
  age: string
  education: string
  gender: string
}

export interface WorkScheduleProps {
  hourlyWage: number
  workEndDate: string
  workStartDate: string
  isNegotiableWorkDays: boolean
  workDays: string[]
  workEndTime: string
  workStartTime: string
}

export interface ApplicationProps {
  id: number
  applicantId: number
  name: string
  phoneNumber: string
  experienceMonths: number
  status: string
}

export const FORM_STATUS = {
  REJECTED: '거절',
  INTERVIEW_PENDING: '면접 대기',
  INTERVIEW_COMPLETED: '면접 완료',
  HIRED: '채용 완료',
} as const

export type FormStatusType = keyof typeof FORM_STATUS

export const FORM_STATUS_REVERSED = {
  거절: 'REJECTED',
  '면접 대기': 'INTERVIEW_PENDING',
  '면접 완료': 'INTERVIEW_COMPLETED',
  '채용 완료': 'HIRED',
} as const

export interface FormContextProps {
  formId: string
  onSubmit: (data: FieldValues) => void
  watch: UseFormWatch<FieldValues>
  getValues: UseFormGetValues<FieldValues>
  getFieldState: UseFormGetFieldState<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  errors: FieldErrors
  isValid: boolean
  isSubmitting: boolean
  reset: UseFormReset<any>
  register: UseFormRegister<FieldValues>
  setFocus: UseFormSetFocus<FieldValues>
}

export interface FormResetButtonProps extends ComponentProps<'button'> {
  onClick?: () => void
}

export interface FormSubmitButtonProps {
  children: ReactNode
  buttonStyle?: 'solid' | 'outline'
  color?: 'primary' | 'gray'
  isPending?: boolean
}

export interface FormProps extends ComponentProps<'form'> {
  formId: string
  onSubmit: SubmitHandler<FieldValues>
  initialValues?: Record<string, any>
  defaultValues?: any
}

export interface FieldProps extends ComponentProps {
  htmlFor?: string
  isInline?: boolean
  hidden?: boolean
}

export interface LegendProps extends ComponentProps {
  required?: boolean
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  type?: HTMLInputElement['type']
  required?: boolean
  minLength?: number
  maxLength?: number
  hookFormPattern?: {
    value: RegExp
    message: string
  }
  value?: any
  validate?: any
  initialValues?: string
  step?: number
  onClick?: (event?: any) => void
  workDaysValue?: WorkDaysType
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  required?: boolean
  minLength?: number
  maxLength?: number
  validate?: any
}

export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string
  required?: boolean
  options: { value: string; label: string }[]
  validate?: any
}

export interface ImageInputProps extends InputProps {
  onImageChange?: (file: File) => void
}

export interface AddressSearchProps {
  name: string
  placeholder?: string
  required?: boolean
}

export interface FormDetailsProps {
  updatedAt?: string
  createdAt?: string
  preferred?: string
  age?: string
  education?: string
  gender?: string
  numberOfPositions?: number
  isPublic?: boolean
  hourlyWage?: number
  workDays?: string[]
  workEndTime?: string
  workStartTime?: string
  workEndDate?: string
  workStartDate?: string
  location?: string
  imageUrls?: string[]
  recruitmentEndDate?: string
  recruitmentStartDate?: string
  description?: string
  title?: string
  ownerId?: number
  id?: number
  scrapCount?: number
  applyCount?: number
  isScrapped?: boolean
  phoneNumber?: string
  storePhoneNumber?: string
  storeName?: string
}

export type CombinedFormDetailsProps = FormDetailsProps &
  AnnoucementProps &
  WorkScheduleProps &
  ContactInfoProps & {
    location: string
  }

// ==========================================
// Layout Types
// ==========================================

export interface FooterLink {
  href: string
  label: string | ReactNode
}

export interface FooterSectionProps extends ParentProps {
  title: string | ReactNode
  links?: FooterLink[]
}

// ==========================================
// Modal Types
// ==========================================

export interface ModalProps extends UIComponentProps {
  isOpen: boolean
  onAfterOpen?: () => void
  onRequestCloseAction: () => void
}

export interface CloseButtonProps extends ClickableProps, ClassNameProps {}

export type ModalTitleProps = ComponentProps
export type ModalBodyProps = ComponentProps
export type ModalFooterProps = ComponentProps
export type ModalIconProps = ComponentProps

export interface Step1FormProps {
  formData: Record<string, any>
  onSubmit: (data: FieldValues) => void
}

export interface Step2FormProps {
  formData: Record<string, any>
  onSubmit: (data: FieldValues) => void
}

export interface Step3ConfirmationProps {
  formData: Record<string, any>
  onSubmit: () => void
}

// ==========================================
// Response Types
// ==========================================

export interface ErrorResponse {
  code: string
  message: string
}

export const HttpStatus = {
  UNAUTHORIZED: {
    code: '401',
    message: '인증 오류. 다시 로그인 해주세요.',
  },
  FORBIDDEN: {
    code: '403',
    message: '접근이 금지되었습니다.',
  },
  NOT_FOUND: {
    code: '404',
    message: '요청한 자원을 찾을 수 없습니다.',
  },
  INTERNAL_SERVER_ERROR: {
    code: '500',
    message: '서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
  DEFAULT: {
    code: '0',
    message: '문제가 발생했습니다. 다시 시도해 주세요.',
  },
} as const

export type HttpStatusType = keyof typeof HttpStatus

// ==========================================
// Skeleton Types
// ==========================================

export interface SkeletonProps extends ClassNameProps {
  width?: string | number
  height?: string | number
  circle?: boolean
  rounded?: boolean
}

export interface SkeletonTextProps extends ClassNameProps {
  lines?: number
}

// ==========================================
// General Types
// ==========================================

export interface HeaderProps extends UIComponentProps {
  title?: string
  description?: string
}

export type LayoutProps = Readonly<ChildrenProps>

export interface CustomMessage {
  title?: string
  message?: string
}
