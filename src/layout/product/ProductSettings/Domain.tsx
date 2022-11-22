import { Form, Input, Tooltip, notification, useForm } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'

export const Domain = () => {
  const { t } = useTranslation()
  const product = useProduct()
  const { updateProduct } = useStore()
  const [form] = useForm()

  const url = useMemo(
    () => `${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`,
    [product.domain]
  )

  async function handleFinish(updates: any) {
    await ProductService.update(product!.id, updates)
    updateProduct(product!.id, updates)
  }

  function handleCopy() {
    notification.success({
      title: t('productSettings.domain.copiedTip')
    })
  }

  useEffect(() => {
    form.resetFields()
  }, [product.domain])

  return (
    <div className="pt-4">
      <div className="form-item-label">{t('onboarding.publicSiteURL')}</div>
      <div>
        <Form.Custom
          form={form}
          className="w-80"
          inline
          initialValues={{
            domain: product.domain
          }}
          submitText={t('common.update')}
          submitOptions={{
            className: 'ml-2',
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
          {t('productSettings.domain.description')}{' '}
          <Tooltip ariaLabel={t('productSettings.domain.copyTip')}>
            <CopyToClipboard text={`https://${url}`} onCopy={handleCopy}>
              <span className="underline cursor-pointer">{url}</span>
            </CopyToClipboard>
          </Tooltip>
        </p>
      </div>
    </div>
  )
}
