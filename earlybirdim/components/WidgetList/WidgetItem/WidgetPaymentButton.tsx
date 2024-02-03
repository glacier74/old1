import { useGlobalContext } from '@earlybirdim/components'
import { Loader, notification } from '@heyforms/ui'
import clsx from 'clsx'
import { FC, useState } from 'react'

import { PublicApiService } from '~/service/public-api'
import { urlBuilder } from '~/utils'

import { WidgetPaymentButtonProps, WidgetPaymentTextProps } from '../WidgetProps'

export const WidgetPaymentButton: FC<WidgetPaymentButtonProps> = ({
  className,
  config,
  onLoading
}) => {
  const { isPreview, productId } = useGlobalContext()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (isPreview) {
      return alert('The payment is currently in preview mode and cannot be completed.')
    }

    setLoading(true)
    onLoading(true)

    try {
      const result = await PublicApiService.checkout(productId, {
        blockId: config.id,
        productUrl: urlBuilder(window.location.href, {
          successMessage: config.data?.successMessage
        })
      })

      setLoading(false)
      onLoading(false)

      window.location.href = result.sessionUrl
    } catch (err) {
      setLoading(false)
      onLoading(false)

      notification.error({
        title: (err as Error).message
      })
    }
  }

  return (
    <button
      className={clsx('absolute inset-0', className)}
      aria-label={config.data?.buttonText}
      disabled={loading}
      onClick={handleClick}
    />
  )
}

export const WidgetPaymentText: FC<WidgetPaymentTextProps> = ({ text, loading }) => {
  return (
    <div className="relative inline-flex items-center rounded-full bg-[var(--jingle-widget-follow-background)] px-4 py-1.5 text-center text-xs font-medium text-[var(--jingle-widget-follow-text)] hover:bg-[var(--jingle-widget-follow-background-hover)] active:bg-[var(--jingle-widget-follow-background-active)]">
      {text}

      {loading && (
        <div className="absolute inset-0 rounded-full flex items-center justify-center bg-[var(--jingle-widget-follow-background)]">
          <Loader />
        </div>
      )}
    </div>
  )
}
