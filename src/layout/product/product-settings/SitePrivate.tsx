import { SwitchField } from '@/components'
import { useTranslation } from 'next-i18next'
import { useRequest } from '@/utils'
import { useProduct } from '@/layout'
import { useStore } from '@/store'
import { ProductService } from '@/service'
import { useEffect } from 'react'
import { notification } from '@heyforms/ui'

export const SitePrivate = () => {
  const { t } = useTranslation()
  const product = useProduct()
  const { updateProduct } = useStore()

  const { loading, error, request } = useRequest(
    async (isSitePrivate: boolean) => {
      const updates = { isSitePrivate }

      await ProductService.update(product!.id, updates)
      updateProduct(product!.id, updates)
    },
    [product]
  )

  useEffect(() => {
    if (error) {
      notification.error({
        title: t(error.message)
      })
    }
  }, [error])

  return (
    <SwitchField
      className="pt-4"
      label={t('productSettings.sitePrivate.heading')}
      description={t('productSettings.sitePrivate.description')}
      value={product?.isSitePrivate}
      loading={loading}
      onChange={request}
    />
  )
}
