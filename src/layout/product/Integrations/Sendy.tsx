import { Button, Form, Input, Modal, Select, Tooltip, useForm } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { IconSettings, IconTrash } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, startTransition, useMemo, useState } from 'react'

import { useProductId } from '~/layout'
import { IntegrationService, SendyService } from '~/service'
import { useRequest, useVisible } from '~/utils'

import { useIntegrationsContext } from './context'

// Integration type
const TYPE = 'sendy'

export const Sendy: FC<{ integration: Integration }> = ({ integration }) => {
  const { t } = useTranslation()
  const productId = useProductId()
  const { reload } = useIntegrationsContext()

  const [form] = useForm()
  const [settingsVisible, openSettings, closeSettings] = useVisible()

  const [values, setValues] = useState((integration.settings || {}) as SendySettings)
  const [brands, setBrands] = useState<SendyBrand[]>([])
  const [lists, setLists] = useState<SendyBrand[]>([])

  const isConfigured = useMemo(() => {
    const settings = integration.settings as SendySettings

    return (
      isValid(settings) &&
      isValid(settings.serverUri) &&
      isValid(settings.apiKey) &&
      isValid(settings.listId)
    )
  }, [integration.settings])

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

  // Fetching brands
  const { loading: isFetchingBrands } = useRequest(
    async () => {
      setBrands([])

      if (settingsVisible && isValid(values.serverUri) && isValid(values.apiKey)) {
        setBrands(await SendyService.brands(values.serverUri, values.apiKey))

        // Reset form
        startTransition(() => {
          form.resetFields()
        })
      }
    },
    [settingsVisible, values.serverUri, values.apiKey],
    {
      fetchWhenDepsChange: true,
      errorNotify: true
    }
  )

  // Fetching lists
  const { loading: isFetchingLists } = useRequest(
    async () => {
      setLists([])

      if (settingsVisible && isValid(values.brandId)) {
        setLists(await SendyService.lists(values.serverUri, values.apiKey, values.brandId))

        // Reset form
        startTransition(() => {
          form.resetFields()
        })
      }
    },
    [settingsVisible, values.serverUri, values.apiKey, values.brandId],
    {
      fetchWhenDepsChange: true,
      errorNotify: true
    }
  )

  function handleValuesChange(_: any, values: any) {
    setValues(values)
  }

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
              <img className="h-8 w-8 aspect-1" src="/static/sendy.png" alt="" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <div className="text-sm font-medium text-gray-900 truncate">Sendy</div>
              {integration.isEnabled && <span className="ml-2 w-2 h-2 bg-green-500 rounded-full" />}
            </div>
            <p className="text-sm text-gray-500 truncate">
              Self hosted email newsletter application.
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
            <h1 className="text-lg leading-6 font-medium text-slate-900">Sendy</h1>
            <p className="mt-1 text-sm text-slate-500">Self hosted email newsletter application.</p>
          </div>

          <Form.Custom
            form={form}
            initialValues={values}
            submitText={t('common.saveChanges')}
            submitOptions={{
              type: 'success'
            }}
            onlySubmitOnValueChange
            request={handleFinish}
            onValuesChange={handleValuesChange}
          >
            <Form.Item
              name="serverUri"
              label="Sendy URL"
              description={
                <div className="text-sm mb-1">
                  Your Sendy installation URL. For example, if you installed Sendy on{' '}
                  <span className="text-green-500">http://mydomain.com/sendy</span>, your Sendy URL
                  is <span className="text-green-500">http://mydomain.com/sendy</span>.
                </div>
              }
              rules={[{ type: 'url', required: true }]}
            >
              <Input type="url" placeholder="Eg. http://mydomain.com/sendy" />
            </Form.Item>
            <Form.Item
              name="apiKey"
              label="API key"
              description={
                <div className="text-sm mb-1">
                  You can retrieve your API key from Sendy's main settings, eg.
                  http://your_sendy_installation_url/settings.
                </div>
              }
              rules={[{ required: true }]}
            >
              <Input placeholder="Eg. MGv22TEwANCtQ9mnNUpT" />
            </Form.Item>
            <Form.Item
              name="brandId"
              label="Brand"
              description="Select a brand which contains the list you want to subscribe a user to."
              rules={[{ required: true }]}
            >
              <Select
                options={brands as any}
                valueKey="id"
                labelKey="name"
                disabled={brands.length < 1}
                loading={isFetchingBrands}
              />
            </Form.Item>
            <Form.Item
              name="listId"
              label="List"
              description="Select a list you want to subscribe a user to."
              rules={[{ required: true }]}
            >
              <Select
                options={lists as any}
                valueKey="id"
                labelKey="name"
                disabled={lists.length < 1}
                loading={isFetchingLists}
              />
            </Form.Item>
          </Form.Custom>
        </div>
      </Modal>
    </>
  )
}
