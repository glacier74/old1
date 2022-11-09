import { notification } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import { SwitchField } from '~/components'
import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'
import { useRequest } from '~/utils'

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
