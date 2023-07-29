import { Button, EmptyStates, Form, Input, Modal, Table, Tooltip } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import { isValid } from '@nily/utils'
import {
  IconChevronRight,
  IconClockPlay,
  IconSettings,
  IconTrash,
  IconWebhook
} from '@tabler/icons'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { FC, useMemo, useRef, useState } from 'react'

import { AsyncRequest, AsyncRequestInstance, Loading, Pagination2 } from '~/components'
import { useProductId } from '~/layout'
import { WebhookService } from '~/service'
import { useRequest, useVisible } from '~/utils'

import { useIntegrationsContext } from './context'

const WebhookLogModal: FC<IModalProps & { productId: number; webhookId: number }> = ({
  visible,
  productId,
  webhookId,
  onClose
}) => {
  const asyncRequestRef = useRef<AsyncRequestInstance>()

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [logs, setLogs] = useState<WebhookLog[]>([])

  const { loading, request } = useRequest(async () => {
    await WebhookService.sampleEvent(productId, webhookId)
    asyncRequestRef.current?.reload()
  })

  // Table columns
  const columns: TableColumn<WebhookLog>[] = [
    {
      key: 'deliveryStatus',
      name: 'Delivery status',
      render(row, _, isExpanded) {
        const className =
          row.deliveryStatus === 'succeeded'
            ? 'bg-emerald-50 text-emerald-500'
            : 'bg-red-50 text-red-500'

        return (
          <div className="flex items-center cursor-pointer">
            <IconChevronRight
              className={clsx('w-5 h-5 text-slate-500', { 'rotate-90': isExpanded })}
            />
            <span
              className={clsx('ml-1.5 text-xs font-bold uppercase px-1 py-0.5 rounded', className)}
            >
              {row.deliveryStatus}
            </span>
          </div>
        )
      }
    },
    {
      key: 'eventId',
      name: 'Event ID'
    },
    {
      key: 'createdAt',
      name: 'Created at',
      render(row) {
        return dayjs(row.createdAt).format('MMM DD, hh:mm A')
      }
    }
  ]

  function expandedRender(row: WebhookLog) {
    return (
      <>
        <tr className="table-expanded-row">
          <td>HTTP status code</td>
          <td colSpan={2}>{row.statusCode}</td>
        </tr>
        <tr className="table-expanded-row">
          <td>Request to your endpoint</td>
          <td colSpan={2}>
            <pre>
              <code>{row.payload}</code>
            </pre>
          </td>
        </tr>
        <tr className="table-expanded-row">
          <td>Response</td>
          <td colSpan={2}>
            <pre>
              <code>{row.response}</code>
            </pre>
          </td>
        </tr>
      </>
    )
  }

  async function fetchData() {
    const result = await WebhookService.logs(productId, webhookId, page)

    setTotal(result.count)
    setLogs(result.logs)

    return result.count > 0
  }

  return (
    <Modal contentClassName="max-w-5xl" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg leading-6 font-medium text-slate-900">Webhook logs</h1>
          <p className="mt-1 text-sm text-slate-500">
            These logs contains all requests made to your webhook endpoint.
          </p>
        </div>

        <AsyncRequest
          ref={asyncRequestRef as any}
          request={fetchData}
          deps={[productId, webhookId, page]}
          skeleton={<Loading />}
          emptyState={
            <EmptyStates
              icon={<IconWebhook />}
              title="No logs yet"
              description="This webhook hasn't received any events so far."
              action={
                <Button loading={loading} onClick={request}>
                  Send test event
                </Button>
              }
            />
          }
        >
          <Table<WebhookLog> columns={columns} data={logs} expandedRender={expandedRender} />
          <Pagination2 total={total} page={page} onChange={setPage} />
        </AsyncRequest>
      </div>
    </Modal>
  )
}

export const Webhook: FC<{ integration: Integration }> = ({ integration }) => {
  const { t } = useTranslation()
  const productId = useProductId()
  const { reload } = useIntegrationsContext()

  const [settingsVisible, openSettings, closeSettings] = useVisible()
  const [logsVisible, openLogs, closeLogs] = useVisible()

  const isConfigured = useMemo(() => {
    return isValid(integration.webhookId)
  }, [integration.webhookId])

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
    closeSettings()
  }

  return (
    <>
      <div className="py-2 space-y-2">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center p-2 rounded-full shadow">
              <img className="h-8 w-8 aspect-1" src="/static/webhook.png" alt="" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <div className="text-sm font-medium text-slate-900 truncate">Webhook</div>
              {integration.isEnabled && (
                <span className="ml-2 w-2 h-2 bg-emerald-500 rounded-full" />
              )}
            </div>
            <p className="text-sm text-slate-500 truncate">
              Send events for new conversions to HTTP endpoints
            </p>
          </div>
          <div>
            {isConfigured ? (
              <div className="flex items-center">
                <Tooltip ariaLabel="Webhook logs">
                  <Button.Link leading={<IconClockPlay />} onClick={openLogs} />
                </Tooltip>
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

      <WebhookLogModal
        visible={logsVisible}
        productId={productId}
        webhookId={integration.webhookId}
        onClose={closeLogs}
      />

      <Modal
        contentClassName="max-w-lg"
        visible={settingsVisible}
        showCloseIcon
        onClose={closeSettings}
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-lg leading-6 font-medium text-slate-900">Webhook</h1>
            <p className="mt-1 text-sm text-slate-500">
              Webhooks allow you to receive HTTP POST requests to a URL for new conversions.
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
            onlySubmitOnValueChange
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
