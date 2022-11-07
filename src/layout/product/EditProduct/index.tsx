import { AuthorizedLayout, useProduct } from '@/layout'
import { useTranslation } from 'next-i18next'
import { SiteSettings } from './SiteSettings'

export const EditProduct = () => {
  const { t } = useTranslation()
  const product = useProduct()

  return (
    <AuthorizedLayout
      seo={{
        title: t('productEdit.title', { name: product?.name || '' })
      }}
    >
      <div className="w-full min-h-screen bg-white">
        <SiteSettings />
      </div>
    </AuthorizedLayout>
  )
}
