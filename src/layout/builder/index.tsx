import { StepType } from '@reactour/tour'
import { useTranslation } from 'next-i18next'

import { AsyncRequest, Tour } from '~/components'
import { AuthorizedLayout, useProduct } from '~/layout'
import { Navbar } from '~/layout/builder/views/Navbar'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'

import { BuilderProvider } from './context'
import { BlockList, Sidebar } from './views'

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
      selector: '.builder-create-button',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">{t('builder.addNewBlock')}</div>
          <div>{t('builder.addNewBlock')}</div>
        </div>
      ),
      position: 'left'
    },
    {
      selector: '.block-card-selected',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">Reorder block</div>
          <div>Click and hold the block, then drag to a new location to reorder these blocks.</div>
        </div>
      ),
      position: 'left'
    },
    {
      selector: '.block-card-menu-open',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">Block menu</div>
          <div>
            Click the rectangle made of three dots to expand the dropdown menu, where you can
            duplicate or delete the block, and you can also set the layout, links, payment, footer
            social medias and other settings of these blocks.{' '}
            <a href="#" className="underline">
              Learn more about block settings.
            </a>
          </div>
        </div>
      ),
      position: 'left'
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
            <div className="flex flex-col h-full">
              <Navbar />

              <div className="flex-1 flex">
                <Sidebar />
                <BlockList />
              </div>
            </div>
          </Tour>
        </BuilderProvider>
      </AsyncRequest>
    </AuthorizedLayout>
  )
}
