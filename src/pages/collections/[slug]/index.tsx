import { useTranslation } from 'next-i18next'

import { CollectionDetails, HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { PricingCTA } from '~/layout/pricing'
import { AirtableService } from '~/service/airtable'
import { withTranslations } from '~/utils'

const CollectionDetail = (props: any): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HomeLayout
      seo={{
        title: t('collection.detailTitle', { title: props.record.Title })
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
  const record = (await AirtableService.init().collections()).find(
    r => r.Slug.toLowerCase() === query.slug.toLowerCase()
  )

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
