import { useTranslation } from 'next-i18next'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import {
  GumroadAdvantages,
  GumroadCTA,
  GumroadComparison,
  GumroadHero
} from '~/layout/gumroad-alternative'
import { withTranslations } from '~/utils'

const Pricing = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HomeLayout
      seo={{
        title: t('gumroad.title'),
        url: '/gumroad-alternative'
      }}
    >
      <HomeHeader />
      <GumroadHero />
      <GumroadComparison />
      <GumroadAdvantages />
      <GumroadCTA />
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
