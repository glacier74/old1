import { conv } from '@nily/utils'
import { useTranslation } from 'next-i18next'

import { CategoryCollections, HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { PricingCTA } from '~/layout/pricing'
import { CollectionService } from '~/service/collection'
import { withTranslations } from '~/utils'

const Collection = (props: any): JSX.Element => {
  const { t } = useTranslation()
  const title = props.category.replace(/^\S/, (s: string) => s.toUpperCase())

  return (
    <HomeLayout
      seo={{
        title: t('collections.detailTitle', { title }),
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

export const getServerSideProps = withTranslations(async ({ query }) => {
  const category = query.category.toLowerCase()
  const [records, categories] = await Promise.all([
    CollectionService.records(category),
    CollectionService.categories()
  ])

  const limit = 18
  const page = conv.int(query.page, 1)!

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
})

export default Collection
