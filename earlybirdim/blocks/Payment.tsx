import { Spin, notification, stopEvent } from '@heyforms/ui'
import clsx from 'clsx'
import { FC, MouseEvent, useCallback, useState } from 'react'

import { useBuilderContext } from '~/layout/builder2/context'
import { PublicApiService } from '~/service/public-api'

import { useBlockContext } from './Block'
import { linkStyle } from './helper'

interface $PaymentProps extends ComponentProps {
  appearance?: 'filled' | 'outline'
  paymentMethod: 'stripe' | 'link'
  paymentLinks?: string[]
  html: string
}

const $Stripe: FC<Omit<$PaymentProps, 'paymentMethod' | 'paymentLinks'>> = ({
  id,
  className,
  appearance = 'filled',
  html,
  style
}) => {
  const { state } = useBuilderContext()
  const { productId, blockId } = useBlockContext()

  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    if (state?.isBuilderMode) {
      return alert('Payment is disabled in preview mode.')
    }

    setLoading(true)

    try {
      const result = await PublicApiService.checkout(productId, {
        blockId,
        settingId: id!,
        productUrl: window.location.href
      })

      window.location.href = result.sessionUrl
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    setLoading(false)
  }, [])

  return (
    <button
      type="button"
      className={clsx(
        'earlybird-payment earlybird-submit-button',
        {
          'earlybird-submit-button-loading': loading
        },
        className
      )}
      onClick={handleClick}
      style={linkStyle(appearance, style)}
    >
      {loading && <Spin />}
      <span>{html}</span>
    </button>
  )
}

const $Link: FC<Omit<$PaymentProps, 'paymentMethod'>> = ({
  className,
  appearance = 'filled',
  html,
  paymentLinks = [],
  style
}) => {
  const { state } = useBuilderContext()

  function handleClick(event: MouseEvent) {
    if (state?.isBuilderMode) {
      stopEvent(event)
    }
  }

  return (
    <a
      className={clsx('earlybird-payment earlybird-submit-button', className)}
      href={paymentLinks[0]}
      style={linkStyle(appearance, style)}
      onClick={handleClick}
    >
      {html}
    </a>
  )
}

export const $Payment: FC<$PaymentProps> = ({ paymentMethod = 'stripe', ...restProps }) => {
  return paymentMethod === 'stripe' ? <$Stripe {...restProps} /> : <$Link {...restProps} />
}
