import { Tabs } from '@heyforms/ui'
import { FC } from 'react'

import { useOptions } from '~/layout/builder3/context'

import { OptionProps } from '../OptionGroup'
import { PaymentLinkOption } from './PaymentLinkOption'
import { StripeOption } from './StripeOption'

export const PaymentMethodOption: FC<OptionProps> = ({ parentName, schema }) => {
  const { value, update } = useOptions<string>(
    [parentName, 'paymentMethod'].filter(Boolean).join('.')
  )

  return (
    <div className="builder-option payment-method-option">
      <div className="builder-option__title">Payment method</div>
      <div className="builder-option__content">
        <Tabs type="segment" activeName={value || 'stripe'} onChange={update}>
          <Tabs.Pane name="stripe" title="Stripe">
            <StripeOption parentName={parentName} schema={{}} />
          </Tabs.Pane>
          <Tabs.Pane name="link" title="Payment Link">
            <PaymentLinkOption parentName={parentName} schema={{}} />
          </Tabs.Pane>
        </Tabs>
      </div>
    </div>
  )
}
