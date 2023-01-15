import { Button } from '@heyforms/ui'
import { IconChevronRight } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { useBuilderContext } from '~/layout/builder/context'
import { stripeConnectStep } from '~/layout/builder/utils'

import { EmailNotification } from './EmailNotification'

export const PaymentSettings: FC<{ block: PaymentBlock }> = ({ block }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

  const defaultSubject = 'You got {product.name}'
  const defaultMessage = `
    <div>Dear {payment.name},</div>
    <div><br /></div>
    <div>Thank you for your purchase of {product.name}. I appreciate your support and am glad that you chose to purchase it from me.</div>
    <div><br /></div>
    <div>Here is the link to access it: {product.url}</div>
    <div><br /></div>
    <div>I hope you enjoy the product and find it useful. If you have any questions or feedback, please do not hesitate to reach out to me. I would love to hear from you.</div>
    <div><br /></div>
    <div>Once again, thank you for your purchase.</div>
    <div><br /></div>
    <div>Sincerely,</div>
    <div>{product.owner.name}</div>
  `
  const variables = [
    {
      variable: 'payment.name',
      description: "Customer's name"
    },
    {
      variable: 'payment.email',
      description: "Customer's email"
    },
    {
      variable: 'payment.formattedAmount',
      description: 'Payment amount e.g., $100.00'
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
      description: "Product owner's email"
    }
  ]

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
    <div className="px-4 space-y-1">
      <Button.Link
        className="w-full !py-1.5 !justify-between !text-sm !text-slate-900"
        trailing={<IconChevronRight />}
        onClick={handleClick}
      >
        {t('builder.payment.settings')}
      </Button.Link>

      <EmailNotification
        block={block}
        heading="Email Notification"
        description="Send a personalized email to your customer to congratulate them on a successful payment."
        defaultSubject={defaultSubject}
        defaultMessage={defaultMessage}
        variables={variables}
      />
    </div>
  )
}
