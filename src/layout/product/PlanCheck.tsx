import { isNotNil } from '@nily/utils'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC, MouseEvent, cloneElement, useEffect } from 'react'

import { PLAN_NAMES } from '~/constants'
import { useProduct } from '~/layout'
import { urlBuilder, useSubscriptionPlanLevel } from '~/utils'

interface PlanCheckProps extends ComponentProps {
  minimalLevel: number
  redirectUrl?: string
}

export const PlanBadge: FC<PlanCheckProps> = ({ className, minimalLevel, ...restProps }) => {
  const product = useProduct()
  const planLevel = useSubscriptionPlanLevel(product.subscription)

  if (planLevelCompare(minimalLevel, planLevel)) {
    return null
  }

  return (
    <div className={clsx('plan-badge', className)} {...restProps}>
      {PLAN_NAMES[minimalLevel]}
    </div>
  )
}

export function planLevelCompare(minimalLevel: number, planLevel?: number) {
  return isNotNil(planLevel) && planLevel! >= minimalLevel
}

export const PlanCheck: FC<PlanCheckProps> = ({
  className,
  minimalLevel,
  redirectUrl,
  children,
  ...restProps
}) => {
  const router = useRouter()
  const product = useProduct()
  const planLevel = useSubscriptionPlanLevel(product.subscription)

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation()

    router.push(
      urlBuilder('/account/plan', {
        utm_source: 'upgrade-plan',
        redirect_url: redirectUrl
      })
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    router.prefetch('/account/plan')
  }, [])

  if (planLevelCompare(minimalLevel, planLevel)) {
    return children as any
  }

  const Element = cloneElement(children as any, {
    ...(children as any).props,
    onClick: null,
    onChange: null
  })

  return (
    <div className={clsx('plan-check', className)} onClick={handleClick} {...restProps}>
      {Element}
    </div>
  )
}
