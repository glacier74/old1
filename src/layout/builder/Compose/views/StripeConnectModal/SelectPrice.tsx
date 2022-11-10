import { Button } from '@heyforms/ui'
import { IconCircleCheck } from '@tabler/icons'
import clsx from 'clsx'
import { FC, useCallback, useMemo, useState } from 'react'

import { StripeService } from '~/service'
import { useAsyncEffect } from '~/utils'

import { useComposeStore } from '../../store'

interface SelectPriceItemProps {
  value?: string
  price: StripePrice
  onClick: (value: string) => void
}

const SelectPriceItem: FC<SelectPriceItemProps> = ({ value, price, onClick }) => {
  const isActive = useMemo(() => value === price.id, [value, price.id])
  const isDisabled = useMemo(() => price.type !== 'one_time', [price.type])

  function handleClick() {
    if (!isDisabled) {
      onClick(price.id)
    }
  }

  return (
    <div
      className={clsx('stripe-price-item flex items-center rounded-sm bg-slate-100', {
        'stripe-price-item-active': isActive,
        'stripe-price-disabled': isDisabled
      })}
      onClick={handleClick}
    >
      <div className="flex-1">
        <p className="text-lg font-medium">
          {price.currency}
          {price.unit_amount}
        </p>
        <p>{price.type}</p>
        {price.type !== 'one_time' && (
          <p className="text-red-700 text-xs">At present, only one-time price is supported</p>
        )}
      </div>

      {isActive && <IconCircleCheck className="ml-4 w-5 h-5 text-blue-500" />}
    </div>
  )
}

export const SelectPrice: FC = () => {
  const { state, dispatch } = useComposeStore()
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
            currency: price.currency,
            amount: price.unit_amount
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
    <div className="stripe-connect-modal-select-price">
      <div className="flex items-center justify-between">
        <p>Select the price of {state.stripeProduct?.name}</p>
        <Button.Link type="primary" onClick={handleBack}>
          Not this product?
        </Button.Link>
      </div>

      <div className="space-y-2">
        {state.stripeProduct?.prices.map(price => (
          <SelectPriceItem key={price.id} value={priceId} price={price} onClick={handleClick} />
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button className="w-80" type="primary" disabled={!priceId} onClick={handleFinish}>
          Complete
        </Button>
      </div>
    </div>
  )
}
