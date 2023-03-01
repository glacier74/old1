import { Spin, notification } from '@heyforms/ui'
import clsx from 'clsx'
import { FC, useCallback, useState } from 'react'

import { useBuilderContext } from '~/layout/builder2/context'
import { PublicApiService } from '~/service'

import { useBlockContext } from './Block'
import { linkStyle } from './helper'

interface $PaymentProps extends ComponentProps {
  appearance?: 'filled' | 'outline'
  html: string
}

export const $Payment: FC<$PaymentProps> = ({
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
      alert('Payment is disabled in preview mode.')
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
      className={clsx('earlybird-payment', className)}
      onClick={handleClick}
      style={linkStyle(appearance, style)}
    >
      {loading ? <Spin /> : html}
    </button>
  )
}
