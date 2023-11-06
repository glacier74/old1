import { Button, Input, notification } from '@heyforms/ui'
import { IconArrowUpRight } from '@tabler/icons'
import { FC, useCallback, useState } from 'react'

import { StripeService } from '~/service'
import { useRequest, useWindow } from '~/utils'

import { useOptions } from '../context'
import { OptionProps } from './OptionGroup'

export const StripeOption: FC<OptionProps> = ({ parentName, schema }) => {
  const { value, update } = useOptions<any>([parentName, schema.name].filter(Boolean).join('.'))
  const [loading, setLoading] = useState(false)

  const authorize = useRequest(async () => {
    const { authorizeUrl } = await StripeService.authorizeUrl()

    setLoading(true)
    openWindow(authorizeUrl, 'scrollbars=yes, resizable=yes, width=1120, height=720')
  }, [])

  const connect = useCallback(
    async (stateQuery: string, code: string) => {
      try {
        const result = await StripeService.connect(stateQuery, code)

        update({
          ...value,
          stripeAccount: result.accountId,
          stripeEmail: result.email
        })
      } catch (err: any) {
        notification.error({
          title: err.message
        })
      }

      setLoading(false)
    },
    [update, value]
  )

  const openWindow = useWindow(
    'EARLYBIRD_STRIPE_CONNECT',
    async (win, payload) => {
      win.close()

      if (payload.error) {
        setLoading(false)
        notification.error({
          title: `Failed to connect with stripe: ${payload.error_description}`
        })
      }

      await connect(payload.state, payload.code)
    },
    () => {
      setLoading(false)
    }
  )

  const handlePriceIdChange = useCallback(
    (priceId: string) => {
      update({
        ...value,
        priceId
      })
    },
    [update, value]
  )

  return (
    <div className="builder-option">
      {!value?.stripeAccount ? (
        <div className="flex items-center justify-between">
          <div className="builder-option__title">{schema.title}</div>

          <Button
            className="!px-2.5 !py-[5px] !border-gray-200"
            trailing={<IconArrowUpRight className="w-5 h-5" />}
            loading={loading}
            onClick={authorize.request}
          >
            Connect
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <div className="builder-option__title">{schema.title}</div>

            <div className="text-xs text-slate-700">
              Connected with:{' '}
              <span className="font-medium">{value?.stripeEmail || value?.stripeAccount}</span>
            </div>
          </div>

          <div className="builder-option__content">
            <div className="mt-1 text-[12px] text-slate-500">
              Go to{' '}
              <a
                className="text-[#10b981] underline"
                href="https://dashboard.stripe.com/products/create"
                target="_blank"
                rel="noreferrer"
              >
                Stripe dashboard
              </a>{' '}
              and create a product. Once you have created the product, copy and paste the price ID
              (e.g. <span className="font-medium underline">price_0MlwwsKRmsNyao</span>) here.
            </div>
            <div className="mt-2">
              <Input
                className="w-full !px-2 !py-[0.34rem]"
                value={value?.priceId}
                placeholder="e.g. price_0MlwwsKRmsNyao"
                onChange={handlePriceIdChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
