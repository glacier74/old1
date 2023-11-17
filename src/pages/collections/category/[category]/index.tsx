import { arrayUnique, conv } from '@nily/utils'
import { useTranslation } from 'next-i18next'

import { CategoryCollections, HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { PricingCTA } from '~/layout/pricing'
import { CollectionService } from '~/service/collection'
import { withTranslations } from '~/utils'

const Collection = (props: any): JSX.Element => {
  const { t } = useTranslation('collections')
  const title = props.category.replace(/^\S/, (s: string) => s.toUpperCase())

  return (
    <HomeLayout
      seo={{
        title: t('detailTitle', { title }),
        url: `/collections/category/${props.category}`
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
    const category = query.category.toLowerCase()

    let records = await CollectionService.records()
    const categories: string[] = arrayUnique(records.map(t => t.Category))

    const limit = 18
    const page = conv.int(query.page, 1)!

    // Filter collections
    records = records.filter(t => t.LowerCaseCategory === category)

    return {
      props: {
        categories,
        category,
        records: records.slice((page - 1) * limit, page * limit),
        total: records.length,
        page,
        limit
      }
    }
  },
  ['common', 'collections'],
  {
    redirectOnLocale: true
  }
)

export default Collection
