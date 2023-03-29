import { isValid, isValidArray } from '@nily/utils'
import { useTranslation } from 'next-i18next'

import { CollectionRecords, HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { PricingCTA } from '~/layout/pricing'
import { withTranslations } from '~/utils'
import { Airtable } from '~/utils/airtable'
import { redis } from '~/utils/redis'

const Collection = (props: any): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HomeLayout
      seo={{
        title: t('collection.title')
      }}
    >
      <HomeHeader />
      <CollectionRecords {...props} />
      <PricingCTA />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(async ({ req }) => {
  const { searchParams } = new URL(req.url, process.env.NEXT_PUBLIC_HOMEPAGE)
  const search = searchParams.get('search')
  const category = searchParams.get('category')

  // https://airtable.com/developers/web/api/rate-limits
  let records: CollectionRecord[] = await redis.get<CollectionRecord[]>('collections')

  if (!records) {
    const airtable = new Airtable(process.env.NEXT_AIRTABLE_API_KEY as string)

    records = await airtable.records<CollectionRecord>(
      process.env.NEXT_AIRTABLE_BASE_ID as string,
      process.env.NEXT_AIRTABLE_COLLECTION_ID as string
    )

    if (isValidArray(records)) {
      await redis.set('collections', records, '5s')
    }
  }

  records = (records || []).filter(r => isValid(r.URL))

  if (isValid(search)) {
    const searchLower = search!.toLowerCase()

    records = records.filter(
      r =>
        r['Meta title'].toLowerCase().includes(searchLower) ||
        r.Category.toLowerCase().includes(searchLower)
    )
  }

  if (isValid(category)) {
    records = records.filter(r => r.Category === category)
  }

  return {
    props: {
      category,
      search,
      records
    }
  }
})

export default Collection
