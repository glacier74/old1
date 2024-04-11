import { useStore } from '~/store'

import { BillingInvoice } from './BillingInvoice'
import { BillingPlan } from './BillingPlan'

export const BillingView = () => {
  const { user } = useStore()

  return (
    <div className="mt-12 space-y-8">
      <BillingPlan />
      {user.redemptions.length < 1 && <BillingInvoice />}
    </div>
  )
}
