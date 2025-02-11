import { useTranslation } from 'next-i18next'

import { AccountLayout } from '~/layout'
import { BillingView } from '~/layout/account/BillingView'
import { useStore } from '~/store'
import { withTranslations } from '~/utils'

const Skeleton = () => {
  return (
    <div className="mt-12 space-y-4">
      <div className="w-80 h-4 rounded-sm skeleton"></div>
      <div className="w-80 h-4 rounded-sm skeleton"></div>
    </div>
  )
}

const Billing = (): JSX.Element => {
  const { t } = useTranslation('dashboard')
  const { isReady } = useStore()

  return (
    <AccountLayout seo={{ title: t('billing.title') }}>
      <h1 className="mb-4 text-3xl leading-6 font-bold text-slate-900">{t('billing.heading')}</h1>
      <div className="mt-4 text-slate-600">{t('billing.description')}</div>

      {isReady ? <BillingView /> : <Skeleton />}
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

export default Billing
