import { useTranslation } from 'next-i18next'
import { TeamLayout } from '@/layout'
import { withTranslations } from '@/utils'

const Product = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <TeamLayout seo={{ title: t('product.title') }}>
      <div>Product</div>
    </TeamLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default Product
