import { isNotNil } from '@nily/utils'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import { PLAN_NAMES } from '~/constants'
import { useProduct } from '~/layout'
import { useSubscriptionPlanLevel } from '~/utils'

interface PlanCheckProps extends ComponentProps {
  minimalLevel: number
}

export const PlanBadge: FC<PlanCheckProps> = ({ className, minimalLevel, ...restProps }) => {
  const product = useProduct()
  const planLevel = useSubscriptionPlanLevel(product.subscription)

  if (planLevelCompare(minimalLevel, planLevel)) {
    return null
  }

  return (
    <div
      className={clsx(
        'inline-block px-1 py-0.5 text-[11px] leading-[1] font-bold uppercase rounded bg-yellow-500 text-white',
        className
      )}
      {...restProps}
    >
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
  children,
  ...restProps
}) => {
  const router = useRouter()
  const product = useProduct()
  const planLevel = useSubscriptionPlanLevel(product.subscription)

  if (planLevelCompare(minimalLevel, planLevel)) {
    return children as any
  }

  function handleClick() {
    router.push('/account/plan?utm=upgrade_plan')
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    router.prefetch('/account/plan')
  }, [])

  return (
    <div className={clsx('relative', className)} {...restProps}>
      {children}
      <div className="absolute inset-0" onClick={handleClick} />
    </div>
  )
}
