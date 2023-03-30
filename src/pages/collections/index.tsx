import { isValid } from '@nily/utils'
import { useTranslation } from 'next-i18next'

import { CollectionRecords, HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { PricingCTA } from '~/layout/pricing'
import { AirtableService } from '~/service/airtable'
import { withTranslations } from '~/utils'

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

export const getServerSideProps = withTranslations(async ({ query }) => {
  const { search, category } = query
  let records = await AirtableService.init().collections()

  if (isValid(category)) {
    records = records.filter(r => r.Category === category)
  } else if (isValid(search)) {
    const searchLower = search!.toLowerCase()

    records = records.filter(r => {
      return (
        r.Title.toLowerCase().includes(searchLower) ||
        r.Category.toLowerCase().includes(searchLower)
      )
    })
  }

  return {
    props: {
      category: category || null,
      search: search || null,
      records
    }
  }
})

export default Collection
