import { IconCheck } from '@tabler/icons'
import party from 'party-js'
import RCForm from 'rc-field-form'
import { FC, useCallback, useEffect, useMemo, useReducer, useState } from 'react'

import { PublicApiService } from '~/service/public-api'
import { urlBuilder } from '~/utils'

import { useGlobalContext } from '../GlobalContext'
import { getRecaptchaToken } from '../utils'
import { FormContext, FormReducer, useFormContext } from './Context'
import FormButton from './FormButton'
import FormInput from './FormInput'
import FormItem from './FormItem'
import { FormProps } from './FormProps'
import FormTextarea from './FormTextarea'

interface FormSuccessProps {
  successMessage: string
  onClose: () => void
}

export const FormSuccess: FC<FormSuccessProps> = ({ successMessage, onClose }) => {
  useEffect(() => {
    party.confetti(document.querySelector('.payment-success-party')! as HTMLElement, {
      count: party.variation.range(20, 40)
    })
  }, [])

  return (
    <div className="fixed inset-0 z-[98] flex h-screen w-screen items-center p-5">
      <div className="payment-success-party absolute inset-0 z-[99] bg-black/20"></div>
      <div className="relative z-[100] mx-auto w-full max-w-[600px] rounded-2xl bg-white px-8 py-12 shadow-2xl">
        <div className="flex justify-center">
          <div className="bg-emerald-600 flex items-center justify-center w-[60px] h-[60px] rounded-full">
            <IconCheck className="text-white w-[32px] h-[32px]" />
          </div>
        </div>
        <div className="mt-8 text-lg text-slate-800 font-medium text-center">
          {successMessage || 'You have successfully submitted'}
        </div>
        <div className="text-center mt-8">
          <button
            className="inline-block px-5 py-1.5 text-emerald-600 border border-emerald-600 rounded-[999px]"
            onClick={onClose}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

const InternalForm: FC<FormProps> = ({
  id,
  type,
  successMessage,
  blockId,
  emailNotificationSubject,
  emailNotificationMessage,
  enableEmailNotification,
  paymentMethod,
  paymentLink,
  priceId,
  stripeAccount,
  stripeEmail,
  children,
  onSubmitted,
  ...restProps
}) => {
  const { state, dispatch } = useFormContext()
  const { isPreview, productId } = useGlobalContext()
  const [error, setError] = useState<string>()
  const [isSubmitted, setSubmitted] = useState(false)

  const handleFinish = useCallback(
    async (values: any) => {
      if (isPreview) {
        return alert('The form is in preview mode and cannot be submitted.')
      }

      if (state.loading) {
        return
      }

      setError(undefined)
      dispatch({
        type: 'setLoading',
        payload: true
      })

      try {
        if (type === 'payment') {
          if (paymentMethod === 'link') {
            return (window.location.href = paymentLink)
          }

          const result = await PublicApiService.checkout(productId, {
            blockId: id || blockId,
            productUrl: urlBuilder(window.location.href, {
              successMessage
            }),
            emailCapture: values
          })

          window.location.href = result.sessionUrl
        } else if (type === 'contact') {
          await PublicApiService.createContact(productId, {
            blockId: id || blockId,
            token: await getRecaptchaToken(),
            ...values
          })

          setSubmitted(true)
          onSubmitted?.()
        } else {
          await PublicApiService.createEmailCapture(productId, {
            blockId: id || blockId,
            token: await getRecaptchaToken(),
            ...values
          })

          setSubmitted(true)
          onSubmitted?.()
        }
      } catch (err) {
        setError((err as Error).message)
      }

      dispatch({
        type: 'setLoading',
        payload: false
      })
    },
    [isPreview, state.loading, type, successMessage, productId, blockId]
  )

  function handleClose() {
    setSubmitted(false)
  }

  return (
    <>
      <RCForm onFinish={handleFinish} {...restProps}>
        {children}
      </RCForm>
      {type !== 'payment' && (
        <div className="earlybird-recaptcha mt-2 text-xs text-[10px] text-slate-400">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
          <a href="https://policies.google.com/terms">Terms of Service</a> apply.
        </div>
      )}
      {error && <div className="mt-1 text-red-500 text-sm">{error}</div>}
      {isSubmitted && <FormSuccess successMessage={successMessage} onClose={handleClose} />}
    </>
  )
}

const Form: FC<FormProps> = ({ children, ...restProps }) => {
  const [state, dispatch] = useReducer(FormReducer, {
    loading: false
  })
  const value = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state]
  )

  return (
    <FormContext.Provider value={value}>
      <InternalForm {...restProps}>{children}</InternalForm>
    </FormContext.Provider>
  )
}

export default Object.assign(Form, {
  Item: FormItem,
  Input: FormInput,
  Textarea: FormTextarea,
  Button: FormButton
})
