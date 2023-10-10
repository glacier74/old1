import { useTranslation } from 'next-i18next'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { AboutEvolution, AboutHero, AboutPhilosophy, AboutTeam, AboutUncover } from '~/layout/about'
import { withTranslations } from '~/utils'

const About = (): JSX.Element => {
  const { t } = useTranslation('about')

  return (
    <HomeLayout
      seo={{
        title: t('title'),
        url: '/about'
      }}
    >
      <HomeHeader />
      <AboutHero />
      <AboutEvolution />
      <AboutTeam />
      <AboutPhilosophy />
      <AboutUncover />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(
  async context => {
    return {
      props: {}
    }
  },
  ['common', 'about'],
  {
    redirectOnLocale: true
  }
)

export default About
