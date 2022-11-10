import { Form, Input } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'

import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'

export const Domain = () => {
  const { t } = useTranslation()
  const product = useProduct()
  const { updateProduct } = useStore()

  async function handleFinish(updates: any) {
    await ProductService.update(product!.id, updates)
    updateProduct(product!.id, updates)
  }

  return (
    <div className="pt-4">
      <div className="form-item-label">{t('onboarding.publicSiteURL')}</div>
      <div>
        <Form.Custom
          className="w-96"
          inline
          initialValues={{
            domain: product.domain
          }}
          submitText="Update"
          submitOptions={{
            type: 'primary'
          }}
          onlySubmitOnValueChange={true}
          request={handleFinish}
        >
          <Form.Item
            name="domain"
            rules={[
              {
                required: true,
                pattern: /^[a-z0-9-]{3,}$/i,
                message: t('onboarding.invalidDomain')
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Form.Custom>
        <p className="form-item-description mt-1">
          {t('productSettings.domain.description2')}:{' '}
          <span className="underline">{`${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`}</span>
        </p>
      </div>
    </div>
  )
}
