import { getRecaptchaToken } from '@earlybirdim/components/utils'
import { EmptyStates, Spin, preventDefault } from '@heyforms/ui'
import clsx from 'clsx'
import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react'

import { IconAlertCircleFilled } from '~/components'
import { useBuilderContext } from '~/layout/builder2/context'
import { PublicApiService } from '~/service/public-api'

import { useBlockContext } from './Block'
import { inputStyle, linkStyle } from './helper'

interface $EmailCaptureStyle {
  color?: string
  background?: string
  borderColor?: string
}

interface $EmailCaptureProps extends ComponentProps {
  isNameRequired?: boolean
  fullName?: {
    placeholder?: string
    style?: $EmailCaptureStyle
  }
  email?: {
    placeholder?: string
    style?: $EmailCaptureStyle
  }
  button?: {
    appearance?: 'filled' | 'outline'
    text?: string
    style?: $EmailCaptureStyle
  }
  isPaymentRequired?: boolean
  message?: string
  submessage?: string
}

export const $EmailCapture: FC<$EmailCaptureProps> = ({
  id,
  className,
  isNameRequired,
  fullName,
  email: $email,
  button,
  isPaymentRequired,
  message = 'You have successfully submitted',
  submessage,
  children: _children,
  style: _style
}) => {
  const { state } = useBuilderContext()
  const { productId, blockId } = useBlockContext()

  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setSubmitted] = useState(false)

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      preventDefault(event)

      if (state?.isBuilderMode) {
        return alert('The form is in preview mode and cannot be submitted.')
      }

      setLoading(true)
      setError(null)

      try {
        if (isPaymentRequired) {
          const result = await PublicApiService.checkout(productId, {
            blockId,
            settingId: id!,
            productUrl: window.location.href,
            emailCapture: {
              name: name!,
              email: email!
            }
          })

          setLoading(false)
          window.location.href = result.sessionUrl
        } else {
          await PublicApiService.createEmailCapture(productId, {
            blockId,
            settingId: id!,
            name: name!,
            email: email!,
            token: await getRecaptchaToken()
          })

          setSubmitted(true)
        }
      } catch (err: any) {
        setError(err.message)
      }

      setLoading(false)
    },
    [email, id, message, name, state?.isBuilderMode]
  )

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName((event.target as any).value)
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail((event.target as any).value)
  }

  return (
    <div
      className={clsx('earlybird-email-capture-container', {
        'earlybird-email-capture-submitted': isSubmitted
      })}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `#earlybird-email-capture-${id} .earlybird-email-capture__name-input::placeholder {
            color: ${fullName?.style?.color};
          }
          #earlybird-email-capture-${id} .earlybird-email-capture_email-input::placeholder {
            color: ${$email?.style?.color};
          };`
        }}
      />

      {isSubmitted ? (
        <EmptyStates
          className="email-capture-successful"
          title={message}
          description={submessage}
          icon={<img src="/static/party-popper.gif" width={160} height={160} />}
        />
      ) : (
        <form
          id={`earlybird-email-capture-${id}`}
          className={clsx('earlybird-email-capture', className)}
          onSubmit={handleSubmit}
        >
          {isNameRequired && (
            <input
              name="name"
              type="text"
              autoComplete="text"
              className="earlybird-email-capture__name-input"
              placeholder={fullName?.placeholder || 'Your name'}
              required={true}
              style={inputStyle(fullName?.style)}
              data-color={fullName?.style?.color}
              onChange={handleNameChange}
            />
          )}
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="earlybird-email-capture_email-input"
            placeholder={$email?.placeholder || 'Enter email address'}
            required={true}
            style={inputStyle($email?.style)}
            data-color={$email?.style?.color}
            onChange={handleEmailChange}
          />
          <button
            type="submit"
            className={clsx('earlybird-email-capture__submit-button earlybird-submit-button', {
              'earlybird-submit-button-loading': loading
            })}
            disabled={loading}
            style={linkStyle(button?.appearance || 'filled', button?.style)}
          >
            {loading && <Spin />}
            <span>{button?.text}</span>
          </button>
        </form>
      )}

      {!isPaymentRequired && (
        <div className="earlybird-recaptcha mt-2 text-xs text-[10px] text-slate-400">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
          <a href="https://policies.google.com/terms">Terms of Service</a> apply.
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center text-sm text-red-500">
          <IconAlertCircleFilled className="w-5 h-5" />
          <span className="ml-2">{error}</span>
        </div>
      )}
    </div>
  )
}
