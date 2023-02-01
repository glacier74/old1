import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'

import { PLAN_NAMES } from '~/constants'
import { PlanView, ProductLayout } from '~/layout'
import { useStore } from '~/store'
import { useSubscription, useSubscriptionPlanLevel, withTranslations } from '~/utils'

const Skeleton = () => {
  return (
    <div className="mt-12 space-y-4">
      <div className="w-80 h-4 rounded-sm skeleton"></div>
      <div className="w-80 h-4 rounded-sm skeleton"></div>
    </div>
  )
}

const Plans = (): JSX.Element => {
  const { t } = useTranslation()
  const { isReady, user } = useStore()

  const subscription = useSubscription(user)
  const currPlanLevel = useSubscriptionPlanLevel(user.subscription)
  const planName = PLAN_NAMES[currPlanLevel]

  return (
    <ProductLayout seo={{ title: 'plans.title' }}>
      <h1 className="mb-4 text-3xl leading-6 font-bold text-slate-900">{t('plans.heading')}</h1>
      <div className="mt-4 text-slate-600">
        {t('plans.description', { planName })}

        {subscription &&
          (subscription.isCancelled ? (
            <span className="pl-1 text-slate-500">
              (canceled, valid until on {dayjs.unix(subscription.endsAt!).format('MMM DD, YYYY')})
            </span>
          ) : (
            <span className="pl-1 text-slate-500">
              (renews on {dayjs.unix(subscription.endsAt!).format('MMM DD, YYYY')})
            </span>
          ))}
      </div>

      {isReady ? <PlanView /> : <Skeleton />}
    </ProductLayout>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default Plans
