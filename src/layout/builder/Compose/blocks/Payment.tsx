import { Button, Menus } from '@heyforms/ui'
import { FC } from 'react'

import { currencyFormatter } from '~/utils'

import { useComposeStore } from '../store'
import { stripeConnectStep } from '../utils'
import { Block, BlockProps } from './Block'
import { BlockWrapper } from './index'

interface PaymentProps extends Omit<BlockProps, 'enableCommand' | 'enableTextFormat'> {
  block: PaymentBlock
}

export const PaymentSettings: FC<Pick<PaymentProps, 'block'>> = ({ block }) => {
  const { dispatch } = useComposeStore()

  function handleClick() {
    dispatch({
      type: 'update',
      payload: {
        stripeConnectBlock: block,
        stripeConnectStep: stripeConnectStep(block)
      }
    })
  }

  return (
    <>
      <Menus.Label className="uppercase" label="Options" />
      <Menus.Item label="Payment settings" onClick={handleClick} />
      <Menus.Divider />
    </>
  )
}

const PaymentComponent: FC<PaymentProps> = ({ block, ...restProps }) => {
  const { dispatch } = useComposeStore()

  function handleClick() {
    dispatch({
      type: 'update',
      payload: {
        stripeConnectBlock: block,
        stripeConnectStep: stripeConnectStep(block)
      }
    })
  }

  return (
    <Block block={block} {...restProps}>
      <div className="flex items-start justify-between">
        <div className="w-96">
          {block.blocks.map(child => (
            <BlockWrapper
              key={child.id}
              block={child}
              enableAction={false}
              enableDropZone={false}
              enterBehavior={(child as any).enterBehavior}
            />
          ))}
        </div>
        <div className="w-96 rounded-lg bg-white overflow-hidden text-sm shadow">
          {block.priceId ? (
            <div className="p-6 cursor-default">
              <div className="text-lg font-medium text-slate-900">{block.productName}</div>
              <p className="mt-1 text-sm text-slate-600 line-clamp-2">{block.productDescription}</p>
              <div className="mt-4 text-base font-semibold text-slate-800">
                {currencyFormatter(block.currency, block.amount)}
              </div>
              <div className="input mt-6">
                <span className="text-slate-400">Enter your email address</span>
              </div>
              <div className="mt-4 px-4 py-2 shadow-sm font-medium bg-blue-700 rounded-md text-white text-center cursor-default">
                Buy now
              </div>
            </div>
          ) : (
            <div className="p-6">
              <p>Collect and receive payments directly on your bank account powered by Stripe.</p>
              <p className="mt-2">
                If you do not have a stripe account, you can create a free account with a valid
                email address and a bank account linked to an address.{' '}
                <a className="text-blue-700" href="https://stripe.com/connect" target="_blank">
                  Head over to Stripe
                </a>{' '}
                to find out more.
              </p>
              <Button className="mt-4" type="primary" block onClick={handleClick}>
                Connect with Stripe
              </Button>
            </div>
          )}
        </div>
      </div>
    </Block>
  )
}
export const Payment = PaymentComponent
