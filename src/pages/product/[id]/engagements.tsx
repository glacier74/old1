import { Table } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import * as timeago from 'timeago.js'

import { AsyncRequest, RoundImage } from '~/components'
import { ProductLayout, useProductId } from '~/layout'
import { ProductService } from '~/service'
import { withTranslations } from '~/utils'

const Skeleton = () => {
  return (
    <div>
      <div className="flex items-center h-16 py-4">
        <div className="w-9 h-9 bg-slate-200 rounded-full"></div>
        <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
      </div>
      <div className="flex items-center h-16 py-4">
        <div className="w-9 h-9 bg-slate-200 rounded-full"></div>
        <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
      </div>
      <div className="flex items-center h-16 py-4">
        <div className="w-9 h-9 bg-slate-200 rounded-full"></div>
        <div className="w-40 h-4 ml-4 rounded-sm skeleton"></div>
      </div>
    </div>
  )
}

const ProductEngagements = (): JSX.Element => {
  const { t } = useTranslation()
  const productId = useProductId()
  const [payments, setPayments] = useState<Payment[]>()

  // Table columns
  const columns: TableColumn<Payment>[] = [
    {
      key: 'id',
      name: '',
      width: '40%',
      render(row) {
        return (
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <RoundImage src={row.avatar} text={row.email} size={36} />
            </div>
            <div className="flex-1 px-4">
              <p className="text-sm font-semibold text-slate-800 truncate">{row.name}</p>
              {row.paidAt && (
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
        return 'One time'
      }
    },
    {
      key: 'amount',
      name: '',
      align: 'right',
      render(row) {
        return '$300'
      }
    }
  ]

  async function fetchPayments() {
    setPayments(await ProductService.payments(productId!))
    return true
  }

  return (
    <ProductLayout seo={{ title: 'engagements.title' }}>
      <h1 className="mt-10 mb-4 text-3xl leading-6 font-bold text-slate-900">
        {t('engagements.heading')}
      </h1>

      <div className="mt-6">
        <AsyncRequest request={fetchPayments} deps={[productId]} skeleton={<Skeleton />}>
          <Table<Payment> className="mt-8" columns={columns} data={payments} hideHead />
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
