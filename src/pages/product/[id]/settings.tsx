import { useTranslation } from 'next-i18next'

import { ProductLayout, ProductSettings as Settings } from '~/layout'
import { withTranslations } from '~/utils'

const ProductSettings = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <ProductLayout seo={{ title: 'productSettings.title' }}>
      <h1 className="mb-4 text-3xl leading-6 font-bold text-slate-900">
        {t('productSettings.heading')}
      </h1>

      <Settings />
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

export default ProductSettings
