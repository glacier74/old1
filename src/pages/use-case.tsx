import { useTranslation } from 'next-i18next'

import { HomeFooter, HomeHeader, HomeLayout } from '~/layout'
import {
  UseCaseBuild,
  UseCaseHelp,
  UseCaseHero,
  UseCaseReason,
  UseCaseUnlock
} from '~/layout/use-case'
import { withTranslations } from '~/utils'

const UseCase = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HomeLayout
      seo={{
        title: t('useCase.title'),
        url: '/useCase'
      }}
    >
      <HomeHeader />
      <UseCaseHero />
      <UseCaseReason />
      <UseCaseHelp />
      <UseCaseUnlock />
      <UseCaseBuild />
      <HomeFooter />
    </HomeLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default UseCase
