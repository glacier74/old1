import { useTranslation } from 'next-i18next'

const STRIPE_PORTAL_URI = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URI as string

export const BillingInvoice = () => {
  const { t } = useTranslation('dashboard')

  function handleCancelSubscription() {
    window.location.href = STRIPE_PORTAL_URI
  }

  return (
    <div>
      <div className="text-2xl font-bold">Invoices</div>
      <div className="text-sm mt-2">
        Visit the{' '}
        <button className="text-emerald-600 font-medium" onClick={handleCancelSubscription}>
          Stripe customer portal
        </button>{' '}
        to view your invoices.
      </div>
    </div>
  )
}
