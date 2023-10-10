import { useTranslation } from 'next-i18next'

import { CreateProductLayout, OpenAppAuthorize } from '~/layout'
import { withTranslations } from '~/utils'

const OauthAuthorize = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <CreateProductLayout seo={{ title: t('openApp.authorize.title') }}>
      <OpenAppAuthorize />
    </CreateProductLayout>
  )
}

export const getServerSideProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default OauthAuthorize
