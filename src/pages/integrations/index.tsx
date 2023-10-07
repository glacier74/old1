import { isEmpty } from '@nily/utils'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { IntegrationsCat, IntegrationsHero } from '~/layout/integrations'
import { Integration2Service } from '~/service/integration2'
import { withTranslations } from '~/utils'

interface IntegrationsProps {
  categories: string[]
  category?: string
  groups: Array<{
    category: string
    records: IntegrationRecord[]
  }>
}

const Integrations: FC<IntegrationsProps> = props => {
  const { t } = useTranslation('integrations')

  return (
    <HomeLayout
      seo={{
        title: t('title'),
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

export const getServerSideProps = withTranslations(async context => {
  const [records, categories] = await Promise.all([
    Integration2Service.records(),
    Integration2Service.categories()
  ])

  const groups = categories
    .map(category => {
      const filtered = records.filter(record => record.LowerCaseCategory === category.toLowerCase())

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
['common','integrations'])

export default Integrations
