import { useTranslation } from 'next-i18next'
import { ProductLayout } from '@/layout'
import { withTranslations } from '@/utils'

const Product = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <ProductLayout seo={{ title: t('product.title') }}>
      <div>Product</div>
    </ProductLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default Product
