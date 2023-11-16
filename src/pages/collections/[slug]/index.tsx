import { useTranslation } from 'next-i18next'

import { CollectionDetails, HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { PricingCTA } from '~/layout/pricing'
import { CollectionService } from '~/service/collection'
import { withTranslations } from '~/utils'

const CollectionDetail = (props: any): JSX.Element => {
  const { t } = useTranslation('collections')

  return (
    <HomeLayout
      seo={{
        title: t('detailTitle', { title: props.record.Name }),
        url: `/collections/${props.record.Slug}`
      }}
    >
      <HomeHeader />
      <CollectionDetails {...props} />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(
  async ({ query }) => {
    const record = await CollectionService.findBySlug(query.slug.toLowerCase())

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
  },
  ['common', 'collections'],
  {
    redirectOnLocale: true
  }
)

export default CollectionDetail
