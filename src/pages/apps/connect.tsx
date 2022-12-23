import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { BaseLayout } from '~/layout'

const AppConnect = () => {
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    const origin = window.location.origin

    if (window.opener && window.opener.origin === origin) {
      const data = {
        source: 'EARLYBIRD_APPS_CONNECT',
        payload: router.query
      }

      window.opener.postMessage(data, origin)
    }
  }, [router.isReady])

  return (
    <BaseLayout seo={{ title: t('stripe.title') }}>
      <div className="flex items-center justify-center w-screen h-screen bg-slate-100">
        <div className="text-lg text-slate-500">{t('stripe.connecting')}</div>
      </div>
    </BaseLayout>
  )
}

export default AppConnect
