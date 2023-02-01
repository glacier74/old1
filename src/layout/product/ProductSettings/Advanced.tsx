import { Form, Input } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { Expandable, SwitchField } from '~/components'
import { PLAN_LEVELS } from '~/constants'
import { PlanBadge, PlanCheck } from '~/layout/product/PlanCheck'

export const Advanced: FC<{ values: any }> = ({ values }) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-900 uppercase">Advanced</div>

      <div className="bg-slate-50 rounded-lg divide-y divide-gray-100">
        <div className="expandable expandable-advanced px-6 pt-5 py-5">
          <Form.Item name="isSitePrivate">
            <SwitchField
              label={t('productSettings.sitePrivate.heading')}
              description={t('productSettings.sitePrivate.description')}
            />
          </Form.Item>

          {values.isSitePrivate && (
            <Form.Item
              name="sitePassword"
              className="md:max-w-[20rem]"
              extra={<span className="text-slate-500">Set the password for this site</span>}
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
          )}
        </div>

        <div className="expandable expandable-advanced px-6 pt-5 py-5">
          <PlanCheck className="cursor-pointer" minimalLevel={PLAN_LEVELS.plan_superior}>
            <Form.Item className="mb-0" name="removeBranding">
              <SwitchField
                label={
                  <>
                    {t('productSettings.removeBranding.heading')}
                    <PlanBadge className="ml-2" minimalLevel={PLAN_LEVELS.plan_superior} />
                  </>
                }
                description={t('productSettings.removeBranding.description')}
              />
            </Form.Item>
          </PlanCheck>
        </div>

        <PlanCheck className="cursor-pointer" minimalLevel={PLAN_LEVELS.plan_shipper}>
          <Expandable
            title={
              <>
                <span>Code injection</span>
                <PlanBadge className="ml-2" minimalLevel={PLAN_LEVELS.plan_shipper} />
              </>
            }
            description="EarlyBird allows you to inject code into the bottom of your landing page. This allows for quick modifications to insert useful things like tracking codes and meta tags."
          >
            <Form.Item className="mb-0" name="customCode">
              <Input.Textarea className="w-full !max-w-full" rows={8} />
            </Form.Item>
          </Expandable>
        </PlanCheck>
      </div>
    </div>
  )
}
