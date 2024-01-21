import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'

import { PLAN_NAMES } from '~/constants'
import { AccountLayout, PlanView, Redeem } from '~/layout'
import { useStore } from '~/store'
import { useSubscription, withTranslations } from '~/utils'

const Skeleton = () => {
  return (
    <div className="mt-12 space-y-4">
      <div className="w-80 h-4 rounded-sm skeleton"></div>
      <div className="w-80 h-4 rounded-sm skeleton"></div>
    </div>
  )
}

const Plan = (): JSX.Element => {
  const { t } = useTranslation('dashboard')
  const { isReady, user } = useStore()

  const subscription = useSubscription(user)
  const planName = subscription ? PLAN_NAMES[subscription.planId] : PLAN_NAMES.plan_free

  return (
    <AccountLayout seo={{ title: t('plan.title') }}>
      <div className="flex justify-between">
        <div>
          <h1 className="mb-4 text-3xl leading-6 font-bold text-slate-900">{t('plan.heading')}</h1>
          <div className="mt-4 text-slate-600">
            {t('plan.description', { planName })}

            {subscription &&
              (subscription.isCancelled ? (
                <span className="pl-1 text-slate-500">
                  (Canceled, valid until on{' '}
                  {dayjs.unix(subscription.endsAt!).format('MMM DD, YYYY')})
                </span>
              ) : (
                <span className="pl-1 text-slate-500">
                  (
                  {subscription.endsAt
                    ? `Renews on ${dayjs.unix(subscription.endsAt).format('MMM DD, YYYY')}`
                    : 'Never expires'}
                  )
                </span>
              ))}
          </div>
        </div>

        <Redeem />
      </div>

      {isReady ? <PlanView /> : <Skeleton />}
    </AccountLayout>
  )
}

export const getServerSideProps = withTranslations(
  async context => {
    return {
      props: {}
    }
  },
  ['common', 'dashboard']
)

export default Plan
