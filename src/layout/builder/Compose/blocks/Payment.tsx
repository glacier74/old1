import { Button, Form, Input, Menus } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { StripeService } from '~/service'
import { currencyFormatter } from '~/utils'

import { useComposeStore } from '../store'
import { stripeConnectStep } from '../utils'
import { BlockComponent, BlockPreview, BlockProps } from './Block'
import { Heading, HeadingPreview } from './Heading'
import { List, ListPreview } from './List'
import { Text, TextPreview } from './Text'

export interface PaymentProps extends BlockProps {
  block: PaymentBlock
}

export const PaymentPreview: FC<PaymentProps & { productId: number }> = ({
  block,
  productId,
  ...restProps
}) => {
  const { t } = useTranslation()

  async function handleFinish(values: AnyMap<string>) {
    const result = await StripeService.checkout({
      productId,
      blockId: block.id,
      productUrl: window.location.href,
      email: values.email
    })

    window.location.href = result.sessionUrl
  }

  return (
    <BlockPreview block={block} {...restProps}>
      <div className="block-payment-container">
        {/* Left column */}
        <div className="block-payment-col">
          <HeadingPreview className="block-payment-heading" block={block.heading} />

          <div className="block-content-container">
            {/* Description */}
            <TextPreview className="block-payment-description" block={block.description} />

            {/* Features */}
            <ListPreview className="block-payment-features" block={block.content} />
          </div>
        </div>

        {/* Right column */}
        <div className="block-payment-col">
          <div className="rounded-lg bg-white overflow-hidden text-xl shadow w-96 mx-auto">
            {block.priceId && (
              <div className="p-10 cursor-default">
                <div className="text-3xl font-medium text-slate-900">{block.productName}</div>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                  {block.productDescription}
                </p>
                <div className="mt-4 text-3xl font-semibold text-slate-800">
                  {currencyFormatter(block.currency, block.amount)}
                </div>
                <Form.Custom
                  submitText={t('publicSite.buyNow')}
                  submitOptions={{
                    type: 'primary',
                    block: true
                  }}
                  request={handleFinish}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, type: 'email', message: t('publicSite.invalidEmail') }
                    ]}
                  >
                    <Input placeholder={t('publicSite.email')} />
                  </Form.Item>
                </Form.Custom>
              </div>
            )}
          </div>
        </div>
      </div>
    </BlockPreview>
  )
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
    <BlockComponent block={block} enableAction={true} {...restProps}>
      <div className="block-payment-container">
        {/* Left column */}
        <div className="block-payment-col">
          <Heading
            className="block-payment-heading"
            block={block.heading}
            placeholder="builder.payment.heading"
            enableAction={false}
          />

          <div className="block-content-container">
            {/* Description */}
            <Text
              className="block-payment-description"
              block={block.description}
              placeholder="builder.payment.description"
              enterBehavior="focusBlock"
              enableAction={false}
            />

            {/* Features */}
            <List
              className="block-payment-features"
              block={block.content}
              placeholder="builder.payment.feature"
              enableAction={false}
            />
          </div>
        </div>

        {/* Right column */}
        <div className="block-payment-col">
          <div className="rounded-lg bg-white overflow-hidden text-xl shadow">
            {block.priceId ? (
              <div className="p-10 cursor-default">
                <div className="text-3xl font-medium text-slate-900">{block.productName}</div>
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                  {block.productDescription}
                </p>
                <div className="mt-4 text-2xl font-semibold text-slate-800">
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
              <div className="p-10">
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
      </div>
    </BlockComponent>
  )
}
export const Payment = PaymentComponent
