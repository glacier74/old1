import { AsyncRequest } from '~/components'
import { useProduct } from '~/layout'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'

import { BuilderProvider } from './context'
import { Editor } from './editor'
import { LeftSidebar } from './leftSidebar'
import { Navbar } from './navbar'
import { RightSidebar } from './rightSidebar'

export const Builder2 = () => {
  const { setSiteSettings } = useStore()
  const product = useProduct()

  async function fetchSiteSettings() {
    setSiteSettings(await SiteSettingsService.detail(product.id))
    return true
  }

  return (
    <AsyncRequest
      className="w-full min-h-screen bg-white"
      request={fetchSiteSettings}
      deps={[product.id]}
    >
      <BuilderProvider>
        <BuilderProvider>
          <div className="flex flex-col h-full h-screen overflow-hidden">
            <Navbar />
            <div className="builder-main">
              <LeftSidebar />
              <Editor />
              <RightSidebar />
            </div>
          </div>
        </BuilderProvider>
      </BuilderProvider>
    </AsyncRequest>
  )
}
