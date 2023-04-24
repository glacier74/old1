import { useTranslation } from 'next-i18next'

import { CollectionDetails, HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { PricingCTA } from '~/layout/pricing'
import { AirtableService } from '~/service/airtable'
import { withTranslations } from '~/utils'

const NEXT_AIRTABLE_BASE_ID = process.env.NEXT_AIRTABLE_BASE_ID as string
const NEXT_AIRTABLE_COLLECTION_ID = process.env.NEXT_AIRTABLE_COLLECTION_ID as string

const CollectionDetail = (props: any): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HomeLayout
      seo={{
        title: t('collection.detailTitle', { title: props.record.Title }),
        url: `/collections/${props.record.Slug}`
      }}
    >
      <HomeHeader />
      <CollectionDetails {...props} />
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
  const record = records.find(r => r.Slug?.toLowerCase() === query.slug.toLowerCase())

  if (!record) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      record
    }
  }
})

export default CollectionDetail
