import {
  Button,
  Dropdown,
  Form,
  Input,
  Menus,
  Modal,
  Table,
  Tooltip,
  notification
} from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import { isValidArray } from '@nily/utils'
import { IconDotsVertical } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import React, { FC, useCallback, useMemo, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Expandable } from '~/components'
import { PLAN_LEVELS } from '~/constants'
import { useProduct, useProductId } from '~/layout'
import { PlanBadge, PlanCheck } from '~/layout/product/PlanCheck'
import { CustomDomainService, ProductService } from '~/service'
import { useStore } from '~/store'
import { useSubscriptionPlanLevel, useVisible } from '~/utils'

interface CustomURLItemProps {
  customDomain: CustomDomain
  onSetPrimary: (id: number) => void
  onDelete: (id: number) => void
}

const SubdomainURL = () => {
  const { t } = useTranslation()
  const product = useProduct()
  const { updateProduct } = useStore()
  const [visible, open, close] = useVisible()

  const subdomainURL = useMemo(
    () => `${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`,
    [product.domain]
  )

  async function handleFinish(values: any) {
    await ProductService.updateSubdomain(product.id, values.domain)

    updateProduct(product.id, values)
    close()
  }

  const Overlay = (
    <Menus>
      <Menus.Item label="Edit URL" onClick={open} />
    </Menus>
  )

  return (
    <div>
      <div className="form-item-label">My EarlyBird URL</div>
      <div className="form-item-content">
        <div className="flex items-center w-full md:w-[32rem] px-4 py-2.5 text-sm text-slate-700 bg-slate-200 rounded">
          <div className="flex-1">{subdomainURL}</div>
          <Dropdown className="w-6 h-6" overlay={Overlay}>
            <Button.Link className="!p-0.5" leading={<IconDotsVertical />} />
          </Dropdown>
        </div>
      </div>

      <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={close}>
        <div className="space-y-6">
          <div>
            <h1 className="text-lg leading-6 font-medium text-slate-900">Edit my EarlyBird URL</h1>
            <div className="mt-4 rounded-md bg-yellow-50 p-2 text-sm text-yellow-800">
              ⚠️ Please ensure that you update the CNAME record for all custom domains that have
              been added after modifying the EarlyBird URL.
            </div>
          </div>

          <Form.Custom
            initialValues={product}
            submitText={t('common.saveChanges')}
            submitOptions={{
              type: 'success'
            }}
            onlySubmitOnValueChange
            request={handleFinish}
          >
            <Form.Item
              className="!mb-2"
              name="domain"
              validateTrigger={['onBlur', 'onChange']}
              rules={[
                {
                  required: true,
                  async validator(rule, value) {
                    await ProductService.validateSubdomain(value, product.id)
                  }
                }
              ]}
            >
              <Input trailing={`.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`} />
            </Form.Item>
          </Form.Custom>
        </div>
      </Modal>
    </div>
  )
}

const CustomURLItem: FC<CustomURLItemProps> = ({ customDomain, onSetPrimary, onDelete }) => {
  const productId = useProductId()
  const [loading, setLoading] = useState(false)

  async function handleSetPrimary() {
    setLoading(true)

    try {
      await CustomDomainService.update(productId, customDomain.id)
      onSetPrimary(customDomain.id)
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    setLoading(false)
  }

  async function handleDelete() {
    setLoading(true)

    try {
      await CustomDomainService.delete(productId, customDomain.id)
      onDelete(customDomain.id)
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    setLoading(false)
  }

  function handleMenuClick(value: any) {
    switch (value) {
      case 'setPrimary':
        return handleSetPrimary()

      case 'delete':
        return handleDelete()
    }
  }

  const Overlay = (
    <Menus onClick={handleMenuClick}>
      {!customDomain.isPrimary && <Menus.Item value="setPrimary" label="Set primary" />}
      <Menus.Item value="delete" className="text-red-700" label="Delete" />
    </Menus>
  )

  return (
    <div className="flex items-center w-full md:w-[32rem] px-4 py-2.5 text-sm text-slate-700 bg-slate-200 rounded">
      <div className="flex items-center flex-1">
        <span>{customDomain.domain}</span>
        {customDomain.isPrimary && (
          <span className="inline-block ml-2 px-1 py-0.5 text-[11px] leading-[1] uppercase rounded bg-green-500 text-white">
            Primary
          </span>
        )}
      </div>

      <Dropdown className="w-6 h-6" overlay={Overlay}>
        <Button.Link className="!p-0.5" leading={<IconDotsVertical />} loading={loading} />
      </Dropdown>
    </div>
  )
}

const CustomURL: FC = () => {
  const product = useProduct()
  const { updateProduct } = useStore()
  const [visible, open, close] = useVisible()

  const subdomainURL = useMemo(
    () => `${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`,
    [product.domain]
  )

  const DnsRecordTable = useMemo(() => {
    const columns: TableColumn<any>[] = [
      {
        key: 'recordType',
        name: 'Record type'
      },
      {
        key: 'name',
        name: 'Name / Host'
      },
      {
        key: 'value',
        name: 'Value'
      },
      {
        key: 'ttl',
        name: 'TTL'
      },
      {
        key: 'status',
        name: 'Proxy status',
        render(row) {
          return (
            <Tooltip
              ariaLabel={
                <div className="w-56 h-auto p-1 text-left whitespace-pre-line">
                  To domain name providers such as Cloudflare, we request that you disable the proxy
                  feature.
                </div>
              }
            >
              <span className="underline decoration-dotted decoration-slate-700 cursor-pointer">
                {row.status}
              </span>
            </Tooltip>
          )
        }
      }
    ]

    const data = [
      {
        recordType: 'CNAME',
        name: '@',
        value: subdomainURL,
        ttl: 'Auto / Default',
        status: 'DNS Only'
      }
    ]

    return <Table<any> className="table-compact" columns={columns} data={data} />
  }, [subdomainURL])

  const handleFinish = useCallback(
    async (values: any) => {
      const result = await CustomDomainService.create(product.id, values.domain)

      updateProduct(product.id, {
        customDomains: [result, ...(product.customDomains || [])]
      })
      close()
    },
    [product.customDomains, product.id]
  )

  const handleSetPrimary = useCallback(
    (domainId: number) => {
      updateProduct(product.id, {
        customDomains: (product.customDomains || []).map(c => ({
          ...c,
          isPrimary: c.id === domainId
        }))
      })
    },
    [product.customDomains, product.id]
  )

  const handleDelete = useCallback(
    (domainId: number) => {
      const customDomains = (product.customDomains || []).filter(c => c.id !== domainId)

      if (isValidArray(customDomains)) {
        const primaryDomain = customDomains.find(c => c.isPrimary)

        if (!primaryDomain) {
          customDomains[0].isPrimary = true
        }
      }

      updateProduct(product.id, {
        customDomains
      })
    },
    [product.customDomains, product.id]
  )

  return (
    <>
      <PlanCheck className="cursor-pointer" minimalLevel={PLAN_LEVELS.plan_superior}>
        <div>
          <div className="form-item-label">
            <span>Custom URL</span>
            <PlanBadge className="ml-1" minimalLevel={PLAN_LEVELS.plan_superior} />
          </div>
          <div className="form-item-content">
            <div className="mb-2 space-y-2">
              {product.customDomains?.map(customDomain => (
                <CustomURLItem
                  key={customDomain.id}
                  customDomain={customDomain}
                  onSetPrimary={handleSetPrimary}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            <Button className="!px-3 !py-1.5" onClick={open}>
              Add custom URL
            </Button>
          </div>
        </div>
      </PlanCheck>

      <Modal contentClassName="max-w-2xl" visible={visible} showCloseIcon onClose={close}>
        <div className="space-y-6">
          <div>
            <h1 className="text-lg leading-6 font-medium text-slate-900">New custom URL</h1>
            <div className="text-sm text-slate-500">
              <p className="mb-4">
                Add the CNAME record below to your domain name provider's DNS settings.
              </p>
              {DnsRecordTable}
            </div>
          </div>

          <Form.Custom
            submitText="Add custom URL"
            submitOptions={{
              type: 'success'
            }}
            onlySubmitOnValueChange
            request={handleFinish}
          >
            <Form.Item
              className="!mb-4"
              name="domain"
              label="Your domain name"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input placeholder="Domain name e.g., example.com, app.example.com" />
            </Form.Item>
          </Form.Custom>
        </div>
      </Modal>
    </>
  )
}

export const PublicSiteURL: FC = () => {
  const { t } = useTranslation()
  const product = useProduct()
  const planLevel = useSubscriptionPlanLevel(product.subscription)

  const host = useMemo(() => {
    if (product.subscription?.isActive && planLevel >= PLAN_LEVELS.plan_superior) {
      const customDomain = product.customDomains?.find(c => c.isPrimary)

      if (customDomain) {
        return customDomain.domain
      }
    }

    return `${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`
  }, [product.customDomains, product.domain, product.subscription?.isActive, planLevel])

  const siteURL = useMemo(() => `https://${host}`, [host])

  function handleCopy() {
    notification.success({
      title: t('productSettings.domain.copiedTip')
    })
  }

  return (
    <Expandable
      title="Public site URL"
      description={
        <div>
          {t('productSettings.domain.description')}{' '}
          <Tooltip ariaLabel={t('productSettings.domain.copyTip')}>
            <CopyToClipboard text={siteURL} onCopy={handleCopy}>
              <span className="underline cursor-pointer">{host}</span>
            </CopyToClipboard>
          </Tooltip>
        </div>
      }
    >
      <div className="space-y-4">
        <SubdomainURL />
        <CustomURL />
      </div>
    </Expandable>
  )
}
