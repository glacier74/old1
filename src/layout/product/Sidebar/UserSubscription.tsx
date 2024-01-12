import { Tooltip } from '@heyforms/ui'
import { IconDiamond } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import { PLAN_NAMES } from '~/constants'
import { useProduct } from '~/layout'
import { urlBuilder } from '~/utils'

const PLAN_CLASSNAMES: AnyMap<string> = {
  plan_starter: 'text-yellow-500',
  plan_superior: 'text-emerald-500',
  plan_shipper: 'text-purple-500',
  plan_unlimited: 'text-rose-500',

  // Jingle Bio
  jinglebio_melody: 'text-yellow-500',
  jinglebio_harmony: 'text-emerald-500',
  jinglebio_crescendo: 'text-purple-500'
}

const PaidPlan: FC<{ planId: string }> = ({ planId }) => {
  const { t } = useTranslation('dashboard')
  const ariaLabel = t('plan.name', { planName: PLAN_NAMES[planId] })

  return (
    <Tooltip ariaLabel={ariaLabel}>
      <Link href="/account/billing">
        <IconDiamond className={clsx('w-6 h-6', PLAN_CLASSNAMES[planId])} />
      </Link>
    </Tooltip>
  )
}

const FreePlan = () => {
  const { t } = useTranslation('dashboard')
  const router = useRouter()

  const ariaLabel = t('plan.name', { planName: PLAN_NAMES.plan_free })

  function handleClick() {
    router.push(
      urlBuilder('/account/plan', {
        utm_source: 'upgrade-plan'
      })
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    router.prefetch('/account/plan')
  }, [])

  return (
    <Tooltip ariaLabel={ariaLabel}>
      <button onClick={handleClick}>
        <IconDiamond className="w-6 h-6 text-slate-500" />
      </button>
    </Tooltip>
  )
}

export const UserSubscription = () => {
  const product = useProduct()

  return (
    <div className="flex items-center justify-center">
      {product.subscription ? <PaidPlan planId={product.subscription.planId} /> : <FreePlan />}
    </div>
  )
}
