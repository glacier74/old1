import clsx from 'clsx'
import { FC, FormEvent } from 'react'

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
}

export const $EmailCapture: FC<$EmailCaptureProps> = ({
  className,
  fullName,
  email,
  button,
  children: _children,
  style: _style,
  ...restProps
}) => {
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    alert('The form is in preview mode and cannot be submitted.')
  }

  return (
    <form
      className={clsx('earlybird-email-capture', className)}
      onSubmit={handleSubmit}
      {...restProps}
    >
      {fullName && (
        <input
          name="name"
          type="text"
          autoComplete="text"
          className="earlybird-email-capture__name-input"
          placeholder={fullName.placeholder || 'Your name'}
          required={true}
          style={inputStyle(fullName.style)}
        />
      )}
      <input
        name="email"
        type="email"
        autoComplete="email"
        className="earlybird-email-capture__email-input"
        placeholder={email?.placeholder || 'Enter email address'}
        required={true}
        style={inputStyle(email?.style)}
      />
      <button
        type="submit"
        className="earlybird-email-capture__submit-button"
        style={linkStyle(button?.appearance || 'filled', button?.style)}
      >
        {button?.text}
      </button>
    </form>
  )
}
