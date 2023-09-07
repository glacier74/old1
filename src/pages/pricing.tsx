import { useTranslation } from 'next-i18next'
import { useState } from 'react'

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
  const { t } = useTranslation()
  const [billingCycle, setBillingCycle] = useState('yearly')

  return (
    <HomeLayout
      seo={{
        title: t('pricing.title'),
        url: '/pricing'
      }}
    >
      <HomeHeader />
      <PricingHero />
      <PricingPlans billingCycle={billingCycle} onChange={setBillingCycle} />
      <PricingComparison billingCycle={billingCycle} onChange={setBillingCycle} />
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
