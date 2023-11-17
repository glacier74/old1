import { Form, Input, Select, Switch } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { AvatarPickerField, Expandable } from '~/components'
import { LANGUAGE_OPTIONS } from '~/constants'

import { PublicSiteURL } from './PublicSiteURL'

export const General: FC = () => {
  const { t } = useTranslation('dashboard')

  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-900 uppercase">{t('productSettings.general.heading')}</div>

      <div className="bg-slate-50 rounded-lg divide-y divide-slate-100">
        <Expandable
          title={t('productSettings.general.product')}
          description={t('productSettings.general.productDesc')}
        >
          <Form.Item name="logo" label="Favicon">
            <AvatarPickerField enableUnsplash={false} />
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
          title={t('productSettings.language.heading')}
          description={t('productSettings.language.description')}
        >
          <Form.Item name="language">
            <Select className="w-full md:w-[10rem]" options={LANGUAGE_OPTIONS} />
          </Form.Item>
        </Expandable>

        <div className="px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="text-sm">
              <h4 className="text-base text-slate-900 font-bold">
                {t('productSettings.general.conversionNotification')}
              </h4>
              <p className="mt-1 text-slate-500 font-normal">
                {t('productSettings.general.conversionNotificationDesc')}
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
