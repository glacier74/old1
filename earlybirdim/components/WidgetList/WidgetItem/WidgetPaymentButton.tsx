import { useGlobalContext } from '@earlybirdim/components'
import { Loader, notification } from '@heyforms/ui'
import clsx from 'clsx'
import { FC, useState } from 'react'

import { PublicApiService } from '~/service/public-api'
import { urlBuilder } from '~/utils'

import { WidgetPaymentButtonProps } from '../WidgetProps'

export const WidgetPaymentButton: FC<WidgetPaymentButtonProps> = ({ className, config }) => {
  const { isPreview, productId } = useGlobalContext()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (isPreview) {
      return alert('The payment is currently in preview mode and cannot be completed.')
    }

    setLoading(true)

    try {
      const result = await PublicApiService.checkout(productId, {
        blockId: config.id,
        productUrl: urlBuilder(window.location.href, {
          successMessage: config.data?.successMessage
        })
      })

      setLoading(false)
      window.location.href = result.sessionUrl
    } catch (err) {
      setLoading(false)
      notification.error({
        title: (err as Error).message
      })
    }
  }

  return (
    <button
      className={clsx(
        'relative inline-flex items-center gap-1 rounded-full border border-[var(--widget-follow-border)] bg-[var(--widget-follow-bg)] px-4 py-1.5 text-center text-xs font-medium text-[var(--widget-follow-text)] hover:bg-[var(--widget-follow-bg-hover)] active:bg-[var(--widget-follow-bg-active)]',
        className
      )}
      disabled={loading}
      onClick={handleClick}
    >
      {config.data?.buttonText}

      {loading && (
        <span className="absolute inset-0 rounded-full flex items-center justify-center border border-[var(--widget-follow-border)] bg-[var(--widget-follow-bg)]">
          <Loader />
        </span>
      )}
    </button>
  )
}
