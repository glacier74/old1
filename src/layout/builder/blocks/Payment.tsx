import { Button, Form, Input } from '@heyforms/ui'
import { IconCheck } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { StripeService } from '~/service'
import { currencyFormatter } from '~/utils'

import { useBuilderContext } from '../context'
import { stripeConnectStep } from '../utils'
import { BlockComponent, BlockPreview, BlockProps } from './Block'
import { Heading, HeadingPreview } from './Heading'
import { List, ListPreview } from './List'
import { Text, TextPreview } from './Text'

export interface PaymentProps extends BlockProps {
  block: PaymentBlock
}

export const PaymentPreview: FC<PaymentProps & { product: Product }> = ({
  block,
  product,
  ...restProps
}) => {
  const { t } = useTranslation(['publicSite'])

  async function handleFinish(values: AnyMap<string>) {
    const result = await StripeService.checkout({
      productId: product.id!,
      blockId: block.id,
      productUrl: window.location.href,
      email: values.email
    })

    window.location.href = result.sessionUrl
  }

  return (
    <BlockPreview block={block} {...restProps}>
      <div className="block-payment-wrapper">
        {/* Left column */}
        <div className="block-payment-col">
          <HeadingPreview className="block-payment-heading" block={block.heading} />

          <div className="block-content-container">
            {/* Description */}
            <TextPreview className="block-payment-description" block={block.description} />

            {/* Features */}
            <ListPreview
              className="block-payment-features"
              block={block.content}
              prefix={<IconCheck />}
            />
          </div>
        </div>

        {/* Right column */}
        <div className="block-payment-col">
          <div className="block-payment-product">
            {block.priceId && (
              <div className="p-4 md:p-10 cursor-default">
                <div className="block-payment-name">{block.productName}</div>
                <div className="block-payment-description">{block.productDescription}</div>
                <div className="block-payment-amount">
                  {currencyFormatter(block.currency, block.amount)}
                  {block.priceType === 'recurring' && `/${block.interval}`}
                </div>
                <Form.Custom
                  submitText={t('checkOut')}
                  submitOptions={{
                    type: 'success',
                    block: true
                  }}
                  request={handleFinish}
                >
                  <Form.Item
                    name="email"
                    rules={[{ required: true, type: 'email', message: t('invalidEmail') }]}
                  >
                    <Input placeholder={t('email')} />
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

const PaymentComponent: FC<PaymentProps> = ({ block, ...restProps }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

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
    <BlockComponent block={block} {...restProps}>
      <div className="block-payment-wrapper">
        {/* Left column */}
        <div className="block-payment-col">
          <Heading
            className="block-payment-heading"
            block={block.heading}
            enableFormats={null}
            placeholder={t('builder.payment.heading')}
          />

          <div className="block-content-container">
            {/* Description */}
            <Text
              className="block-payment-description"
              block={block.description}
              placeholder={t('builder.payment.description')}
              enterBehavior="focusBlock"
              enableFormats={['basic']}
            />

            {/* Features */}
            <List
              className="block-payment-features"
              block={block.content}
              prefix={<IconCheck />}
              placeholder={t('builder.payment.feature')}
            />
          </div>
        </div>

        {/* Right column */}
        <div className="block-payment-col">
          <div className="block-payment-product">
            {block.priceId ? (
              <div className="p-10 cursor-default">
                <div className="block-payment-name">{block.productName}</div>
                <div className="block-payment-description">{block.productDescription}</div>
                <div className="block-payment-amount">
                  {currencyFormatter(block.currency, block.amount)}
                  {block.priceType === 'recurring' && `/${block.interval}`}
                </div>
                <div className="input mt-6 !cursor-default">
                  <span className="block-text-placeholder">{t('email')}</span>
                </div>
                <div className="block-payment-button">{t('checkOut')}</div>
              </div>
            ) : (
              <div className="p-10">
                <p>Collect and receive payments directly on your bank account powered by Stripe.</p>
                <p className="mt-2">
                  If you do not have a stripe account, you can create a free account with a valid
                  email address and a bank account linked to an address.{' '}
                  <a
                    className="block-text-primary"
                    href="https://stripe.com/connect"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Head over to Stripe
                  </a>{' '}
                  to find out more.
                </p>
                <Button className="mt-4" type="success" block onClick={handleClick}>
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
