import { arrayUnique, isEmpty } from '@nily/utils'
import { useTranslation } from 'next-i18next'

import { GroupCollections, HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { PricingCTA } from '~/layout/pricing'
import { CollectionService } from '~/service/collection'
import { withTranslations } from '~/utils'

const Collection = (props: any): JSX.Element => {
  const { t } = useTranslation('collections')

  return (
    <HomeLayout
      seo={{
        title: t('title'),
        url: '/collections'
      }}
    >
      <HomeHeader />
      <GroupCollections {...props} />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(
  async ({ query }) => {
    const records = await CollectionService.records()
    const categories: string[] = arrayUnique(records.map(t => t.Category))

    const groups = categories
      .map(category => {
        const filtered = records
          .filter(record => record.LowerCaseCategory === category.toLowerCase())
          .slice(0, 9)

        if (isEmpty(filtered)) {
          return
        }

        return {
          category,
          records: filtered
        }
      })
      .filter(Boolean)

    return {
      props: {
        categories,
        groups
      }
    }
  },
  ['common', 'collections'],
  {
    redirectOnLocale: true
  }
)

export default Collection
