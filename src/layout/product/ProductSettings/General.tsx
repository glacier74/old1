import { Form, Input, Select, Switch, Tooltip, notification } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC, useMemo } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { AvatarPickerField, Expandable } from '~/components'
import { LANGUAGE_OPTIONS } from '~/constants'
import { useProduct, useProductId } from '~/layout'
import { ProductService } from '~/service'

export const General: FC<{ values: any }> = ({ values }) => {
  const { t } = useTranslation()
  const productId = useProductId()
  const product = useProduct()

  const url = useMemo(
    () => `${values.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`,
    [values.domain]
  )

  function handleCopy() {
    notification.success({
      title: t('productSettings.domain.copiedTip')
    })
  }

  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-900 uppercase">{t('productSettings.general.heading')}</div>

      <div className="bg-slate-50 rounded-lg divide-y divide-gray-100">
        <Expandable
          title="Product"
          description="The details used to identify your product around the web"
        >
          <Form.Item name="logo">
            <AvatarPickerField namespace="avatar" enableUnsplash={false} />
          </Form.Item>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="tagline" label="Tagline">
            <Input />
          </Form.Item>
        </Expandable>

        <Expandable
          title="Public site URL"
          description={
            <div>
              {t('productSettings.domain.description')}{' '}
              <Tooltip ariaLabel={t('productSettings.domain.copyTip')}>
                <CopyToClipboard text={`https://${url}`} onCopy={handleCopy}>
                  <span className="underline cursor-pointer">{url}</span>
                </CopyToClipboard>
              </Tooltip>
            </div>
          }
        >
          <Form.Item
            name="domain"
            validateTrigger={['onBlur', 'onChange']}
            rules={[
              {
                required: true,
                async validator(rule, value) {
                  if (product.domain !== value) {
                    await ProductService.checkDomain(value, productId)
                  }
                }
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Expandable>

        <Expandable
          title="Language"
          description="Choose in what language the visitors will see your site. This applies to the text which is not customized by you e.g. default buttons, errors, etc."
        >
          <Form.Item name="language">
            <Select options={LANGUAGE_OPTIONS} />
          </Form.Item>
        </Expandable>

        <div className="px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="text-sm">
              <h4 className="text-base text-slate-900 font-bold">Lead capture notification</h4>
              <p className="mt-1 text-slate-500 font-normal">
                When a new lead capture action is triggered on your landing page, an email
                notification will be sent.
              </p>
            </div>
            <Form.Item name="leadCaptureNotification">
              <Switch />
            </Form.Item>
          </div>
        </div>
      </div>
    </div>
  )
}
