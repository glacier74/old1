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
  const { t } = useTranslation('pricing')
  const [billingCycle, setBillingCycle] = useState('yearly')

  return (
    <HomeLayout
      seo={{
        title: t('title'),
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

export const getServerSideProps = withTranslations(
  async context => {
    return {
      props: {}
    }
  },
  ['common', 'pricing'],
  {
    redirectOnLocale: true
  }
)

export default Pricing
