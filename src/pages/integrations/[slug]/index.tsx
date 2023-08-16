import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { IntegrationsDetailHero, IntegrationsDetailIntro, IntegrationsDetailGuide, IntegrationsDetailJourney } from '~/layout/integrations'
import { Integration2Service } from '~/service/integration2'
import { withTranslations } from '~/utils'

interface IntegrationsDetailProps {
  record: IntegrationRecord
}

const IntegrationsDetail: FC<IntegrationsDetailProps> = ({ record }): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HomeLayout
      seo={{
        title: t('integrations.detailTitle', { title: record.Name }),
        url: `/integrations/${record.slug}`
      }}
    >
      <HomeHeader />
      <IntegrationsDetailHero />
      <IntegrationsDetailIntro />
      <IntegrationsDetailGuide />
      <IntegrationsDetailJourney />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(async ({ query }) => {
  const record = await Integration2Service.findBySlug(query.slug.toLowerCase())

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

export default IntegrationsDetail
