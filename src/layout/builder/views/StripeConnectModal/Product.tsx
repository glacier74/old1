import { Form, Input } from '@heyforms/ui'
import { FC, useCallback } from 'react'

import { StripeService } from '~/service'

import { useBuilderContext } from '../../context'

export const Product: FC = () => {
  const { state, dispatch } = useBuilderContext()

  function handleBack() {
    dispatch({
      type: 'update',
      payload: {
        stripeConnectStep: 'connect'
      }
    })
  }

  const handleFinish = useCallback(
    async (values: any) => {
      const stripeProduct = await StripeService.product(
        values.stripeProduct,
        state.stripeConnectBlock!.stripeAccount!
      )

      dispatch({
        type: 'update',
        payload: {
          stripeProduct
        }
      })

      dispatch({
        type: 'updateStripeConnect',
        payload: {
          stripeConnectStep: 'selectPrice',
          stripeConnectBlock: {
            productId: stripeProduct.id,
            productName: stripeProduct.name,
            productDescription: stripeProduct.description
          }
        }
      })
    },
    [state.stripeConnectBlock]
  )

  return (
    <div className="flex flex-col items-center justify-center px-24 h-full">
      <div className="stripe-connect-modal-product">
        <div className="space-y-2">
          <p>
            You are connected to Stripe account {state.stripeConnectBlock?.stripeEmail}. If you want
            to reconnect to another account, please{' '}
            <a className="text-green-500" href="#" onClick={handleBack}>
              click here
            </a>
            .
          </p>
          <p>
            Go to Stripe dashboard to{' '}
            <a
              className="text-green-500"
              href="https://dashboard.stripe.com/products/create"
              target="_blank"
              rel="noreferrer"
            >
              create a product
            </a>
            , copy the product id beginning with <strong>"prod_"</strong> that you can find in the
            product details, and paste it below. We will get you the product information belonging
            to this product id.
          </p>
        </div>

        <Form.Custom
          inline
          initialValues={{
            stripeProduct: undefined
          }}
          submitText="Continue"
          submitOptions={{
            type: 'success'
          }}
          onlySubmitOnValueChange={true}
          request={handleFinish}
        >
          <Form.Item name="stripeProduct" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </div>
  )
}
