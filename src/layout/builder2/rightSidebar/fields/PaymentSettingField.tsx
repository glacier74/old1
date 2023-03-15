import { Button, Input, notification } from '@heyforms/ui'
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
    updateSetting(value, 'priceId')
  }

  return (
    <>
    <div>
        <div className="mb-1 text-sm text-slate-700">Stripe</div>
        <div>
          {setting?.stripeAccount ? (
            <div className="text-sm text-slate-700">Connected with: {setting?.stripeEmail}</div>
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
      </div>

      {setting?.stripeAccount && (
        <div>
          <div className="mb-1 text-sm text-slate-700">Price</div>
          <Input value={setting?.priceId} onChange={handlePriceIdChange} />
        </div>
      )}
    </>
  )
}

export const PaymentSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleChange(value: any) {
    updateSetting(value, 'html')
  }

  function handleMessageChange(value: any) {
    updateSetting(value, 'message')
  }

  function handleStyleChange(property: string, value: string) {
    updateSetting(value, `style.${property}`)
  }

  return (
    <div className="builder-setting-text space-y-2">
      <ConnectStripe setting={setting} updateSetting={updateSetting} />

      <div className="flex items-center justify-between">
        <div className="text-sm">Button text</div>
        <Input value={setting?.html} onChange={handleChange} />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">Button style</div>
        <StylePicker
          properties={Object.keys(setting!.style)}
          value={setting!.style}
          onChange={handleStyleChange}
        />
      </div>

      <div className="pt-4">
        <div className="mb-1 text-sm text-slate-700">Success message</div>
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
