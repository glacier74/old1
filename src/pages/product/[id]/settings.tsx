import { Button, notification, useForm } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { ProductLayout, ProductSettings as Settings, useProductId } from '~/layout'
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
  const { t } = useTranslation()
  const productId = useProductId()
  const { isReady, updateProduct } = useStore()

  const [form] = useForm()
  const [loading, setLoading] = useState(false)

  function handleSubmit() {
    form.submit()
  }

  async function handleFinish(values: any) {
    setLoading(true)

    try {
      await ProductService.update(productId, values)
      updateProduct(productId, values)
    } catch (err: any) {
      notification.error({
        title: t(err.message)
      })
    }

    setLoading(false)
  }

  return (
    <ProductLayout seo={{ title: 'productSettings.title' }}>
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-3xl leading-6 font-bold text-slate-900">
          {t('productSettings.heading')}
        </h1>

        <Button type="success" loading={loading} onClick={handleSubmit}>
          Save
        </Button>
      </div>

      {isReady ? <Settings form={form} onFinish={handleFinish} /> : <Skeleton />}
    </ProductLayout>
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

export default ProductSettings
