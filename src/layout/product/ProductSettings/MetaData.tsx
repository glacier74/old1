import { Form, Input, notification, useForm } from '@heyforms/ui'
import { IconSearch } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'

import { IconGoogle2 } from '~/components'
import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'

export const MetaData = () => {
  const { t } = useTranslation()
  const product = useProduct()
  const { updateProduct } = useStore()
  const [form] = useForm()

  const [values, setValues] = useState<AnyMap<string>>({})
  const url = useMemo(
    () => `${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`,
    [product.domain]
  )

  async function handleFinish(updates: any) {
    await ProductService.update(product!.id, updates)
    updateProduct(product!.id, updates)

    notification.success({
      title: t('productSettings.updated')
    })
  }

  function handleValuesChange(values: AnyMap<string>) {
    setValues(values)
  }

  useEffect(() => {
    setValues({
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription
    })
    form.resetFields()
  }, [product.domain])

  return (
    <div className="mt-1">
      <div className="flex flex-col md:flex-row justify-start space-x-8">
        <div className="w-full md:w-[32rem]">
          <Form.Custom
            form={form}
            initialValues={values}
            submitText={t('common.update')}
            submitOptions={{
              type: 'success'
            }}
            onlySubmitOnValueChange={true}
            onValuesChange={handleValuesChange}
            request={handleFinish}
          >
            <Form.Item
              name="metaTitle"
              className="mb-4"
              label={t('productSettings.metaData.title')}
              extra={value => (
                <div className="text-xs text-gray-500">
                  Recommended: <strong>70</strong> characters. You've used{' '}
                  <span className="text-green-500 font-bold">{value?.length}</span>
                </div>
              )}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="metaDescription"
              className="mb-4"
              label={t('productSettings.metaData.description2')}
              extra={value => (
                <div className="text-xs text-gray-500">
                  Recommended: <strong>156</strong> characters. You've used{' '}
                  <span className="text-green-500 font-bold">{value?.length}</span>
                </div>
              )}
            >
              <Input.Textarea rows={3} />
            </Form.Item>
          </Form.Custom>
        </div>

        <div className="w-full md:flex-1">
          <div className="form-item-label">Search engine result preview</div>
          <div className="w-full px-5 pt-8 pb-5 mt-2 border border-gray-300 shadow-sm rounded-md">
            <div className="flex flex-col mb-4">
              <div className="flex items-center mb-4">
                <IconGoogle2 className="h-[1.875rem] mr-8" />
                <div className="flex items-center justify-end w-full h-7 bg-gray-100 rounded-[0.875rem]">
                  <IconSearch className="w-5 h-5 mr-3 text-gray-400" />
                </div>
              </div>
              <div className="my-0.5 max-w-[21.25rem] font-serif text-[0.875rem] leading-[1.3] text-[#202124] whitespace-nowrap break-words text-ellipsis overflow-hidden">
                {url}
              </div>
              <div className="mb-1 pt-1 text-xl leading-[1.3] text-[#1a0dab] font-serif whitespace-nowrap break-words text-ellipsis overflow-hidden">
                {values.metaTitle}
              </div>
              <div className="font-serif text-[0.875rem] leading-[1.57] text-[#4d5156] font-serif">
                {values.metaDescription}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
