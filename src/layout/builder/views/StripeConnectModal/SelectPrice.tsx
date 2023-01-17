import { Button } from '@heyforms/ui'
import { IconCircleCheck } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, useCallback, useMemo, useState } from 'react'

import { PAYMENT_TYPES } from '~/constants'
import { StripeService } from '~/service'
import { currencyFormatter, useAsyncEffect } from '~/utils'

import { useBuilderContext } from '../../context'

interface SelectPriceItemProps {
  value?: string
  price: StripePrice
  onClick: (value: string) => void
}

const SelectPriceItem: FC<SelectPriceItemProps> = ({ value, price, onClick }) => {
  const { t } = useTranslation()
  const isActive = useMemo(() => value === price.id, [value, price.id])

  function handleClick() {
    onClick(price.id)
  }

  return (
    <div
      className={clsx(
        'bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer flex justify-between items-center focus:outline-none border-gray-300 undefined',
        {
          'ring-2 ring-green-500 border-transparent': isActive
        }
      )}
      onClick={handleClick}
    >
      <div className="flex-1">
        <div className="font-medium text-gray-900">
          {currencyFormatter(price.currency, price.unit_amount)}
        </div>
        <div className="text-gray-500">{t(PAYMENT_TYPES[price.type])}</div>
      </div>
      {isActive && <IconCircleCheck className="ml-4 w-5 h-5 text-green-500" />}
    </div>
  )
}

export const SelectPrice: FC = () => {
  const { state, dispatch } = useBuilderContext()
  const [priceId, setPriceId] = useState<string | undefined>(state.stripeConnectBlock!.priceId!)

  const handleClick = useCallback(
    (value: string) => setPriceId(value === priceId ? undefined : value),
    [priceId]
  )

  function handleBack() {
    dispatch({
      type: 'update',
      payload: {
        stripeConnectStep: 'product'
      }
    })
  }

  function handleFinish() {
    const price = state.stripeProduct?.prices?.find(p => p.id === priceId)

    if (price) {
      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: state.stripeConnectBlock!.id!,
          updates: {
            ...state.stripeConnectBlock,
            priceId,
            priceType: price.type,
            currency: price.currency,
            amount: price.unit_amount,
            interval: price.recurring?.interval
          }
        }
      })

      dispatch({
        type: 'update',
        payload: {
          stripeConnectBlock: undefined,
          stripeProduct: undefined,
          stripeConnectStep: undefined
        }
      })
    }
  }

  useAsyncEffect(async () => {
    if (!state.stripeProduct) {
      const stripeProduct = await StripeService.product(
        state.stripeConnectBlock!.productId!,
        state.stripeConnectBlock!.stripeAccount!
      )

      dispatch({
        type: 'update',
        payload: {
          stripeProduct
        }
      })
    }
  }, [state.stripeProduct])

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <div className="w-[32rem]">
        <div className="pt-20 flex items-center justify-between">
          <div>
            <div className="text-lg font-medium text-slate-900">
              {state.stripeConnectBlock?.productName}
            </div>
            <div className="mt-1 text-sm text-slate-400 line-clamp-2">
              {state.stripeConnectBlock?.productDescription}
            </div>
          </div>

          <Button.Link type="success" onClick={handleBack}>
            Not this product?
          </Button.Link>
        </div>

        <div className="mt-8 uppercase text-xs text-slate-300">Select the price</div>

        <div className="mt-2 w-full space-y-2">
          {state.stripeProduct?.prices.map(price => (
            <SelectPriceItem key={price.id} value={priceId} price={price} onClick={handleClick} />
          ))}
        </div>

        <div className="flex justify-center pt-6 pb-12">
          <Button className="w-80" type="success" disabled={!priceId} onClick={handleFinish}>
            Complete
          </Button>
        </div>
      </div>
    </div>
  )
}
