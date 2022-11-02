import { SwitchField } from '@/components'
import { useTranslation } from 'next-i18next'
import { useRequest } from '@/utils'
import { useProduct } from '@/layout'
import { useStore } from '@/store'
import { ProductService } from '@/service'
import { useEffect } from 'react'
import { notification } from '@heyforms/ui'

export const RemoveBranding = () => {
  const { t } = useTranslation()
  const product = useProduct()
  const { updateProduct } = useStore()

  const { loading, error, request } = useRequest(
    async (removeBranding: boolean) => {
      const updates = { removeBranding }

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
      label={t('productSettings.removeBranding.heading')}
      description={t('productSettings.removeBranding.description')}
      value={product?.removeBranding}
      loading={loading}
      onChange={request}
    />
  )
}
