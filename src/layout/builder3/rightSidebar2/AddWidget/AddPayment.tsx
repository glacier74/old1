import { Button, Form, Input } from '@heyforms/ui'
import { IconArrowUpRight } from '@tabler/icons'
import { nanoid } from 'nanoid'
import { FC, useState } from 'react'

import { useConnectStripe } from '~/layout/builder3/rightSidebar/StripeOption'

import { OptionsContainer } from '../OptionsContainer'
import { AddLinkProps } from './AddLink'
import { AddWidgetForm } from './AddWidgetForm'

export const AddPayment: FC<AddLinkProps> = ({ onCreate, onGoBack, ...restProps }) => {
  const [value, setValue] = useState<AnyMap>()

  const { loading, authorize } = useConnectStripe(
    stripeInfo => {
      setValue({
        ...value,
        ...stripeInfo
      })
    },
    [value]
  )

  async function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      type: 'payment',
      size: '1x1',
      data: {
        ...value,
        buttonText: 'Pay',
        successMessage: 'Thank you for your payment!'
      },
      overrides: {
        title: ''
      }
    })
  }

  return (
    <OptionsContainer title="Add a payment card" onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        {value?.stripeAccount ? (
          <>
            <div className="mb-5 px-4 py-3 space-y-2 text-[13px] text-slate-700 bg-yellow-50 rounded-lg">
              <p>
                You're now connected to: {value?.stripeEmail || value?.stripeAccount}, navigate to
                your{' '}
                <a
                  className="text-emerald-600"
                  href="https://dashboard.stripe.com/products/create"
                  target="_blank"
                >
                  Stripe dashboard
                </a>{' '}
                to create a product.
              </p>
              <p>
                After establishing your product, locate and copy the Price ID (for example,
                price_0MlwwsKRmsNyao), then paste it here.
              </p>
            </div>
            <AddWidgetForm requiredNames={['priceID', 'buttonText']} onFinish={handleFinish}>
              <Form.Item
                label="Price ID"
                name="priceID"
                rules={[{ required: true, message: 'The price ID is not valid' }]}
              >
                <Input placeholder="e.g. price_0MlwwsKRmsNyao" />
              </Form.Item>
            </AddWidgetForm>
          </>
        ) : (
          <Button
            className="w-full !bg-emerald-600 !border-none !text-white"
            loaderClassName="!bg-emerald-600"
            trailing={<IconArrowUpRight className="w-5 h-5 !text-white" />}
            loading={loading}
            onClick={authorize.request}
          >
            Connect to Stripe
          </Button>
        )}
      </div>
    </OptionsContainer>
  )
}
