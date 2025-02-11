import { conv } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { IntegrationsCat, IntegrationsHero } from '~/layout/integrations'
import { Integration2Service } from '~/service/integration2'
import { withTranslations } from '~/utils'

interface IntegrationsProps {
  categories: string[]
  category: string
  groups: Array<{
    category: string
    records: IntegrationRecord[]
  }>
}

const Integrations: FC<IntegrationsProps> = props => {
  const { t } = useTranslation('integrations')
  const title = props.category.replace(/^\S/, (s: string) => s.toUpperCase())

  return (
    <HomeLayout
      seo={{
        title: t('detailTitle', { title }),
        url: '/integrations'
      }}
    >
      <HomeHeader />
      <IntegrationsHero />
      <IntegrationsCat {...props} />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(
  async ({ query }) => {
    const category = query.category.toLowerCase()
    const [records, categories] = await Promise.all([
      Integration2Service.records(category),
      Integration2Service.categories()
    ])

    const limit = 9
    const page = conv.int(query.page, 1)!

    return {
      props: {
        categories,
        category,
        groups: [
          {
            records: records.slice((page - 1) * limit, page * limit)
          }
        ],
        total: records.length,
        page,
        limit
      }
    }
  },
  ['common', 'integrations'],
  {
    redirectOnLocale: true
  }
)

export default Integrations
