import { Button } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'

import { CreateProductLayout } from '~/layout'
import { OpenAppService } from '~/service'
import { useParam, useRequest, withTranslations } from '~/utils'

const OauthAuthorize = (): JSX.Element => {
  const { t } = useTranslation()

  const clientId = useParam('client_id') as string
  const redirectUri = useParam('redirect_uri') as string
  const state = useParam('state') as string

  const { loading, request } = useRequest(
    async () => {
      const { authorizeUrl } = await OpenAppService.authorize(clientId, redirectUri, state)

      window.location.href = authorizeUrl
    },
    [clientId, redirectUri, state],
    {
      errorNotify: true
    }
  )

  return (
    <CreateProductLayout seo={{ title: t('oauth.authorize') }}>
      <Button onClick={request} loading={loading}>
        Authorize
      </Button>
    </CreateProductLayout>
  )
}

export const getStaticProps = withTranslations(async context => {
  return {
    props: {}
  }
})

export default OauthAuthorize
