import { useTranslation } from 'react-i18next'
import { TeamPage } from '@/components/page'

const Product = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <TeamPage seo={{ title: t('product.title') }}>
      <div>Product</div>
    </TeamPage>
  )
}

export default Product
