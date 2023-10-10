import { useTranslation } from 'next-i18next'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import {
  FeaturesBuild,
  FeaturesCTA,
  FeaturesHero,
  FeaturesPitch,
  FeaturesValidate
} from '~/layout/features'
import { withTranslations } from '~/utils'

const Features = (): JSX.Element => {
  const { t } = useTranslation('features')

  return (
    <HomeLayout
      seo={{
        title: t('title'),
        url: '/features'
      }}
    >
      <HomeHeader />
      <FeaturesHero />
      <FeaturesBuild />
      <FeaturesPitch />
      <FeaturesValidate />
      <FeaturesCTA />
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
  ['common', 'features'],
  {
    redirectOnLocale: true
  }
)

export default Features
