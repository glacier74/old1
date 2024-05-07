import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import {
  MicroSaasIdeasConcept,
  MicroSaasIdeasHelp,
  MicroSaasIdeasHero,
  MicroSaasIdeasJourney,
  MicroSaasIdeasSubscribe,
  MicroSaasIdeasTop,
  MicroSaasIdeasTriumphs
} from '~/layout/micro-saas-ideas'
import { withTranslations } from '~/utils'

interface MicroSaasIdeasProps {
  microsaasideasData: []
}

const MicroSaasIdeas = ({ microsaasideasData }: MicroSaasIdeasProps): JSX.Element => {
  const { t } = useTranslation()
  useEffect(() => {
    if (Array.isArray(microsaasideasData)) {
      microsaasideasData.sort((a, b) => a['Auto ID'] - b['Auto ID'])
    }
  }, [])

  return (
    <HomeLayout
      seo={{
        title: t('microSaasIdeas.title'),
        url: '/microSaasIdeas'
      }}
    >
      <HomeHeader />
      <MicroSaasIdeasHero />
      <MicroSaasIdeasConcept />
      <MicroSaasIdeasTop microsaasideasData={microsaasideasData} />
      <MicroSaasIdeasSubscribe />
      <MicroSaasIdeasTriumphs />
      <MicroSaasIdeasHelp />
      <MicroSaasIdeasJourney />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  let microsaasideasData = []

  try {
    const response = await fetch('https://backend-earlybird.vercel.app/api/microsaasideas')
    if (response.ok) {
      microsaasideasData = await response.json()
    } else {
      throw new Error('Request failed with status ' + response.status)
    }
  } catch (err: any) {
    console.error(err.message)
  }

  return {
    props: {
      microsaasideasData: microsaasideasData
    }
  }
})

export default MicroSaasIdeas
