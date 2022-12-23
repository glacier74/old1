import { Button, Form, Input, Modal, Tooltip } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { IconClockPlay, IconSettings, IconTrash } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { useProductId } from '~/layout'
import { WebhookService } from '~/service'
import { useRequest, useVisible } from '~/utils'

import { useIntegrationsContext } from './context'

export const Webhook: FC<{ integration: Integration }> = ({ integration }) => {
  const { t } = useTranslation()
  const productId = useProductId()
  const { reload } = useIntegrationsContext()
  const [visible, open, close] = useVisible()

  // Delete webhook
  const { loading: isDeleting, request: handleDelete } = useRequest(
    async () => {
      await WebhookService.delete(productId, integration.webhookId)
      reload()
    },
    [productId, integration.webhookId],
    {
      errorNotify: true
    }
  )

  async function handleFinish(updates: any) {
    if (isValid(integration.webhookId)) {
      await WebhookService.update(productId, integration.webhookId, updates)
    } else {
      await WebhookService.create(productId, updates)
    }

    reload()
    close()
  }

  return (
    <>
      <div className="py-4 space-y-2">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center p-2 rounded-full shadow">
              <img className="h-8 w-8 aspect-1" src="/static/webhook.png" alt="" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <div className="text-sm font-medium text-gray-900 truncate">Webhook</div>
              {integration.isEnabled && <span className="ml-2 w-2 h-2 bg-green-500 rounded-full" />}
            </div>
            <p className="text-sm text-gray-500 truncate">
              Send events for new lead capture to HTTP endpoints
            </p>
          </div>
          <div>
            {integration.webhookId ? (
              <div className="flex items-center">
                <Tooltip ariaLabel="Webhook logs">
                  <Button.Link leading={<IconClockPlay />} />
                </Tooltip>
                <Tooltip ariaLabel="Edit">
                  <Button.Link leading={<IconSettings />} onClick={open} />
                </Tooltip>
                <Tooltip ariaLabel="Delete">
                  <Button.Link
                    leading={<IconTrash />}
                    loading={isDeleting}
                    onClick={handleDelete}
                  />
                </Tooltip>
              </div>
            ) : (
              <Button className="!px-2.5 !py-1.5" onClick={open}>
                Connect
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal contentClassName="max-w-lg" visible={visible} showCloseIcon onClose={close}>
        <div className="space-y-6">
          <div>
            <h1 className="text-lg leading-6 font-medium text-slate-900">Webhook</h1>
            <p className="mt-1 text-sm text-slate-500">
              Webhooks allow you to receive HTTP POST requests to a URL for new lead captures.
            </p>
          </div>

          <Form.Custom
            initialValues={{
              url: integration.webhookUrl
            }}
            submitText={t('common.saveChanges')}
            submitOptions={{
              type: 'success'
            }}
            request={handleFinish}
          >
            <Form.Item name="url" label="Endpoint URL" rules={[{ type: 'url', required: true }]}>
              <Input type="url" placeholder="https://..." />
            </Form.Item>
          </Form.Custom>
        </div>
      </Modal>
    </>
  )
}
