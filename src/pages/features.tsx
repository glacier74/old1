import { 
    HomeLayout,
    HomeFooter,
    HomeHeader
} from '~/layout'
import {
    FeaturesHero,
    FeaturesBuild,
    FeaturesPitch,
    FeaturesValidate,
    FeaturesCTA
} from '~/layout/features'
import { withTranslations } from '~/utils'

const Features = (): JSX.Element => {
  return (
    <HomeLayout>
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

export const getServerSideProps = withTranslations(async context => {
    return {
      props: {}
    }
  })

export default Features
