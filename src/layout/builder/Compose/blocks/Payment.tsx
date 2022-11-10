import { Button } from '@heyforms/ui'
import { FC } from 'react'

import { useComposeStore } from '../store'
import { stripeConnectStep } from '../utils'
import { Block, BlockProps } from './Block'
import { BlockWrapper } from './index'

interface PaymentProps extends Omit<BlockProps, 'enableCommand' | 'enableTextFormat'> {
  block: PaymentBlock
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
        <div className="w-96 p-5 bg-white shadow rounded">
          {block.priceId ? (
            <>
              <h3>{block.productName}</h3>
              <p>{block.productDescription}</p>
              <input type="text" />
              <Button type="primary" block>
                Buy now
              </Button>
            </>
          ) : (
            <>
              <p>
                Collect and receive payments directly on your bank account powered by{' '}
                <a href="https://stripe.com/connect" target="_blank">
                  Stripe
                </a>
                .
              </p>
              <p>
                Free EarlyBird users collect payments at the the rate of{' '}
                <strong>5% EarlyBird commission</strong> + <strong>Stripe transaction fee</strong>.
              </p>
              <Button type="primary" block onClick={handleClick}>
                Connect with Stripe
              </Button>
            </>
          )}
        </div>
      </div>
    </Block>
  )
}
export const Payment = PaymentComponent
