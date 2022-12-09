import { 
    HomeLayout,
    HomeFooter,
    HomeHeader
} from '~/layout'
import {
    FeaturesHero
} from '~/layout/features'
import { withTranslations } from '~/utils'

const Features = (): JSX.Element => {
  return (
    <HomeLayout>
        <HomeHeader />
        <FeaturesHero />
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
