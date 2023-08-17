import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import {
  IntegrationsDetailGuide,
  IntegrationsDetailHero,
  IntegrationsDetailIntro,
  IntegrationsDetailJourney
} from '~/layout/integrations'
import { Integration2Service } from '~/service/integration2'
import { withTranslations } from '~/utils'

interface IntegrationsDetailProps {
  integration: IntegrationRecord
}

const IntegrationsDetail: FC<IntegrationsDetailProps> = ({ integration }): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HomeLayout
      seo={{
        title: t('integrations.detailTitle', { title: integration.Name }),
        url: `/integrations/${integration.slug}`
      }}
    >
      <HomeHeader />
      <IntegrationsDetailHero integration={integration} />
      <IntegrationsDetailIntro integration={integration} />
      <IntegrationsDetailGuide integration={integration} />
      <IntegrationsDetailJourney />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(async ({ query }) => {
  const integration = await Integration2Service.findBySlug(query.slug.toLowerCase())

  if (!integration) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      integration
    }
  }
})

export default IntegrationsDetail
