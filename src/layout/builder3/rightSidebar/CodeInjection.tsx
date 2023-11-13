import { Form, Input, notification } from '@heyforms/ui'

import { useProductId } from '~/layout/hook'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'

export const CodeInjection = () => {
  const { siteSettings, updateSiteSettings } = useStore()
  const productId = useProductId()

  async function handleFinish(values: any) {
    const updates: Partial<SiteSettings> = {
      customCode: values.customCode
    }

    await SiteSettingsService.updateSettings(productId, updates)
    updateSiteSettings(updates)

    notification.success({
      title: 'Code injection have been updated successfully'
    })
  }

  return (
    <Form.Custom
      className="px-4"
      initialValues={{
        customCode: siteSettings.customCode
      }}
      submitText="Save changes"
      submitOptions={{
        type: 'success',
        className: '-mt-2 w-full'
      }}
      request={handleFinish}
      onlySubmitOnValueChange
    >
      <Form.Item name="customCode" rules={[{ required: false }]}>
        <Input.Textarea rows={13} />
      </Form.Item>
    </Form.Custom>
  )
}
