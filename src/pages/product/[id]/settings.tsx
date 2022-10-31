import { useTranslation } from 'next-i18next'
import { Settings, TeamLayout } from '@/layout'
import { withTranslations } from '@/utils'

const ProductSettings = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <TeamLayout seo={{ title: t('team.title') }}>
      <h1 className="mt-10 mb-4 text-3xl leading-6 font-bold text-slate-900">
        {t('productSettings.heading')}
      </h1>

      <Settings />
    </TeamLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default ProductSettings
