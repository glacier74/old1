import { Select, notification } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import { LANGUAGE_OPTIONS } from '~/constants'
import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'
import { useRequest } from '~/utils'

export const Language = () => {
  const { t } = useTranslation('dashboard')
  const product = useProduct()
  const { updateProduct } = useStore()

  const { loading, error, request } = useRequest(
    async (language: string) => {
      const updates = { language }

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
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="text-sm leading-6 font-semibold text-slate-900">
          {t('productSettings.language.heading')}
        </div>
        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          {t('productSettings.language.description')}
        </p>
      </div>
      <div className="form-item ml-4 mb-0">
        <Select
          value={product?.language}
          options={LANGUAGE_OPTIONS}
          loading={loading}
          onChange={request}
        />
      </div>
    </div>
  )
}
