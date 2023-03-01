import { Button, Form, Input, notification } from '@heyforms/ui'
import { IconX } from '@tabler/icons'
import { FC } from 'react'

import { useProductId } from '~/layout'
import { useBuilderContext } from '~/layout/builder2/context'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'

export const CodeInjection: FC = () => {
  const { siteSettings, updateSiteSettings } = useStore()
  const productId = useProductId()
  const { state, dispatch } = useBuilderContext()

  function handleClose() {
    dispatch({
      type: 'updateState',
      payload: {
        updates: {
          activeTabName: undefined
        }
      }
    })
  }

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

  if (state.activeTabName !== 'codeInjection') {
    return null
  }

  return (
    <div className="sidebar-container">
      <div className="flex items-center justify-between px-4 pb-2">
        <span>Code injection</span>
        <Button.Link className="-mr-3.5" leading={<IconX />} onClick={handleClose} />
      </div>

      <div className="flex-1 px-4">
        <Form.Custom
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
          <Form.Item name="customCode" rules={[{ required: true }]}>
            <Input.Textarea rows={8} />
          </Form.Item>
        </Form.Custom>
      </div>
    </div>
  )
}
