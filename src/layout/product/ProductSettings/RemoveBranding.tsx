import { notification } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import { SwitchField } from '~/components'
import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'
import { useRequest } from '~/utils'

export const RemoveBranding = () => {
  const { t } = useTranslation('dashboard')
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
