import { Button, Form, Input, Modal, Tooltip } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { IconSettings, IconTrash } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, useMemo } from 'react'

import { useProductId } from '~/layout'
import { IntegrationService } from '~/service'
import { useRequest, useVisible } from '~/utils'

import { useIntegrationsContext } from './context'

// Integration type
const TYPE = 'crisp'

export const Crisp: FC<{ integration: Integration }> = ({ integration }) => {
  const { t } = useTranslation('dashboard')
  const productId = useProductId()
  const { reload } = useIntegrationsContext()

  const [settingsVisible, openSettings, closeSettings] = useVisible()
  const isConfigured = useMemo(
    () => isValid((integration.settings as CrispSettings)?.websiteId),
    [integration.settings]
  )

  // Delete webhook
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

  async function handleFinish(settings: any) {
    await IntegrationService.update(productId, TYPE, {
      settings,
      isEnabled: true
    })

    reload()
    closeSettings()
  }

  return (
    <>
      <div className="py-2 space-y-2">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center p-2 rounded-full shadow">
              <img className="h-8 w-8 aspect-1" src="/static/crisp.png" alt="" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <div className="text-sm font-medium text-slate-900 truncate">Crisp</div>
              {integration.isEnabled && (
                <span className="ml-2 w-2 h-2 bg-emerald-500 rounded-full" />
              )}
            </div>
            <p className="text-sm text-slate-500 truncate">
              Free and beautiful chat for customer support on your landing page.
            </p>
          </div>
          <div>
            {isConfigured ? (
              <div className="flex items-center">
                <Tooltip ariaLabel="Edit">
                  <Button.Link leading={<IconSettings />} onClick={openSettings} />
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
              <Button className="!px-2.5 !py-1.5" onClick={openSettings}>
                Connect
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal
        contentClassName="max-w-lg"
        visible={settingsVisible}
        showCloseIcon
        onClose={closeSettings}
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-lg leading-6 font-medium text-slate-900">Crisp</h1>
            <p className="mt-1 text-sm text-slate-500">
              Free and beautiful chat for customer support on your landing page.
            </p>
          </div>

          <Form.Custom
            initialValues={integration.settings}
            submitText={t('common.saveChanges')}
            submitOptions={{
              type: 'success'
            }}
            onlySubmitOnValueChange
            request={handleFinish}
          >
            <Form.Item
              name="websiteId"
              label="Crisp WebsiteID"
              description={
                <div className="text-sm mb-1">
                  Your crisp WebsiteID, which is available inside your{' '}
                  <a
                    className="text-emerald-500"
                    href="https://help.crisp.chat/en/article/how-to-find-the-website-id-1ylqx1s/#1-how-to-find-the-websiteid"
                    target="_blank"
                    rel="noreferrer"
                  >
                    account settings
                  </a>
                  .
                </div>
              }
              rules={[{ required: true }]}
            >
              <Input placeholder="Eg. 94a763f2-dc78-4b13-c5ba-8b060b7e5532" />
            </Form.Item>
          </Form.Custom>
        </div>
      </Modal>
    </>
  )
}
