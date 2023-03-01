import { Button, Form, Input, Modal, Switch, Table, Tooltip } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import { isNil } from '@nily/utils'
import { IconPencil } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, ReactNode } from 'react'

import { RichTextEditor } from '~/components'
import { useVisible } from '~/utils'

export interface AutomatedEmailVariable {
  variable: string
  description: ReactNode
}

interface AutomatedEmailProps {
  setting: any
  updateSetting: (value: any, key?: string | undefined) => void
  heading: ReactNode
  description: ReactNode
  defaultSubject: string
  defaultMessage: string
  variables: AutomatedEmailVariable[]
}

export const AutomatedEmail: FC<AutomatedEmailProps> = ({
  setting,
  updateSetting,
  heading,
  description,
  defaultSubject,
  defaultMessage,
  variables
}) => {
  const { t } = useTranslation()
  const [visible, open, close] = useVisible()

  // Table columns
  const columns: TableColumn<AutomatedEmailVariable>[] = [
    {
      key: 'variable',
      name: 'Variable'
    },
    {
      key: 'description',
      name: 'Description'
    }
  ]

  function handleChange(enableEmailNotification: boolean) {
    if (enableEmailNotification) {
      if (isNil(setting.emailNotificationSubject) && isNil(setting.emailNotificationMessage)) {
        updateSetting(defaultSubject, 'emailNotificationSubject')
        updateSetting(defaultMessage, 'emailNotificationMessage')
      }

      setTimeout(() => {
        open()
      }, 0)
    }

    updateSetting(enableEmailNotification, 'enableEmailNotification')
  }

  async function handleFinish(updates: any) {
    Object.keys(updates).forEach(key => {
      updateSetting(updates[key], key)
    })

    close()
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-900">{heading}</span>
        <div className="flex items-center space-x-1">
          {setting.enableEmailNotification && (
            <Tooltip ariaLabel="Edit email template">
              <Button.Link leading={<IconPencil />} onClick={open} />
            </Tooltip>
          )}
          <Switch value={setting.enableEmailNotification} onChange={handleChange} />
        </div>
      </div>

      <Modal
        contentClassName="max-w-2xl block-settings-modal"
        visible={visible}
        maskClosable={false}
        showCloseIcon
        onClose={close}
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-lg leading-6 font-medium text-slate-900">{heading}</h2>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>

          <Form.Custom
            initialValues={setting}
            submitText={t('common.saveChanges')}
            submitOptions={{
              type: 'success'
            }}
            onlySubmitOnValueChange
            request={handleFinish}
          >
            <Form.Item name="emailNotificationSubject" label="Subject" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="emailNotificationMessage" label="Message" rules={[{ required: true }]}>
              <RichTextEditor />
            </Form.Item>
          </Form.Custom>

          <div>
            <div className="mb-2 text-sm text-slate-700">
              You can use the following variables enclosed in curly braces {}, which will be
              replaced with their corresponding values.
            </div>

            <Table<AutomatedEmailVariable>
              className="table-compact"
              columns={columns}
              data={variables}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
