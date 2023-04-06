import { conv, isValid } from '@nily/utils'
import { useTranslation } from 'next-i18next'

import { CategoryCollections, HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { PricingCTA } from '~/layout/pricing'
import { AirtableService } from '~/service/airtable'
import { withTranslations } from '~/utils'

const NEXT_AIRTABLE_BASE_ID = process.env.NEXT_AIRTABLE_BASE_ID as string
const NEXT_AIRTABLE_COLLECTION_ID = process.env.NEXT_AIRTABLE_COLLECTION_ID as string

const Search = (props: any): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HomeLayout
      seo={{
        title: t('collection.title')
      }}
    >
      <HomeHeader />
      <CategoryCollections {...props} />
      <PricingCTA />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(async ({ query }) => {
  const search = query.query

  const result = await AirtableService.records<CollectionRecord>(
    NEXT_AIRTABLE_BASE_ID,
    NEXT_AIRTABLE_COLLECTION_ID
  )
  const categories = Array.from(new Set(result.map(r => r.Category)))

  let records: CollectionRecord[] = []

  if (isValid(search)) {
    const searchLower = search!.toLowerCase()

    records = result.filter(r => {
      return (
        r.Title?.toLowerCase().includes(searchLower) ||
        r.Category?.toLowerCase().includes(searchLower)
      )
    })
  }

  const limit = 18
  const page = conv.int(query.page, 1)!

  return {
    props: {
      search: search || null,
      categories,
      records: records.slice((page - 1) * limit, page * limit),
      total: records.length,
      page,
      limit
    }
  }
})

export default Search
