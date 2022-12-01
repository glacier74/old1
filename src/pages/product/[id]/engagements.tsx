import { EmptyStates, Table } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import { conv } from '@nily/utils'
import { IconDatabase } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as timeago from 'timeago.js'

import { AsyncRequest, Pagination, RoundImage } from '~/components'
import { PAYMENT_STATUS, PAYMENT_TYPES } from '~/constants'
import { ProductLayout, useProductId } from '~/layout'
import { ProductService } from '~/service'
import { currencyFormatter, withTranslations } from '~/utils'

const Skeleton = () => {
  return (
    <div>
      <div className="flex items-center h-16 py-4">
        <div className="w-9 h-9 bg-slate-200 rounded-full"></div>
        <div className="flex flex-1 justify-between">
          <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
          <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
          <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
        </div>
      </div>
      <div className="flex items-center h-16 py-4">
        <div className="w-9 h-9 bg-slate-200 rounded-full"></div>
        <div className="flex flex-1 justify-between">
          <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
          <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
          <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
        </div>
      </div>
    </div>
  )
}

const ProductEngagements = (): JSX.Element => {
  const { t } = useTranslation()
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
              <RoundImage src={row.avatar} text={row.email} imageSize={0} size={36} />
            </div>
            <div className="flex-1 px-4">
              <p className="text-sm font-semibold text-slate-800">
                {t(PAYMENT_STATUS[row.status])}
              </p>
              {row.paidAt! > 0 && (
                <p className="mt-0.5 font-normal text-sm text-slate-500">
                  {timeago.format(row.paidAt! * 1_000)}
                </p>
              )}
            </div>
          </div>
        )
      }
    },
    {
      key: 'email',
      name: '',
      width: '30%',
      render(row) {
        return row.email
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
      align: 'right',
      render(row) {
        return currencyFormatter(row.currency, row.amount)
      }
    }
  ]

  async function fetchPayments() {
    const result = await ProductService.payments(productId!, page)

    setCount(result.count)
    setPayments(result.payments)

    return result.payments.length > 0
  }

  useEffect(() => {
    setPage(conv.int((router.query as AnyMap<string>).page, 1)!)
  }, [router.query])

  return (
    <ProductLayout seo={{ title: 'engagements.title' }}>
      <h1 className="mb-4 text-3xl leading-6 font-bold text-slate-900">
        {t('engagements.heading')}
      </h1>

      <div className="mt-6">
        <AsyncRequest
          request={fetchPayments}
          deps={[productId, page]}
          skeleton={<Skeleton />}
          emptyState={
            <EmptyStates
              className="pt-60 flex flex-col justify-center"
              icon={<IconDatabase className="non-scaling-stroke" />}
              title={t('engagements.notFound.title')}
              description={t('engagements.notFound.description')}
            />
          }
        >
          <Table<Payment> className="mt-8" columns={columns} data={payments} hideHead />

          <Pagination
            uri={`/product/${productId}/engagements`}
            total={count}
            page={page}
            limit={20}
          />
        </AsyncRequest>
      </div>
    </ProductLayout>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default ProductEngagements
