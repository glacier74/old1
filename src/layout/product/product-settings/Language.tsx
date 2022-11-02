import { useTranslation } from 'next-i18next'
import { notification, Select } from '@heyforms/ui'
import { useRequest } from '@/utils'
import { useProduct } from '@/layout'
import { useStore } from '@/store'
import { ProductService } from '@/service'
import { useEffect } from 'react'

const options = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: '简体中文',
    value: 'zh-cn'
  }
]

export const Language = () => {
  const { t } = useTranslation()
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
        <div className="text-sm leading-6 font-medium text-slate-900">
          {t('productSettings.language.heading')}
        </div>
        <p className="mt-1 text-sm text-slate-500">{t('productSettings.language.description')}</p>
      </div>
      <div className="form-item ml-4 mb-0">
        <Select value={product?.language} options={options} loading={loading} onChange={request} />
      </div>
    </div>
  )
}
