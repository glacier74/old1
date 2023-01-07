import { useTranslation } from 'next-i18next'

import { PLAN_NAMES } from '~/constants'
import { AccountLayout, PlanView } from '~/layout'
import { useStore } from '~/store'
import { useSubscriptionPlanLevel, withTranslations } from '~/utils'

const Skeleton = () => {
  return (
    <div>
      <div className="flex items-center h-16 py-4">
        <div className="w-40 h-4 rounded-sm skeleton"></div>
        <div className="w-40 h-4 rounded-sm skeleton"></div>
        <div className="w-40 h-4 rounded-sm skeleton"></div>
      </div>
      <div className="flex items-center h-16 py-4">
        <div className="w-40 h-4 rounded-sm skeleton"></div>
        <div className="w-40 h-4 rounded-sm skeleton"></div>
        <div className="w-40 h-4 rounded-sm skeleton"></div>
      </div>
    </div>
  )
}

const Plan = (): JSX.Element => {
  const { t } = useTranslation()
  const { isReady, user } = useStore()

  const currPlanLevel = useSubscriptionPlanLevel(user.subscription)
  const planName = PLAN_NAMES[currPlanLevel]

  return (
    <AccountLayout seo={{ title: 'plan.title' }}>
      <h1 className="mb-4 text-3xl leading-6 font-bold text-slate-900">{t('plan.heading')}</h1>
      <div className="mt-4 text-slate-600">{t('plan.description', { planName })}</div>

      {isReady ? <PlanView /> : <Skeleton />}
    </AccountLayout>
  )
}

export const getStaticProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default Plan
