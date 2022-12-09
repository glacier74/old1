import { Form, Input, Tooltip, notification } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { useProduct } from '~/layout'
import { ProductService } from '~/service'
import { useStore } from '~/store'

export const Domain = () => {
  const { t } = useTranslation()
  const product = useProduct()
  const { updateProduct } = useStore()

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

  return (
    <div className="pt-4">
      <div className="form-item-label">{t('createProduct.publicSiteURL')}</div>
      <div>
        <Form.Custom
          inline
          initialValues={{
            domain: product.domain
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
            name="domain"
            className="md:max-w-[20rem]"
            rules={[
              {
                required: true,
                pattern: /^[a-z0-9-]{3,}$/i,
                message: t('createProduct.invalidDomain')
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Form.Custom>
        <div className="form-item-description mt-1">
          {t('productSettings.domain.description')}{' '}
          <Tooltip ariaLabel={t('productSettings.domain.copyTip')}>
            <CopyToClipboard text={`https://${url}`} onCopy={handleCopy}>
              <span className="underline cursor-pointer">{url}</span>
            </CopyToClipboard>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
