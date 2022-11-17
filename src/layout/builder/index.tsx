import { useTranslation } from 'next-i18next'

import { AsyncRequest } from '~/components'
import { AuthorizedLayout, useProduct } from '~/layout'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'

import Compose from './Compose'
import { SiteSettings } from './SiteSettings'

// TODO - Delete Array.prototype.at polyfill https://github.com/vercel/next.js/pull/42307
if (!Array.prototype.at) {
  Array.prototype.at = function (index: number) {
    const len = this.length
    const k = index >= 0 ? index : len + index

    return k < 0 || k >= len ? undefined : this[k]
  }
}

export const Builder = () => {
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
        title: t('builder.title', { name: product.name || '' })
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
