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
import { EngagementLayout, useProductId } from '~/layout'
import { ProductService } from '~/service'
import { withTranslations } from '~/utils'

const ProductEmailCaptures = (): JSX.Element => {
  const { t } = useTranslation('dashboard')
  const router = useRouter()
  const productId = useProductId()

  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [emailCaptures, setEmailCaptures] = useState<EmailCapture[]>()

  // Table columns
  const columns: TableColumn<EmailCapture>[] = [
    {
      key: 'id',
      name: '',
      width: 36,
      render(row) {
        return (
          <RoundImage
            src={row.avatar}
            text={row.name || row.email}
            retainLength={2}
            imageSize={36}
            size={36}
          />
        )
      }
    },
    {
      key: 'email',
      name: '',
      render(row) {
        return (
          <div className="text-sm text-slate-800 font-medium">
            {row.name && <p className="mb-0.5">{row.name}</p>}
            <p>{row.email}</p>
          </div>
        )
      }
    },
    {
      key: 'date',
      name: '',
      align: 'right',
      render(row) {
        return timeago.format(dayjs(row.createdAt).unix() * 1_000)
      }
    }
  ]

  async function fetchData() {
    const result = await ProductService.emailCaptures(productId!, page)

    setCount(result.count)
    setEmailCaptures(result.emailCaptures)

    return result.emailCaptures.length > 0
  }

  function handleExport() {
    window.open(`${process.env.NEXT_PUBLIC_API_URI}/products/${productId}/email-captures/download`)
  }

  useEffect(() => {
    setPage(conv.int((router.query as AnyMap<string>).page, 1)!)
  }, [router.query])

  return (
    <EngagementLayout
      seo={{ title: 'engagements.emailCapture' }}
      activeRouteName="emailCapture"
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
      <Table<EmailCapture>
        className="table-engagement mt-2"
        columns={columns}
        data={emailCaptures}
        hideHead
      />
      <Pagination
        uri={`/product/${productId}/engagements/email-captures`}
        total={count}
        page={page}
        limit={20}
      />
    </EngagementLayout>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps = withTranslations(
  async context => {
    return {
      props: {}
    }
  },
  ['common', 'dashboard']
)

export default ProductEmailCaptures
