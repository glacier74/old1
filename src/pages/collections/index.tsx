import { useTranslation } from 'next-i18next'

import { GroupCollections, HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { PricingCTA } from '~/layout/pricing'
import { AirtableService } from '~/service/airtable'
import { withTranslations } from '~/utils'

const NEXT_AIRTABLE_BASE_ID = process.env.NEXT_AIRTABLE_BASE_ID as string
const NEXT_AIRTABLE_COLLECTION_ID = process.env.NEXT_AIRTABLE_COLLECTION_ID as string

const Collection = (props: any): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HomeLayout
      seo={{
        title: t('collection.title')
      }}
    >
      <HomeHeader />
      <GroupCollections {...props} />
      <PricingCTA />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(async ({ query }) => {
  const records = await AirtableService.records<CollectionRecord>(
    NEXT_AIRTABLE_BASE_ID,
    NEXT_AIRTABLE_COLLECTION_ID
  )
  const categories = Array.from(new Set(records.map(r => r.Category)))
  const groups = categories.map(category => ({
    category,
    records: records
      .filter(record => record.Category?.toLowerCase() === category.toLowerCase())
      .slice(0, 9)
  }))

  return {
    props: {
      categories,
      groups
    }
  }
})

export default Collection
