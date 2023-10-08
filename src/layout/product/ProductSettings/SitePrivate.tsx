import { Form, Input, notification } from '@heyforms/ui'
import { isEmpty, random } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import { SwitchField } from '~/components'
import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'
import { useRequest } from '~/utils'

export const SitePrivate = () => {
  const { t } = useTranslation('dashboard')
  const product = useProduct()
  const { updateProduct } = useStore()

  const { loading, error, request } = useRequest(
    async (isSitePrivate: boolean) => {
      const updates: Partial<Product> = {
        isSitePrivate
      }

      if (isEmpty(product.sitePassword)) {
        updates.sitePassword = random.alphaNumeric(6)
      }

      await ProductService.update(product!.id, updates)
      updateProduct(product!.id, updates)

      notification.success({
        title: t('productSettings.updated')
      })
    },
    [product]
  )

  async function handleFinish(updates: any) {
    await ProductService.update(product!.id, updates)
    updateProduct(product!.id, updates)
  }

  useEffect(() => {
    if (error) {
      notification.error({
        title: t(error.message)
      })
    }
  }, [error])

  return (
    <div>
      <SwitchField
        className="pt-4"
        label={t('productSettings.sitePrivate.heading')}
        description={t('productSettings.sitePrivate.description')}
        value={product.isSitePrivate}
        loading={loading}
        onChange={request}
      />

      {product.isSitePrivate && (
        <>
          <Form.Custom
            className="mt-2"
            inline
            initialValues={{
              sitePassword: product.sitePassword
            }}
            submitText={t('common.update')}
            submitOptions={{
              className: 'ml-2',
              type: 'success'
            }}
            onlySubmitOnValueChange={true}
            request={handleFinish}
          >
            <Form.Item
              name="sitePassword"
              className="md:max-w-[20rem]"
              rules={[
                {
                  required: true,
                  pattern: /^[a-z0-9]{4,16}$/i,
                  message: t('productSettings.sitePrivate.invalidPassword')
                }
              ]}
            >
              <Input placeholder={t('productSettings.sitePrivate.placeholder')} />
            </Form.Item>
          </Form.Custom>
        </>
      )}
    </div>
  )
}
