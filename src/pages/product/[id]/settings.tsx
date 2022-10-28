import { useTranslation } from 'next-i18next'
import { TeamLayout } from '@/layout'
import { withTranslations } from '@/utils'

const ProductSettings = (): JSX.Element => {
  const { t } = useTranslation('team')

  return (
    <TeamLayout seo={{ title: t('team.title') }}>
      <div>Product</div>
    </TeamLayout>
  )
}

export const getServerSideProps = withTranslations(
  async context => {
    return {
      props: {}
    }
  },
  ['team']
)

export default ProductSettings
