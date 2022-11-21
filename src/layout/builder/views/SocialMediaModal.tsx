import { Form, Input, Modal } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { useSiteSettings } from '~/layout'
import { useBuilderContext } from '~/layout/builder/context'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'

export const SocialMediaModal: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useBuilderContext()

  const settings = useSiteSettings()
  const { updateSiteSettings } = useStore()

  async function handleFinish(updates: any) {
    updateSiteSettings(updates)
    await SiteSettingsService.update(settings.productId, updates)
  }

  function handleClose() {
    dispatch({
      type: 'update',
      payload: {
        isSocialMediaOpen: false
      }
    })
  }

  return (
    <Modal
      contentClassName="max-w-md"
      visible={state.isSocialMediaOpen}
      showCloseIcon
      onClose={handleClose}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-slate-900">
            {t('builder.socialMediaSettings')}
          </h1>
        </div>

        <Form.Custom
          initialValues={settings}
          submitText={t('common.update')}
          submitOptions={{
            type: 'primary'
          }}
          onlySubmitOnValueChange={true}
          request={handleFinish}
        >
          <Form.Item name="twitter" label={t('builder.twitter')}>
            <Input />
          </Form.Item>
          <Form.Item name="facebook" label={t('builder.facebook')}>
            <Input />
          </Form.Item>
          <Form.Item name="instagram" label={t('builder.instagram')}>
            <Input />
          </Form.Item>
          <Form.Item name="linkedin" label={t('builder.linkedin')}>
            <Input />
          </Form.Item>
          <Form.Item name="youtube" label={t('builder.youtube')}>
            <Input />
          </Form.Item>
          <Form.Item name="telegram" label={t('builder.telegram')}>
            <Input />
          </Form.Item>
          <Form.Item name="github" label={t('builder.github')}>
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}
