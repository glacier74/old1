import { useTranslation } from 'next-i18next'
import { useRef } from 'react'

import { AsyncRequest, AsyncRequestInstance } from '~/components'
import { ProductLayout, useProduct } from '~/layout'
import { Builder2 } from '~/layout/builder2'
import { UpgradeToSchema2 } from '~/layout/builder2/UpgradeToSchema2'
import { Builder3 } from '~/layout/builder3'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { useRequest, withTranslations } from '~/utils'

const ProductEdit = (): JSX.Element => {
  const { t } = useTranslation('dashboard')
  const { siteSettings, setSiteSettings } = useStore()
  const product = useProduct()

  const asyncRequestRef = useRef<AsyncRequestInstance>()

  async function fetchSiteSettings() {
    setSiteSettings(await SiteSettingsService.detail(product.id))
    return true
  }

  const { loading, request } = useRequest(async () => {
    await SiteSettingsService.upgradeSchema(product.id)
    asyncRequestRef.current?.reload()
  }, [product.id])

  return (
    <ProductLayout
      seo={{
        title: t('product.title', { name: product?.name || '' })
      }}
    >
      <AsyncRequest
        ref={asyncRequestRef as any}
        className="w-full min-h-screen bg-white"
        request={fetchSiteSettings}
        deps={[product.id]}
      >
        {siteSettings.schema === 1 ? (
          <UpgradeToSchema2 loading={loading} onClick={request} />
        ) : siteSettings.schema == 2 ? (
          <Builder2 />
        ) : (
          <Builder3 />
        )}
      </AsyncRequest>
    </ProductLayout>
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

export default ProductEdit
