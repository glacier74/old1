import { useTranslation } from 'next-i18next'

import { AsyncRequest } from '~/components'
import { AuthorizedLayout, useProduct } from '~/layout'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'

import { Compose } from './Compose'
import { SiteSettings } from './SiteSettings'

export const Editor = () => {
  const { t } = useTranslation()
  const { setSiteSettings } = useStore()
  const product = useProduct()

  async function fetchSiteSettings() {
    setSiteSettings(await SiteSettingsService.detail(product.id))
    return true
  }

  return (
    <AuthorizedLayout
      seo={{
        title: t('editor.title', { name: product.name || '' })
      }}
    >
      <div className="w-full min-h-screen bg-white">
        <AsyncRequest request={fetchSiteSettings} deps={[product.id]}>
          <SiteSettings />
          <Compose />
        </AsyncRequest>
      </div>
    </AuthorizedLayout>
  )
}
