import { Form, Input, notification, useForm } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import { ImagePickerField } from '~/components'
import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'

export const MetaData = () => {
  const { t } = useTranslation()
  const product = useProduct()
  const { updateProduct } = useStore()
  const [form] = useForm()

  async function handleFinish(updates: any) {
    await ProductService.update(product!.id, updates)
    updateProduct(product!.id, updates)

    notification.success({
      title: t('productSettings.updated')
    })
  }

  useEffect(() => {
    form.resetFields()
  }, [product.domain])

  return (
    <div className="mt-1">
      <Form.Custom
        form={form}
        initialValues={product}
        submitText={t('common.update')}
        submitOptions={{
          type: 'success'
        }}
        onlySubmitOnValueChange={true}
        request={handleFinish}
      >
        <Form.Item name="metaTitle" className="mb-4" label={t('productSettings.metaData.title')}>
          <Input className="w-1/3" />
        </Form.Item>

        <Form.Item
          name="metaDescription"
          className="mb-4"
          label={t('productSettings.metaData.description2')}
        >
          <Input className="w-1/2" />
        </Form.Item>

        <Form.Item name="metaImage" className="mb-4" label={t('productSettings.metaData.image')}>
          <ImagePickerField
            className="text-sm"
            namespace="metaImage"
            tip1={t('productSettings.metaData.uploadTip1')}
            tip2={t('productSettings.metaData.uploadTip2')}
            width={400}
            height={210}
          />
        </Form.Item>
      </Form.Custom>
    </div>
  )
}
