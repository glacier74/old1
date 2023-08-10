import { IconArrowLeft } from '@tabler/icons'
import party from 'party-js'
import RCForm from 'rc-field-form'
import { FC, useCallback, useEffect, useMemo, useReducer, useState } from 'react'

import { PublicApiService } from '~/service'
import { urlBuilder } from '~/utils'

import { useGlobalContext } from '../GlobalContext'
import { FormContext, FormReducer, useFormContext } from './Context'
import FormButton from './FormButton'
import FormInput from './FormInput'
import FormItem from './FormItem'
import { FormProps } from './FormProps'

const FormSuccess: FC<{ successMessage: string }> = ({ successMessage }) => {
  useEffect(() => {
    party.confetti(document.querySelector('.empty-states-icon')! as HTMLElement, {
      count: party.variation.range(20, 40)
    })
  }, [])

  return (
    <div className="fixed inset-0 bg-white empty-states payment-successful">
      <div className="empty-states-icon">
        <span className="font-[160px]">🎉</span>
      </div>
      <div className="mt-8 mb-6 text-2xl text-slate-800 mx-auto max-w-[40%]">
        {successMessage || 'You have successfully submitted'}
      </div>
      <div className="empty-states-action">
        <a href="/" className="link-button link-button-success flex items-center gap-2 !py-[10px]">
          <IconArrowLeft className="w-5 h-5 -ml-1.5" />
          <span>Back</span>
        </a>
      </div>
    </div>
  )
}

const InternalForm: FC<FormProps> = ({
  type,
  successMessage = 'You have successfully submitted',
  blockId,
  emailNotificationSubject,
  emailNotificationMessage,
  enableEmailNotification,
  priceId,
  stripeAccount,
  stripeEmail,
  children,
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
          const result = await PublicApiService.checkout(productId, {
            blockId,
            productUrl: urlBuilder(window.location.href, {
              successMessage
            }),
            emailCapture: values
          })

          window.location.href = result.sessionUrl
        } else {
          await PublicApiService.createContact(productId, {
            blockId,
            ...values
          })

          setSubmitted(true)
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

  return (
    <>
      <RCForm onFinish={handleFinish} {...restProps}>
        {children}
      </RCForm>
      {error && <div className="mt-1 text-red-500 text-sm">{error}</div>}
      {isSubmitted && <FormSuccess successMessage={successMessage} />}
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
  Button: FormButton
})
