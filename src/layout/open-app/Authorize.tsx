import { Button, EmptyStates } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { IconApiApp, IconBrandZapier, IconDots } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, useState } from 'react'
import { AsyncRequest, IconLogo, Loading } from '~/components'

import { OpenAppService } from '~/service'
import { useParam, useRequest } from '~/utils'

const OpenAppLogo: FC<Partial<OpenApp>> = ({ shortName }) => {
  switch(shortName) {
    case 'zapier':
    return <IconBrandZapier className="w-12 h-12 p-3 text-[#ff4f00] bg-white shadow rounded-full bg-white" />

    case 'earlybird':
      return <IconLogo className="w-12 h-12 p-3 bg-white shadow rounded-full bg-white" />

    default:
      return null;
  }
}

export const OpenAppAuthorize = (): JSX.Element => {
  const { t } = useTranslation()

  const clientId = useParam('client_id') as string
  const redirectUri = useParam('redirect_uri') as string
  const state = useParam('state') as string

  const [openApp, setOpenApp] = useState<{ name: string; shortName: string }>()

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

  async function fetchData() {
    const openApp = await OpenAppService.detail(clientId)

    setOpenApp(openApp)

    return isValid(openApp)
  }

  function handleCancel() {
    window.location.href = redirectUri
  }

  return (
    <AsyncRequest
    request={fetchData}
    deps={[clientId]}
    immediate={!!clientId}
    skeleton={<Loading />}
    emptyState={
      <EmptyStates
        icon={<IconApiApp />}
        title="App not found"
      />
    }
  >
<div className="mb-12">
  <div className="flex items-center justify-center space-x-4">
    <OpenAppLogo shortName="earlybird" />
    <IconDots className="text-slate-300" />
    <OpenAppLogo shortName={openApp?.shortName} />
  </div>
</div>

<h1 className="mt-2 mb-10 text-2xl font-bold text-slate-900">
  {t('openApp.authorize.heading', { openAppName: openApp?.name })}
</h1>

<div className="space-y-5">
  <div>
    <div className="text-base font-bold text-slate-900">
      {t('openApp.authorize.account.heading')}
    </div>
    <div className="text-sm text-slate-700">{t('openApp.authorize.account.description', { openAppName: openApp?.name })}</div>
  </div>

  <div>
    <div className="text-base font-bold text-slate-900">
      {t('openApp.authorize.product.heading')}
    </div>
    <div className="text-sm text-slate-700">{t('openApp.authorize.product.description', { openAppName: openApp?.name })}</div>
  </div>

  <div>
    <div className="text-base font-bold text-slate-900">
      {t('openApp.authorize.contact.heading')}
    </div>
    <div className="text-sm text-slate-700">{t('openApp.authorize.contact.description', { openAppName: openApp?.name })}</div>
  </div>

  <div>
    <div className="text-base font-bold text-slate-900">
      {t('openApp.authorize.payment.heading')}
    </div>
    <div className="text-sm text-slate-700">{t('openApp.authorize.payment.description', { openAppName: openApp?.name })}</div>
  </div>
</div>

<div className="mt-10 space-y-2">
  <Button className="block w-full" type="success" onClick={request} loading={loading}>
    Accept
  </Button>
  <Button.Link className="block w-full !py-2" onClick={handleCancel}>Cancel</Button.Link>
</div>
  </AsyncRequest>
  )
}
