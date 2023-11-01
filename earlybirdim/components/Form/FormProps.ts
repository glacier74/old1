export interface FormState {
  loading: boolean
  errorMessage?: string
}

export interface FormProps extends ComponentProps {
  id: string
  type: 'email_capture' | 'contact' | 'payment'
  successMessage: string
  blockId: string
  // Automated email
  emailNotificationSubject: string
  emailNotificationMessage: string
  enableEmailNotification: boolean
  // Stripe
  priceId: string
  stripeAccount: string
  stripeEmail: string
}

export interface FormItemProps extends ComponentProps {
  name: string
  required?: boolean
  errorRender?: (errorMessage: string) => JSX.Element
  errorMessage?: string
}

export interface FormInputProps extends ComponentProps {
  type: 'text' | 'email'
  value?: string
  onChange?: (value?: string) => void
}

export interface FormTextareaProps extends ComponentProps {
  rows?: number
  value?: string
  onChange?: (value?: string) => void
}

export interface FormButtonProps extends Omit<ComponentProps, 'children'> {
  rootClassName?: string
  children: JSX.Element
}
