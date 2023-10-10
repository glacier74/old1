import { Button, notification, useForm } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ProductSidebarLayout, ProductSettings as Settings, useProductId } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'
import { withTranslations } from '~/utils'

const Skeleton = () => {
  return (
    <div className="min-w-0 pt-1 space-y-4">
      <div className="rounded-sm skeleton" style={{ width: 120, height: 18 }}></div>
      <div className="rounded-sm skeleton" style={{ width: 500, height: 14 }}></div>
      <div className="rounded-sm skeleton" style={{ width: 500, height: 14 }}></div>
      <div className="rounded-sm skeleton" style={{ width: 500, height: 14 }}></div>
    </div>
  )
}

const ProductSettings = (): JSX.Element => {
  const { t } = useTranslation('dashboard')
  const productId = useProductId()
  const { isReady, updateProduct } = useStore()

  const [form] = useForm()
  const [loading, setLoading] = useState(false)
  const [isValueChanged, setValueChanged] = useState(false)

  function handleSubmit() {
    form.submit()
  }

  async function handleFinish(values: any) {
    setLoading(true)

    try {
      await ProductService.update(productId, values)
      updateProduct(productId, values)

      notification.success({
        title: t('productSettings.updated')
      })
    } catch (err: any) {
      notification.error({
        title: t(err.message)
      })
    }

    setLoading(false)
  }

  return (
    <ProductSidebarLayout seo={{ title: t('productSettings.title') }}>
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-3xl leading-6 font-bold text-slate-900">
          {t('productSettings.heading')}
        </h1>
      </div>

      {isReady ? (
        <>
          <Settings form={form} onValueChanged={setValueChanged} onFinish={handleFinish} />

          <div className="fixed left-0 md:left-[18rem] bottom-0 right-0 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 md:px-8">
              <Button
                type="success"
                className="w-full h-[36px] md:w-auto"
                loading={loading}
                disabled={!isValueChanged}
                onClick={handleSubmit}
              >
                {t('saveChanges')}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <Skeleton />
      )}
    </ProductSidebarLayout>
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

export default ProductSettings
