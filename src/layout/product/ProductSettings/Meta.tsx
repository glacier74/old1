import { Form, Input } from '@heyforms/ui'
import { IconSearch } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, useMemo } from 'react'

import { Expandable, IconGoogle2, ImagePickerField } from '~/components'
import { PLAN_LEVELS } from '~/constants'
import { useProductId } from '~/layout'
import { PlanBadge, PlanCheck } from '~/layout/product/PlanCheck'

import { OpenGraphImage } from './OpenGraphImage'

export const Meta: FC<{ values: any }> = ({ values }) => {
  const { t } = useTranslation()
  const productId = useProductId()

  const url = useMemo(
    () => `${values.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`,
    [values.domain]
  )

  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-900 uppercase">Site meta settings</div>

      <div className="bg-slate-50 rounded-lg divide-y divide-slate-100">
        <Expandable
          title="Meta title & description"
          description="The details used to identify your landing page around the web."
        >
          <div className="flex flex-col lg:flex-row justify-start space-y-2 lg:space-x-8 lg:space-y-0">
            <div className="w-full lg:w-1/2 lg:flex-1">
              <Form.Item
                name="metaTitle"
                className="mb-4"
                label="Meta title"
                extra={value => (
                  <div className="text-xs text-slate-500">
                    Recommended: <strong>70</strong> characters. You've used{' '}
                    <span className="text-emerald-500 font-semibold">{value?.length || 0}</span>
                  </div>
                )}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="metaDescription"
                className="mb-4"
                label="Meta description"
                extra={value => (
                  <div className="text-xs text-slate-500">
                    Recommended: <strong>156</strong> characters. You've used{' '}
                    <span className="text-emerald-500 font-semibold">{value?.length || 0}</span>
                  </div>
                )}
              >
                <Input.Textarea rows={3} />
              </Form.Item>
            </div>

            {/* Preview */}
            <div className="w-full lg:w-1/2 lg:flex-1">
              <div className="text-sm text-slate-700">Search engine result preview</div>
              <div className="w-full p-4 mt-1 border border-slate-300 bg-white shadow-sm rounded-md">
                <div className="flex flex-col">
                  <div className="flex items-center mb-4">
                    <IconGoogle2 className="h-[1.875rem] mr-8" />
                    <div className="flex items-center justify-end w-full h-7 bg-slate-100 rounded-[0.875rem]">
                      <IconSearch className="w-5 h-5 mr-3 text-slate-400" />
                    </div>
                  </div>
                  <div className="my-0.5 max-w-[21.25rem] font-serif text-[0.875rem] leading-[1.3] text-[#202124] whitespace-nowrap break-words text-ellipsis overflow-hidden">
                    {url}
                  </div>
                  <div className="mb-1 pt-1 text-xl leading-[1.3] text-[#1a0dab] font-serif whitespace-nowrap break-words text-ellipsis overflow-hidden">
                    {values.metaTitle || values.name}
                  </div>
                  <div className="font-serif text-[0.875rem] leading-[1.57] text-[#4d5156] font-serif break-words">
                    {values.metaDescription || values.tagline}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Expandable>

        <Expandable
          title="Open graph"
          description="Customize structured data that appears when you post site to your social accounts"
        >
          <div className="flex flex-col lg:flex-row justify-start space-y-2 lg:space-x-8 lg:space-y-0">
            <div className="w-full lg:w-1/2 lg:flex-1">
              <PlanCheck
                className="cursor-pointer"
                minimalLevel={PLAN_LEVELS.plan_starter}
                redirectUrl={`/product/${productId}/settings`}
              >
                <Form.Item
                  name="openGraphImage"
                  className="mb-4"
                  label={
                    <>
                      {t('productSettings.metaData.openGraphImage')}
                      <PlanBadge className="ml-2" minimalLevel={PLAN_LEVELS.plan_starter} />
                    </>
                  }
                >
                  <ImagePickerField
                    className="!w-full !h-[12rem] md:!h-[20rem]"
                    pickerButtonClassName="!bg-white rounded-md border border-slate-300 shadow-sm"
                    namespace="openGraphImage"
                    width={800}
                    height={420}
                    enableUnsplash={false}
                    tip1={t('productSettings.metaData.uploadTip1')}
                    tip2={t('productSettings.metaData.uploadTip2')}
                  />
                </Form.Item>
              </PlanCheck>
            </div>

            {/* Preview */}
            <div className="w-full lg:w-1/2 lg:flex-1">
              <div className="text-sm text-slate-700">Search engine result preview</div>
              <div className="max-w-full mt-1 overflow-hidden text-black border border-slate-300 bg-white shadow-sm rounded-md">
                <div className="flex h-full flex-col items-center justify-center rounded-t-md">
                  <OpenGraphImage
                    name={values.name}
                    metaTitle={values.metaTitle?.slice(0, 60)}
                    metaDescription={(values.metaDescription || values.tagline)?.slice(0, 120)}
                  />
                </div>
                <div className="font-serif break-words border-t border-slate-300 p-4 antialiased">
                  <div className="mb-[0.15em] truncate text-[14px] font-semibold leading-[18px]">
                    {values.metaTitle || values.name}
                  </div>
                  <div className="mt-[0.32em] block max-h-[2.6em] border-separate select-none overflow-hidden truncate whitespace-nowrap break-words text-left text-[14px] leading-[18px]">
                    {values.metaDescription || values.tagline}
                  </div>
                  <div className="mt-[0.32em] overflow-hidden truncate whitespace-nowrap text-[14px] lowercase leading-[18px] text-[#8899a6]">
                    {url}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Expandable>
      </div>
    </div>
  )
}
