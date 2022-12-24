import { EmptyStates, Table } from '@heyforms/ui'
import { TableColumn } from '@heyforms/ui/types/table'
import { conv } from '@nily/utils'
import { IconDatabase } from '@tabler/icons'
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
  const { t } = useTranslation()
  const router = useRouter()
  const productId = useProductId()

  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [contacts, setContacts] = useState<Contact[]>()

  // Table columns
  const columns: TableColumn<Contact>[] = [
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
            imageSize={0}
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
    const result = await ProductService.contacts(productId!, page)

    setCount(result.count)
    setContacts(result.contacts)

    return result.contacts.length > 0
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
      <Table<Contact> className="mt-8" columns={columns} data={contacts} hideHead />
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

export const getStaticProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default ProductEmailCaptures
