import { BillingInvoice } from './BillingInvoice'
import { BillingPlan } from './BillingPlan'

export const BillingView = () => {
  return (
    <div className="mt-12 space-y-8">
      <BillingPlan />
      <BillingInvoice />
    </div>
  )
}
