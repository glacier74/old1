import { Button, Form, Modal, Select, Tooltip } from '@heyforms/ui'
import { IconTrash } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, useState } from 'react'

import { useProductId } from '~/layout'
import { OAuth } from '~/layout/product/Integrations/OAuth'
import { IntegrationService, MailchimpService } from '~/service'
import { useRequest, useVisible } from '~/utils'

import { useIntegrationsContext } from './context'

const TYPE = 'mailchimp'

export const Mailchimp: FC<{ integration: Integration }> = ({ integration }) => {
  const { t } = useTranslation()
  const productId = useProductId()
  const { reload } = useIntegrationsContext()
  const [visible, open, close] = useVisible()

  const [audiences, setAudiences] = useState<MailchimpAudience[]>([])

  // Delete integration
  const { loading: isDeleting, request: handleDelete } = useRequest(
    async () => {
      await IntegrationService.delete(productId, TYPE)
      reload()
    },
    [productId],
    {
      errorNotify: true
    }
  )

  // Fetch audiences
  const { loading: isFetching, request: fetchAudiences } = useRequest(
    async () => {
      const result = await MailchimpService.audiences(productId)
      setAudiences(result)
    },
    [productId],
    {
      errorNotify: true
    }
  )

  async function handleAuthorize() {
    const { authorizeUrl } = await MailchimpService.authorizeUrl()
    return authorizeUrl
  }

  async function handleConnect(code: string) {
    await MailchimpService.connect(productId, code)
    await fetchAudiences()
  }

  async function handleFinish(settings: any) {
    await IntegrationService.update(productId, TYPE, {
      settings,
      isEnabled: true
    })

    reload()
    close()
  }

  return (
    <>
      <div className="py-4 space-y-2">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center p-2 rounded-full shadow">
              <img className="h-8 w-8 aspect-1 object-cover" src="/static/mailchimp.png" alt="" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <div className="text-sm font-medium text-gray-900 truncate">Mailchimp</div>
              {integration.isEnabled && <span className="ml-2 w-2 h-2 bg-green-500 rounded-full" />}
            </div>
            <p className="text-sm text-gray-500 truncate">
              Auto-update contacts and manage targeted campaigns based on lead captures.
            </p>
          </div>
          <div>
            {integration.lastConfiguredAt && integration.settings?.audienceId ? (
              <Tooltip ariaLabel="Delete">
                <Button.Link leading={<IconTrash />} loading={isDeleting} onClick={handleDelete} />
              </Tooltip>
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
            <h1 className="text-lg leading-6 font-medium text-slate-900">Mailchimp</h1>
            <p className="mt-1 text-sm text-slate-500">
              Auto-update contacts and manage targeted campaigns based on lead captures.
            </p>
          </div>

          <OAuth
            name="Mailchimp"
            logo="/static/mailchimp.png"
            authorizeRequest={handleAuthorize}
            connectRequest={handleConnect}
          />

          <Form.Custom
            initialValues={{
              audienceId: integration.settings?.audienceId
            }}
            submitText={t('common.saveChanges')}
            submitOptions={{
              type: 'success'
            }}
            request={handleFinish}
          >
            <Form.Item name="audienceId" label="Select an audience" rules={[{ required: true }]}>
              <Select
                options={audiences as any}
                valueKey="id"
                labelKey="name"
                disabled={audiences.length < 1}
                loading={isFetching}
              />
            </Form.Item>
          </Form.Custom>
        </div>
      </Modal>
    </>
  )
}
