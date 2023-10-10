import { Button, EmptyStates, Table } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import { conv } from '@nily/utils'
import { IconArrowBarToDown, IconDatabase } from '@tabler/icons'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as timeago from 'timeago.js'

import { Pagination, RoundImage } from '~/components'
import { PAYMENT_STATUS, PAYMENT_TYPES, SUBSCRIPTION_STATUS } from '~/constants'
import { EngagementLayout, useProductId } from '~/layout'
import { ProductService } from '~/service'
import { currencyFormatter, withTranslations } from '~/utils'

const ProductEngagements = (): JSX.Element => {
  const { t } = useTranslation('dashboard')
  const router = useRouter()
  const productId = useProductId()

  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [payments, setPayments] = useState<Payment[]>()

  // Table columns
  const columns: TableColumn<Payment>[] = [
    {
      key: 'id',
      name: '',
      width: '30%',
      render(row) {
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <RoundImage src={row.avatar} text={row.email} imageSize={36} size={36} />
            </div>
            <div className="flex-1 px-4">
              <p className="text-sm font-semibold text-slate-800">{row.email}</p>
              {row.paymentType === 'recurring' && row.endsAt && (
                <p className="mt-0.5 font-normal text-sm text-slate-500">
                  Expires on {dayjs.unix(row.endsAt).format('MMM DD, YYYY')}
                </p>
              )}
              {row.paidAt! > 0 && (
                <p className="mt-0.5 font-normal text-sm text-slate-500">
                  Paid at {timeago.format(row.paidAt! * 1_000)}
                </p>
              )}
            </div>
          </div>
        )
      }
    },
    {
      key: 'type',
      name: '',
      width: '20%',
      render(row) {
        return t(PAYMENT_TYPES[row.paymentType])
      }
    },
    {
      key: 'amount',
      name: '',
      width: '30%',
      render(row) {
        const amount = currencyFormatter(row.currency, row.amount)

        if (row.paymentType === 'recurring') {
          return `${amount}/${row.interval}`
        }

        return amount
      }
    },
    {
      key: 'status',
      name: '',
      align: 'right',
      render(row) {
        if (row.paymentType === 'recurring') {
          return t(SUBSCRIPTION_STATUS[row.status])
        }

        return t(PAYMENT_STATUS[row.status])
      }
    }
  ]

  async function fetchData() {
    const result = await ProductService.payments(productId!, page)

    setCount(result.count)
    setPayments(result.payments)

    return result.payments.length > 0
  }

  function handleExport() {
    window.open(`${process.env.NEXT_PUBLIC_API_URI}/products/${productId}/payments/download`)
  }

  useEffect(() => {
    setPage(conv.int((router.query as AnyMap<string>).page, 1)!)
  }, [router.query])

  return (
    <EngagementLayout
      seo={{ title: t('engagements.title') }}
      activeRouteName="payment"
      request={fetchData}
      deps={[productId, page]}
      emptyState={
        <EmptyStates
          className="pt-60 flex flex-col justify-center"
          icon={<IconDatabase className="non-scaling-stroke" />}
          title={t('engagements.notFound.title')}
          description={t('engagements.notFound.description')}
        />
      }
    >
      {count > 0 && (
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-slate-500">{count} items</div>
          <Button type="success" leading={<IconArrowBarToDown />} onClick={handleExport}>
            Export
          </Button>
        </div>
      )}
      <Table<Payment> className="mt-2" columns={columns} data={payments} hideHead />
      <Pagination uri={`/product/${productId}/engagements`} total={count} page={page} limit={20} />
    </EngagementLayout>
  )
}

export const getServerSideProps = withTranslations(
  async context => {
    return {
      props: {}
    }
  },
  ['common', 'dashboard']
)

export default ProductEngagements
