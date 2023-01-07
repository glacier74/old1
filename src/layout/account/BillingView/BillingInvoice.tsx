import { EmptyStates, Table } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import { IconFileInvoice } from '@tabler/icons'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { AsyncRequest } from '~/components'
import { UserService } from '~/service'
import { currencyFormatter } from '~/utils'

const Skeleton = () => {
  return (
    <div>
      <div className="flex items-center h-16 py-4">
        <div className="w-40 h-4 rounded-sm skeleton"></div>
        <div className="w-40 h-4 rounded-sm skeleton"></div>
        <div className="w-40 h-4 rounded-sm skeleton"></div>
      </div>
      <div className="flex items-center h-16 py-4">
        <div className="w-40 h-4 rounded-sm skeleton"></div>
        <div className="w-40 h-4 rounded-sm skeleton"></div>
        <div className="w-40 h-4 rounded-sm skeleton"></div>
      </div>
    </div>
  )
}

export const BillingInvoice = () => {
  const { t } = useTranslation()

  const [receipts, setReceipts] = useState<Receipt[]>()

  // Table columns
  const columns: TableColumn<Receipt>[] = [
    {
      key: 'paidAt',
      name: 'Date',
      render(row) {
        return dayjs.unix(row.paidAt).format('MMM DD, YYYY')
      }
    },
    {
      key: 'amount',
      name: 'Amount',
      render(row) {
        return currencyFormatter(row.currency, row.amount)
      }
    },
    {
      key: 'receiptUrl',
      name: 'Receipt',
      align: 'right',
      render(row) {
        return (
          <a href={row.receiptUrl} target="_blank">
            View receipt
          </a>
        )
      }
    }
  ]

  async function request() {
    const result = await UserService.receipts()

    setReceipts(result.receipts)
    return result.count > 0
  }

  return (
    <div>
      <div className="text-2xl font-bold">Invoices</div>
      <AsyncRequest
        request={request}
        skeleton={<Skeleton />}
        emptyState={
          <EmptyStates
            className="pt-60 flex flex-col justify-center"
            icon={<IconFileInvoice className="non-scaling-stroke" />}
            title={t('invoice.notFound.title')}
          />
        }
      >
        <Table<Receipt> className="mt-8" columns={columns} data={receipts} />
      </AsyncRequest>
    </div>
  )
}
