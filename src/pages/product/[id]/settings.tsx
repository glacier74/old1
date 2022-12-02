import { useTranslation } from 'next-i18next'

import { ProductLayout, ProductSettings as Settings } from '~/layout'
import { useStore } from '~/store'
import { withTranslations } from '~/utils'

const Skeleton = () => {
  return (
    <div className="min-w-0 pt-1 space-y-4">
      <div className="skeleton" style={{ width: 120, height: 18 }}></div>
      <div className="skeleton" style={{ width: 500, height: 14 }}></div>
      <div className="skeleton" style={{ width: 500, height: 14 }}></div>
      <div className="skeleton" style={{ width: 500, height: 14 }}></div>
      <div className="skeleton" style={{ width: 500, height: 14 }}></div>
    </div>
  )
}

const ProductSettings = (): JSX.Element => {
  const { t } = useTranslation()
  const { isReady } = useStore()

  return (
    <ProductLayout seo={{ title: 'productSettings.title' }}>
      <h1 className="mb-4 text-3xl leading-6 font-bold text-slate-900">
        {t('productSettings.heading')}
      </h1>

      {isReady ? <Settings /> : <Skeleton />}
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
