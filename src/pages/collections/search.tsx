import { arrayUnique, conv, isValid } from '@nily/utils'
import { useTranslation } from 'next-i18next'

import { CategoryCollections, HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { PricingCTA } from '~/layout/pricing'
import { CollectionService } from '~/service/collection'
import { withTranslations } from '~/utils'

const Search = (props: any): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HomeLayout
      seo={{
        title: t('collections.title')
      }}
    >
      <HomeHeader />
      <CategoryCollections {...props} />
      <PricingCTA />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(
  async ({ query }) => {
    const search = query.query
    const list = await CollectionService.records()
    const categories: string[] = arrayUnique(list.map(t => t.Category))

    let records: CollectionRecord[] = list

    if (isValid(search)) {
      const searchLower = search!.toLowerCase()

      records = list.filter(r => {
        return (
          r.Name.toLowerCase().includes(searchLower) || r.LowerCaseCategory.includes(searchLower)
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
  },
  [],
  {
    redirectOnLocale: true
  }
)

export default Search
