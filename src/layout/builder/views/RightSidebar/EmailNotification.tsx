import { Button, Form, Input, Modal, Switch, Table, Tooltip } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import { isNil } from '@nily/utils'
import { IconPencil } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, ReactNode } from 'react'

import { useBuilderContext } from '~/layout/builder/context'
import { useVisible } from '~/utils'

import { RichText } from '../RichText'

export interface EmailNotificationVariable {
  variable: string
  description: ReactNode
}

interface EmailNotificationProps {
  block: any
  heading: ReactNode
  description: ReactNode
  defaultSubject: string
  defaultMessage: string
  variables: EmailNotificationVariable[]
}

export const EmailNotification: FC<EmailNotificationProps> = ({
  block,
  heading,
  description,
  defaultSubject,
  defaultMessage,
  variables
}) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()
  const [visible, open, close] = useVisible()

  // Table columns
  const columns: TableColumn<EmailNotificationVariable>[] = [
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
    const updates: Partial<EmailCaptureBlock> = {
      enableEmailNotification
    }

    if (enableEmailNotification) {
      if (isNil(block.emailNotificationSubject) && isNil(block.emailNotificationMessage)) {
        updates.emailNotificationSubject = defaultSubject
        updates.emailNotificationMessage = defaultMessage
      }

      open()
    }

    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates
      }
    })
  }

  async function handleFinish(updates: any) {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates
      }
    })
    close()
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-900">Email Notification</span>
        <div className="flex items-center space-x-1">
          {block.enableEmailNotification && (
            <Tooltip ariaLabel="Edit email template">
              <Button.Link leading={<IconPencil />} onClick={open} />
            </Tooltip>
          )}
          <Switch value={block.enableEmailNotification} onChange={handleChange} />
        </div>
      </div>

      <Modal
        contentClassName="max-w-2xl block-settings-modal"
        visible={visible}
        showCloseIcon
        onClose={close}
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-lg leading-6 font-medium text-slate-900">{heading}</h2>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>

          <Form.Custom
            initialValues={block}
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
              <RichText blockId="" multiple={true} enterBehavior={undefined} />
            </Form.Item>
          </Form.Custom>

          <div>
            <div className="mb-2 text-sm text-slate-700">
              You can use the following variables enclosed in curly braces {}, which will be replaced with their corresponding values.
            </div>
            <Table<EmailNotificationVariable> columns={columns} data={variables} />
          </div>
        </div>
      </Modal>
    </>
  )
}
