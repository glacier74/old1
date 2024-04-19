import { Button } from '@heyforms/ui'
import dayjs from 'dayjs'
import Link from 'next/link'

import { PLAN_INTERVALS, PLAN_LEVELS, PLAN_NAMES } from '~/constants'
import { BillingUsage } from '~/layout/account/BillingView/BillingUsage'
import { useStore } from '~/store'
import { currencyFormatter, useSubscription } from '~/utils'

const STRIPE_PORTAL_URI = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URI as string
const JINGLEBIO_PORTAL_URI = process.env.NEXT_PUBLIC_JINGLEBIO_PORTAL_URI as string

export const BillingPlan = () => {
  const { user } = useStore()
  const subscription = useSubscription(user)
  const redemptionCount = user.redemptions.length

  function handleCancelSubscription() {
    if (subscription?.plan.isJingleBio) {
      window.location.href = JINGLEBIO_PORTAL_URI
    } else {
      window.location.href = STRIPE_PORTAL_URI
    }
  }

  return (
    <div>
      <div className="text-2xl font-bold">Plan</div>
      <div className="mt-2">
        {subscription ? (
          <div className="flex flex-col md:flex-row">
            <div className="md:flex-1 space-y-2">
              <div className="text-base font-semibold">{subscription.plan.name}</div>
              <div className="text-sm">
                {redemptionCount > 0 ? (
                  redemptionCount === 1 ? (
                    '$39'
                  ) : (
                    '$78'
                  )
                ) : (
                  <>
                    {subscription.price &&
                      currencyFormatter(subscription.price.currency, subscription.price.price)}{' '}
                    / {user.subscription.price?.interval}
                  </>
                )}
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <Link
                  className="w-full md:w-auto link-button link-button-success"
                  href="/account/plan"
                >
                  View plans
                </Link>
                {!subscription.isCancelled && redemptionCount < 1 && (
                  <Button className="w-full md:w-auto " onClick={handleCancelSubscription}>
                    Manage subscription
                  </Button>
                )}
              </div>
            </div>
            <div className="md:flex-1 mt-5 md:mt-0 space-y-1">
              <div className="text-base font-semibold">Billing period</div>
              <div className="text-sm">
                <span>
                  {redemptionCount > 0 ? '∞' : PLAN_INTERVALS[subscription.price?.interval]}
                </span>
                {subscription.isCancelled ? (
                  <span className="pl-1 text-slate-500">
                    (Canceled, valid until {dayjs.unix(subscription.endsAt!).format('MMM DD, YYYY')}
                    )
                  </span>
                ) : (
                  <span className="pl-1 text-slate-500">
                    (
                    {subscription.endsAt
                      ? `Renews on ${dayjs.unix(subscription.endsAt).format('MMM DD, YYYY')}`
                      : 'Never expires'}
                    )
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-1 text-base font-semibold">{PLAN_NAMES[PLAN_LEVELS.plan_free]}</div>
            <Link
              className="block md:!inline-block link-button link-button-success"
              href="/account/plan"
            >
              Upgrade plan
            </Link>
          </div>
        )}

        <BillingUsage />
      </div>
    </div>
  )
}
