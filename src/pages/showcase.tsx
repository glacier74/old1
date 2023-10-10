import { useTranslation } from 'next-i18next'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import { ShowcaseCTA, ShowcaseHero, ShowcaseList } from '~/layout/showcase'
import { withTranslations } from '~/utils'

const Features = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HomeLayout
      seo={{
        title: t('showcase.title'),
        url: '/showcase'
      }}
    >
      <HomeHeader />
      <ShowcaseHero />
      <ShowcaseList />
      <ShowcaseCTA />
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
