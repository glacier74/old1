import { Form, Input, Select, Switch } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { AvatarPickerField, Expandable } from '~/components'
import { LANGUAGE_OPTIONS } from '~/constants'

import { PublicSiteURL } from './PublicSiteURL'

export const General: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-900 uppercase">{t('productSettings.general.heading')}</div>

      <div className="bg-slate-50 rounded-lg divide-y divide-slate-100">
        <Expandable
          title="Product"
          description="The details used to identify your landing page around the web."
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

        <PublicSiteURL />

        <Expandable
          title="Language"
          description="Choose the language in which visitors will view your site. This applies to text that has not been customized by you, such as default buttons, errors, etc."
        >
          <Form.Item name="language">
            <Select className="w-full md:w-[10rem]" options={LANGUAGE_OPTIONS} />
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
