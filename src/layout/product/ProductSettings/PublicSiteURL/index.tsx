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
import { isEmpty, isValid, isValidArray } from '@nily/utils'
import { IconDotsVertical } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import React, { FC, useCallback, useMemo, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Expandable } from '~/components'
import { PLAN_LEVELS } from '~/constants'
import { useProduct, useProductId } from '~/layout'
import { PlanBadge, PlanCheck } from '~/layout/product/PlanCheck'
import { CustomDomainService } from '~/service'
import { useStore } from '~/store'
import {
  getDomainName,
  isRootDomain,
  isValidDomain,
  useProductURL,
  useRequest,
  useVisible
} from '~/utils'

import { EarlyBirdSubdomainURL } from './EarlyBirdSubdomainURL'
import { JingleBioSubdomainURL } from './JingleBioSubdomainURL'

const CNAME_RECORD = process.env.NEXT_PUBLIC_PUBLIC_SITE_CNAME_RECORD as string
const A_RECORD = process.env.NEXT_PUBLIC_PUBLIC_SITE_A_RECORD as string

interface CustomURLItemProps {
  customDomain: CustomDomain
  onSetPrimary: (id: number) => void
  onDelete: (id: number) => void
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
          <span className="inline-block ml-2 px-1 py-0.5 text-[11px] leading-[1] uppercase rounded bg-emerald-500 text-white">
            Primary
          </span>
        )}
      </div>

      <Dropdown className="w-6 h-6" overlay={Overlay}>
        <Button.Link
          className="!p-0.5 bg-slate-200"
          leading={<IconDotsVertical />}
          loading={loading}
        />
      </Dropdown>
    </div>
  )
}

const DomainComponent: FC<{ domain?: string; onChange: (domain: string) => void }> = ({
  domain,
  onChange
}) => {
  async function handleFinish(values: any) {
    onChange(values.domain)
  }

  return (
    <div className="mt-2">
      <Form.Custom
        initialValues={{ domain }}
        submitText="Continue"
        submitOptions={{
          type: 'success'
        }}
        request={handleFinish}
      >
        <Form.Item
          className="!mb-4"
          name="domain"
          label="Your domain name"
          rules={[
            {
              required: true,
              async validator(_, value) {
                if (isEmpty(value)) {
                  throw new Error('The domain is not allowed to be empty')
                }

                if (!isValidDomain(value)) {
                  throw new Error(
                    'The domain is not a valid, it should be like e.g., example.com, app.example.com'
                  )
                }
              }
            }
          ]}
        >
          <Input placeholder="Domain name e.g., example.com, app.example.com" />
        </Form.Item>
      </Form.Custom>
    </div>
  )
}

const ValidateComponent: FC<{ domain: string; onFinish: () => void }> = ({ domain, onFinish }) => {
  const product = useProduct()
  const { updateProduct } = useStore()

  const cnameValue = useMemo(
    () => `${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`,
    [product.domain]
  )

  const { loading, error, request } = useRequest(async () => {
    const result = await CustomDomainService.create(product.id, domain)

    updateProduct(product.id, {
      customDomains: [result, ...(product.customDomains || [])]
    })
    onFinish()
  }, [product.customDomains, product.id, domain])

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
                  To domain name providers such as Cloudflare, we request that you{' '}
                  <strong>disable the Proxy feature</strong>.
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
        recordType: isRootDomain(domain) ? 'A' : 'CNAME',
        name: getDomainName(domain),
        value: isRootDomain(domain) ? A_RECORD : CNAME_RECORD,
        ttl: 'Auto / Default',
        status: 'DNS only'
      }
    ]

    return <Table<any> className="table-compact" columns={columns} data={data} />
  }, [domain, cnameValue])

  return (
    <div className="mt-2 space-y-4">
      <div className="text-sm text-slate-500">
        Add these DNS records below to your domain name provider's DNS settings. You can check the
        DNS records of your domain with this tool:{' '}
        <a
          className="underline"
          href="https://dnschecker.org/all-dns-records-of-domain.php"
          target="_blank"
          rel="noreferrer"
        >
          DNS Lookup
        </a>
      </div>

      {DnsRecordTable}

      <Button type="success" loading={loading} onClick={request}>
        Save
      </Button>

      {error && <div className="form-item-error">{error.message}</div>}
    </div>
  )
}

const CustomURL: FC = () => {
  const product = useProduct()
  const { updateProduct } = useStore()
  const [visible, open, close] = useVisible()

  const [isEditing, setEditing] = useState(true)
  const [domain, setDomain] = useState<string>()

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

  function handleClick() {
    setEditing(true)
  }

  function handleDomainChange(domain: string) {
    setDomain(domain)
    setEditing(false)
  }

  return (
    <>
      <PlanCheck
        className="cursor-pointer"
        minimalLevel={PLAN_LEVELS.plan_starter}
        redirectUrl={`/product/${product.id}/settings`}
      >
        <div>
          <div className="form-item-label">
            <span>Custom URL</span>
            <PlanBadge className="ml-1" minimalLevel={PLAN_LEVELS.plan_starter} />
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

      <Modal
        contentClassName="max-w-2xl"
        visible={visible}
        maskClosable={false}
        showCloseIcon
        onClose={close}
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-lg leading-6 font-medium text-slate-900">New custom URL</h1>
            <div className="mb-4 text-sm text-slate-500">
              Follow the guide and add a CNAME DNS record. Make sure to disable the proxy for it to
              work properly.
            </div>
          </div>

          <div>
            {isEditing ? (
              <DomainComponent domain={domain} onChange={handleDomainChange} />
            ) : (
              <div className="mb-6 flex items-center justify-between text-sm text-slate-700">
                <div>
                  <div className="font-bold">Your domain name</div>
                  <div className="text-slate-900">{domain}</div>
                </div>
                <Button.Link className="font-semibold" type="success" onClick={handleClick}>
                  Change domain
                </Button.Link>
              </div>
            )}

            {isValid(domain) && !isEditing && (
              <ValidateComponent domain={domain!} onFinish={close} />
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export const PublicSiteURL: FC = () => {
  const { t } = useTranslation('dashboard')
  const product = useProduct()

  const host = useProductURL(product)
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
        {product.isJingleBio ? <JingleBioSubdomainURL /> : <EarlyBirdSubdomainURL />}
        <CustomURL />
      </div>
    </Expandable>
  )
}
