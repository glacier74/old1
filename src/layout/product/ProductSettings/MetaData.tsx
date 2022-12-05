import { Form, Input, notification } from '@heyforms/ui'
import { IconSearch } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

import { IconGoogle2, ImagePickerField } from '~/components'
import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'

import { OpenGraphImage } from './OpenGraphImage'

export const MetaData = () => {
  const { t } = useTranslation()
  const product = useProduct()
  const { updateProduct } = useStore()

  const [values, setValues] = useState<AnyMap<string>>({
    metaTitle: product.metaTitle || product.name,
    metaDescription: product.metaDescription || product.tagline
  })

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

  function handleValuesChange(_: AnyMap<string>, values: AnyMap<string>) {
    setValues(values)
  }

  return (
    <div className="mt-1">
      <Form.Custom
        initialValues={values}
        submitText={t('common.update')}
        submitOptions={{
          type: 'success',
          className: 'w-full mt-5 lg:mt-0 md:w-auto'
        }}
        onlySubmitOnValueChange={true}
        onValuesChange={handleValuesChange}
        request={handleFinish}
      >
        <div className="flex flex-col lg:flex-row justify-start space-y-2 lg:space-x-8 lg:space-y-0">
          <div className="w-full lg:w-1/2 lg:flex-1">
            <Form.Item
              name="metaTitle"
              className="mb-4"
              label={t('productSettings.metaData.title')}
              extra={value => (
                <div className="text-xs text-gray-500">
                  Recommended: <strong>70</strong> characters. You've used{' '}
                  <span className="text-green-500 font-bold">{value.length}</span>
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
                  <span className="text-green-500 font-bold">{value.length}</span>
                </div>
              )}
            >
              <Input.Textarea rows={5} />
            </Form.Item>

            <Form.Item
              name="openGraphImage"
              className="mb-4"
              label={
                <>
                  {t('productSettings.metaData.openGraphImage')}{' '}
                  <span className="px-1.5 py-0.5 bg-green-500 text-xs text-white rounded-[0.6rem]">
                    Pro
                  </span>
                </>
              }
            >
              <ImagePickerField
                className="!w-full !h-[12rem] md:!h-[20rem]"
                namespace="openGraphImage"
                width={800}
                height={420}
                enableUnsplash={false}
                disabled={true}
                tip1={t('productSettings.metaData.uploadTip1')}
                tip2={t('productSettings.metaData.uploadTip2')}
              />
            </Form.Item>
          </div>

          <div className="w-full lg:w-1/2 lg:flex-1">
            <div className="form-item-label">Search engine result preview</div>
            <div className="w-full p-4 mt-2 border border-gray-300 shadow-sm rounded-md">
              <div className="flex flex-col">
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

            <div className="mt-5">
              <div className="form-item-label">Social media preview</div>
              <div className="max-w-full mt-2 overflow-hidden text-black border border-gray-300 shadow-sm rounded-md">
                <div className="flex h-full flex-col items-center justify-center rounded-t-md">
                  <OpenGraphImage text={values.metaTitle} width={1200} height={630} />
                </div>
                <div className="font-serif break-words border-t border-gray-300 p-4 antialiased">
                  <div className="mb-[0.15em] truncate text-[14px] font-semibold leading-[18px]">
                    {values.metaTitle}
                  </div>
                  <div className="mt-[0.32em] block max-h-[2.6em] border-separate select-none overflow-hidden truncate whitespace-nowrap break-words text-left text-[14px] leading-[18px]">
                    {values.metaDescription}
                  </div>
                  <div className="mt-[0.32em] overflow-hidden truncate whitespace-nowrap text-[14px] lowercase leading-[18px] text-[#8899a6]">
                    {url}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form.Custom>
    </div>
  )
}
