import { Form, Input, Modal, Switch, Table, Tooltip } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import { isNil } from '@nily/utils'
import { IconPencil } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, ReactNode, useCallback } from 'react'

import { RichTextEditor } from '~/components'
import { AutomatedEmailVariable } from '~/layout/builder2/rightSidebar/fields/AutomatedEmail'
import { useVisible } from '~/utils'

import { useOptions } from '../context'
import { OptionProps } from './OptionGroup'

interface AutomatedEmailOptionProps extends OptionProps {
  heading: ReactNode
  description: ReactNode
  defaultSubject: string
  defaultMessage: string
  variables: AutomatedEmailVariable[]
}

export const AutomatedEmailOption: FC<AutomatedEmailOptionProps> = ({
  parentName,
  schema,
  heading,
  description,
  defaultSubject,
  defaultMessage,
  variables
}) => {
  const { t } = useTranslation()
  const [visible, open, close] = useVisible()
  const { value, update } = useOptions<AnyMap<any>>(
    [parentName, schema.name].filter(Boolean).join('.')
  )

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

  const handleEnableChange = useCallback(
    (enableEmailNotification: boolean) => {
      const changes: AnyMap<any> = {
        enableEmailNotification
      }

      if (isNil(value?.emailNotificationSubject) && isNil(value?.emailNotificationMessage)) {
        changes.emailNotificationSubject = defaultSubject
        changes.emailNotificationMessage = defaultMessage
      }

      if (enableEmailNotification) {
        setTimeout(open, 0)
      }

      update({
        ...value,
        ...changes
      })
    },
    [defaultMessage, defaultSubject, open, update, value]
  )

  const handleFinish = useCallback(
    async (changes: any) => {
      update({
        ...value,
        ...changes
      })
      close()
    },
    [update, value]
  )

  return (
    <>
      <div className="builder-option">
        <div className="builder-option__title flex items-center justify-between">
          <div>{schema.title}</div>
          <div className="flex items-center gap-1">
            {value?.enableEmailNotification && (
              <Tooltip ariaLabel="Edit email template">
                <button className="builder-option__list-item-button bg-slate-200" onClick={open}>
                  <IconPencil className="!w-[18px] !h-[18px]" />
                </button>
              </Tooltip>
            )}
            <Switch value={value?.enableEmailNotification} onChange={handleEnableChange} />
          </div>
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
            <div className="mt-1 text-sm text-slate-500">{description}</div>
          </div>

          <Form.Custom
            initialValues={value}
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
