import { Spin, notification, preventDefault } from '@heyforms/ui'
import clsx from 'clsx'
import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react'

import { useBuilderContext } from '~/layout/builder2/context'
import { PublicApiService } from '~/service'

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
  children: _children,
  style: _style
}) => {
  const { state } = useBuilderContext()
  const { productId, blockId } = useBlockContext()

  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      preventDefault(event)

      if (state?.isBuilderMode) {
        return alert('The form is in preview mode and cannot be submitted.')
      }

      setLoading(true)

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

          window.location.href = result.sessionUrl
        } else {
          await PublicApiService.createContact(productId, {
            blockId,
            settingId: id!,
            name: name!,
            email: email!
          })

          notification.success({
            title: message
          })
        }
      } catch (err: any) {
        notification.error({
          title: err.message
        })
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
    </form>
  )
}
