import { Button, Input, Tabs, notification } from '@heyforms/ui'
import { IconArrowUpRight } from '@tabler/icons'
import { FC, useState } from 'react'

import { StylePicker } from '~/components'
import { useBlockSetting } from '~/layout/builder2/context'
import { StripeService } from '~/service'
import { useRequest, useWindow } from '~/utils'

import { AutomatedEmail } from './AutomatedEmail'
import { SettingFieldProps } from './SettingField'

const defaultSubject = 'You got {product.name}'
const defaultMessage = `
    <p>Dear {payment.name},</p>
    <p></p>
    <p>Thank you for your purchase of {product.name}. I appreciate your support and am glad that you chose to purchase it from me.</p>
    <p></p>
    <p>Here is the link to access it: {product.url}</p>
    <p></p>
    <p>I hope you enjoy the product and find it useful. If you have any questions or feedback, please do not hesitate to reach out to me. I would love to hear from you.</p>
    <p></p>
    <p>Once again, thank you for your purchase.</p>
    <p></p>
    <p>Sincerely,</p>
    <p>{product.owner.name}</p>
  `
const variables = [
  {
    variable: 'payment.name',
    description: "Customer's name"
  },
  {
    variable: 'payment.email',
    description: "Customer's email address"
  },
  {
    variable: 'payment.formattedAmount',
    description: (
      <span>
        Payment amount <span className="text-slate-500">(e.g., $100.00)</span>
      </span>
    )
  },
  {
    variable: 'product.name',
    description: 'Product name'
  },
  {
    variable: 'product.url',
    description: 'The landing page URL'
  },
  {
    variable: 'product.owner.name',
    description: "Product owner's name"
  },
  {
    variable: 'product.owner.email',
    description: "Product owner's email address"
  }
]

interface ConnectStripeProps {
  setting: any
  updateSetting: (value: any, key?: string) => void
}

export const ConnectStripe: FC<ConnectStripeProps> = ({ setting, updateSetting }) => {
  const [loading, setLoading] = useState(false)

  const authorize = useRequest(async () => {
    const { authorizeUrl } = await StripeService.authorizeUrl()

    setLoading(true)
    openWindow(authorizeUrl, 'scrollbars=yes, resizable=yes, width=1120, height=720')
  }, [])

  async function connect(stateQuery: string, code: string) {
    try {
      const result = await StripeService.connect(stateQuery, code)

      updateSetting(result.accountId, 'stripeAccount')
      updateSetting(result.email, 'stripeEmail')
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    setLoading(false)
  }

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

  function handlePriceIdChange(value: any) {
    if (!value.startsWith('price_')) {
      return notification.error({
        title: "Error: the Stripe price ID must start with 'price_'"
      })
    }

    updateSetting(value, 'priceId')
  }

  return (
    <div className="space-y-2">
      <div>
        {setting?.stripeAccount ? (
          <div className="text-xs text-slate-700">
            Connected with Stripe: <span className="font-medium">{setting?.stripeEmail}</span>
          </div>
        ) : (
          <Button
            className="w-full"
            type="success"
            trailing={<IconArrowUpRight />}
            loading={loading}
            onClick={authorize.request}
          >
            Connect with Stripe
          </Button>
        )}
      </div>

      {setting?.stripeAccount && (
        <div className="space-y-1">
          <div className="text-sm font-medium text-slate-800">Price ID</div>
          <div className="text-xs text-slate-700">
            Go to{' '}
            <a
              className="text-green-500"
              href="https://dashboard.stripe.com/products/create"
              target="_blank"
            >
              Stripe dashboard
            </a>{' '}
            and create a product. Once you have created the product, copy and paste the price ID
            (e.g. price_0MlwwsKRmsNyao) here.
          </div>
          <Input
            value={setting?.priceId}
            placeholder="e.g. price_0MlwwsKRmsNyao"
            onChange={handlePriceIdChange}
          />
        </div>
      )}
    </div>
  )
}

export const PaymentSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleChange(value: any) {
    updateSetting(value, 'html')
  }

  function handlePaymentMethodChange(value: any) {
    updateSetting(value, 'paymentMethod')
  }

  function handlePaymentLinkChange(value: any) {
    updateSetting(value, 'paymentLinks.0')
  }

  function handleMessageChange(value: any) {
    updateSetting(value, 'message')
  }

  function handleStyleChange(property: string, value: string) {
    updateSetting(value, `style.${property}`)
  }

  return (
    <div className="builder-setting-text space-y-2">
      <Tabs
        className="builder-setting-payment-methods"
        type="segment"
        defaultActiveName={setting?.paymentMethod || 'stripe'}
        onChange={handlePaymentMethodChange}
      >
        <Tabs.Pane name="stripe" title="Stripe">
          <ConnectStripe setting={setting} updateSetting={updateSetting} />
        </Tabs.Pane>
        <Tabs.Pane name="link" title="Link">
          <Input
            type="url"
            value={setting.paymentLinks?.[0]}
            placeholder="Paste your payment link here"
            onChange={handlePaymentLinkChange}
          />
        </Tabs.Pane>
      </Tabs>

      <div className="flex items-center justify-between">
        <div className="text-sm">Button text</div>
        <Input
          className="ml-2 max-w-[11.25rem] !px-2 !py-[0.34rem]"
          value={setting?.html}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">Button style</div>
        <StylePicker
          properties={Object.keys(setting!.style)}
          value={setting!.style}
          onChange={handleStyleChange}
        />
      </div>

      <div className="pt-4 space-y-1">
        <div className="text-sm text-slate-700">Success message</div>
        <Input.Textarea value={setting?.message} onChange={handleMessageChange} />
      </div>

      <div>
        <AutomatedEmail
          setting={setting}
          updateSetting={updateSetting}
          heading="Automated email"
          description={
            <div className="space-y-0.5">
              <p>
                Send a personalized email to your customer to congratulate them on a successful
                payment.
              </p>
              <p>
                <strong>For subscription products</strong>, you need to activate{' '}
                <a
                  className="text-green-500"
                  href="https://dashboard.stripe.com/settings/billing/portal"
                  target="_blank"
                >
                  Stripe customer portal
                </a>{' '}
                link, then copy the link and paste below, so that users can manage their
                subscriptions through this link.
              </p>
            </div>
          }
          defaultSubject={defaultSubject}
          defaultMessage={defaultMessage}
          variables={variables}
        />
      </div>
    </div>
  )
}
