import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import {
  PricingCTA,
  PricingComparison,
  PricingFAQ,
  PricingHero,
  PricingPlans
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

export const getStaticProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default Pricing
