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
  message?: string
}

export const $EmailCapture: FC<$EmailCaptureProps> = ({
  id,
  className,
  fullName,
  email: $email,
  button,
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
        await PublicApiService.createContact(productId, {
          blockId,
          settingId: id!,
          name: name!,
          email: email!
        })

        notification.success({
          title: message
        })
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
    <form className={clsx('earlybird-email-capture', className)} onSubmit={handleSubmit}>
      {fullName && (
        <input
          name="name"
          type="text"
          autoComplete="text"
          className="earlybird-email-capture__name-input"
          placeholder={fullName.placeholder || 'Your name'}
          required={true}
          style={inputStyle(fullName.style)}
          onChange={handleNameChange}
        />
      )}
      <input
        name="email"
        type="email"
        autoComplete="email"
        className="earlybird-email-capture_$email-input"
        placeholder={$email?.placeholder || 'Enter email address'}
        required={true}
        style={inputStyle($email?.style)}
        onChange={handleEmailChange}
      />
      <button
        type="submit"
        className="earlybird-email-capture__submit-button"
        style={linkStyle(button?.appearance || 'filled', button?.style)}
      >
        {loading ? <Spin /> : button?.text}
      </button>
    </form>
  )
}
