import { useTranslation } from 'next-i18next'

import { withTranslations } from '~/utils'

const PublicSite = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <div>
      <div></div>
    </div>
  )
}

export const getServerSideProps = withTranslations(async context => {
  // TODO - Private site need login

  return {
    props: {}
  }
})

export default PublicSite
