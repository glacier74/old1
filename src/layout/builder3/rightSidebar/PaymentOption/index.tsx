import { FC } from 'react'

import { AutomatedEmailOption } from '../AutomatedEmailOption'
import { Option, OptionProps } from '../OptionGroup'
import { TextOption } from '../TextOption'
import { PaymentMethodOption } from './PaymentMethodOption'

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

export const PaymentOption: FC<OptionProps> = ({ parentName, schema }) => {
  const name = [parentName, schema.name].filter(Boolean).join('.')

  return (
    <div className="builder-option builder-option__object builder-option__payment">
      <div className="builder-option__title">{schema.title}</div>
      <div className="builder-option__content">
        <div className="builder-option__list-item">
          {schema.fields.map((f: any) => (
            <Option key={f.name} parentName={name} schema={f} />
          ))}

          {/* Payment select */}
          <PaymentMethodOption parentName={name} schema={schema} />

          {/* Payment success tips */}
          <TextOption
            parentName={name}
            schema={{
              name: 'successMessage',
              title: 'Success message'
            }}
          />

          {/* Automated email */}
          <AutomatedEmailOption
            parentName={name}
            schema={{
              title: 'Automated email'
            }}
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
                    className="text-emerald-500"
                    href="https://dashboard.stripe.com/settings/billing/portal"
                    target="_blank"
                    rel="noreferrer"
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
    </div>
  )
}
