import clsx from 'clsx'
import { FC } from 'react'

import { linkStyle } from './helper'

interface $PaymentProps extends ComponentProps {
  appearance?: 'filled' | 'outline'
  html: string
}

export const $Payment: FC<$PaymentProps> = ({
  className,
  appearance = 'filled',
  html,
  style,
  ...restProps
}) => {
  function handleClick() {
    alert('Payment is disabled in preview mode.')
  }

  return (
    <button
      className={clsx('earlybird-payment', className)}
      onClick={handleClick}
      style={linkStyle(appearance, style)}
      {...restProps}
    >
      {html}
    </button>
  )
}
