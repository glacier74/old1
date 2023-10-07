import { Button, notification } from '@heyforms/ui'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, useState } from 'react'

import { PLAN_LEVELS } from '~/constants'
import { PLAN_TIERS } from '~/layout/pricing'
import { SubscriptionService, UserService } from '~/service'
import { useStore } from '~/store'
import { useRequest, useSubscriptionPlanLevel } from '~/utils'

const PricingButton: FC<{ plan: any; interval: string }> = ({ plan, interval }) => {
  const { t } = useTranslation('dashboard')
  const { user, updateUser } = useStore()
  const planLevel = PLAN_LEVELS[plan.id]
  const currPlanLevel = useSubscriptionPlanLevel(user.subscription)

  const { loading, request } = useRequest(
    async (title: string) => {
      const result = await SubscriptionService.checkout(plan.id, interval)

      if (result.sessionUrl) {
        window.location.href = result.sessionUrl
      } else {
        // Update user
        const user = await UserService.user()
        updateUser(user)

        notification.success({
          title
        })
      }
    },
    [plan.id, interval],
    {
      errorNotify: true
    }
  )

  function handleUpgrade() {
    request(t('plan.upgrade', { planName: plan.name }))
  }

  function handleDowngrade() {
    request(t('plan.downgrade', { planName: plan.name }))
  }

  if (user.subscription?.isActive && planLevel === PLAN_LEVELS.plan_free) {
    return null
  }

  if (planLevel > currPlanLevel) {
    return (
      <Button
        className="w-full !px-2 !py-2"
        type="success"
        loading={loading}
        onClick={handleUpgrade}
      >
        Upgrade
      </Button>
    )
  } else if (planLevel < currPlanLevel) {
    return (
      <Button className="w-full !px-2 !py-2" loading={loading} onClick={handleDowngrade}>
        Downgrade
      </Button>
    )
  } else {
    return (
      <Button className="w-full !px-2 !py-2" disabled={true}>
        Current plan
      </Button>
    )
  }
}

const IntervalSwitch: FC<{ interval: string; onChange: (interval: string) => void }> = ({
  interval,
  onChange
}) => {
  function handleSwitchToMonth() {
    onChange('month')
  }

  function handleSwitchToYear() {
    onChange('year')
  }

  return (
    <div className="mt-9 relative self-center bg-slate-200 rounded-lg p-0.5 flex">
      <button
        type="button"
        className={clsx(
          'relative w-1/2 rounded-md py-1.5 text-sm font-medium whitespace-nowrap focus:outline-none sm:px-2',
          interval === 'month'
            ? 'bg-slate-50 border-slate-50 text-slate-900 shadow-sm'
            : 'border-transparent text-slate-900'
        )}
        onClick={handleSwitchToMonth}
      >
        Month
      </button>
      <button
        type="button"
        className={clsx(
          'ml-0.5 relative w-1/2 border rounded-md py-1.5 text-sm font-medium whitespace-nowrap focus:outline-none sm:px-2',
          interval === 'year'
            ? 'bg-slate-50 border-slate-50 text-slate-900 shadow-sm'
            : 'border-transparent text-slate-900'
        )}
        onClick={handleSwitchToYear}
      >
        Year
      </button>
    </div>
  )
}

export const PlanHeader: FC = () => {
  const { user } = useStore()
  const [interval, setInterval] = useState(user.subscription?.price?.interval || 'year')

  return (
    <tr>
      <th className="py-8 px-6 text-sm font-medium text-slate-700 text-left align-top" scope="row">
        <div>Pricing</div>
        <IntervalSwitch interval={interval} onChange={setInterval} />
      </th>
      {PLAN_TIERS.map(plan => (
        <td key={plan.id} className="h-full py-8 px-6 align-top">
          <div className="relative h-full table">
            <p>
              <span className="text-4xl font-extrabold text-slate-900">
                ${interval === 'month' ? plan.priceMonthly : plan.priceAnnually}
              </span>{' '}
              <span className="text-base font-medium text-slate-500">/mo</span>
            </p>
            <div className="mt-4">
              <PricingButton plan={plan} interval={interval} />
            </div>
          </div>
        </td>
      ))}
    </tr>
  )
}
