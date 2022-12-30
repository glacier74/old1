import { StepType } from '@reactour/tour'
import { useTranslation } from 'next-i18next'

import { AsyncRequest, Tour } from '~/components'
import { AuthorizedLayout, useProduct } from '~/layout'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'

import { BuilderProvider } from './context'
import { BlockList, DesignSidebar, LeftSidebar, Navbar, RightSidebar } from './views'

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
      selector: '.addBlock',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">Add UI blocks</div>
          <div>
            UI blocks include ready-made design elements such as header, hero, feature, footer,
            buttons, payment blocks, and other interface components. Choose them one by one and
            start editing.
          </div>
        </div>
      )
    },
    {
      selector: '.blockSidebar',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">Organize UI blocks</div>
          <div>
            Organize UI blocks like Legos to form a landing page structure. Apply one of our themes
            or create a design structure from scratch that resonates with your audience and niche.
          </div>
        </div>
      )
    },
    {
      selector: '.pageSettings',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">Settings</div>
          <div>
            In settings, you can edit and preview the SEO metadata and social media card details of
            the landing page, make the page private, manage the public site URL, and set a default
            language for visitors.
          </div>
        </div>
      )
    },
    {
      selector: '.builder-publish',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">Publish</div>
          <div>
            Click the "Publish" button to sync the updates made to blocks on the landing page. This
            will apply any changes or additions made to the page and make them visible to users.
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
          <Tour steps={steps}>
            <div className="flex flex-col h-full h-screen overflow-hidden">
              <Navbar />
              <BlockList />
            </div>

            <LeftSidebar />
            <RightSidebar />
            <DesignSidebar />
          </Tour>
        </BuilderProvider>
      </AsyncRequest>
    </AuthorizedLayout>
  )
}
