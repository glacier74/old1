import { StepType } from '@reactour/tour'
import { useTranslation } from 'next-i18next'

import { AsyncRequest, Tour } from '~/components'
import { AuthorizedLayout, useProduct } from '~/layout'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'

import { BuilderProvider } from './context'
import { BlockList, LeftSidebar, Navbar, RightSidebar } from './views'

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

  const steps: StepType[] = [
    {
      selector: '.block-header',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">Header</div>
          <div>xxxx</div>
        </div>
      )
    },
    {
      selector: '.block-herosection',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">Hero section</div>
          <div>xxxx</div>
        </div>
      )
    },
    {
      selector: '.block-feature',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">Feature</div>
          <div>xxxx</div>
        </div>
      )
    },
    {
      selector: '.builder-publish',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">Publish</div>
          <div>
            When you add or update some blocks, you can click "Publish" button to sync these updates
            to server.
          </div>
        </div>
      )
    }
  ]

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
      <AsyncRequest
        className="w-full min-h-screen bg-white"
        request={fetchSiteSettings}
        deps={[product.id]}
      >
        <BuilderProvider>
          <Tour steps={steps} name="builder">
            <div className="flex flex-col h-full h-screen overflow-hidden">
              <Navbar />
              <BlockList />
            </div>

            <LeftSidebar />
            <RightSidebar />
          </Tour>
        </BuilderProvider>
      </AsyncRequest>
    </AuthorizedLayout>
  )
}
