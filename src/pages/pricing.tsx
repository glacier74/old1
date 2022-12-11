import { 
    HomeLayout,
    HomeFooter,
    HomeHeader
} from '~/layout'
import {
    PricingHero,
    PricingPlans,
    PricingComparison,
    PricingFAQ,
    PricingCTA
} from '~/layout/pricing'
import { withTranslations } from '~/utils'

const Pricing = (): JSX.Element => {
  return (
    <HomeLayout>
        <HomeHeader />
        <PricingHero />
        <PricingPlans />
        <PricingComparison />
        <PricingFAQ />
        <PricingCTA />
        <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
    return {
      props: {}
    }
  })

export default Pricing
