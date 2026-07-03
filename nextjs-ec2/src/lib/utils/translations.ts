import koMessages from '@/lib/constants/locales/ko.json'
import { createTranslator } from '@/lib/providers/TextContext'

// Create a translator function for the Korean messages
export const t = createTranslator(koMessages)

// You can also create namespace-specific translators
export const homePageT = createTranslator(koMessages.HomePage)
export const contactPageT = createTranslator(koMessages.ContactPage)
export const stepperDialogT = createTranslator(koMessages.StepperDialog)
