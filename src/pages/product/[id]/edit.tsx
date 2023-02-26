import { useTranslation } from 'next-i18next'

import { AuthorizedLayout, useProduct } from '~/layout'
import { Builder2 } from '~/layout/builder2'
import { withTranslations } from '~/utils'

const ProductEdit = (): JSX.Element => {
  const { t } = useTranslation()
  const product = useProduct()

  return (
    <AuthorizedLayout
      seo={{
        title: t('product.title', { name: product?.name || '' })
      }}
    >
      <Builder2 />
    </AuthorizedLayout>
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

export default ProductEdit
