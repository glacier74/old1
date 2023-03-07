import { Button, EmptyStates } from '@heyforms/ui'
import { useRef } from 'react'

import { AsyncRequest, AsyncRequestInstance } from '~/components'
import { useProduct } from '~/layout'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { useRequest } from '~/utils'

import { BuilderProvider } from './context'
import { Editor } from './editor'
import { LeftSidebar } from './leftSidebar'
import { ConversionNavbar, Navbar } from './navbar'
import { RightSidebar } from './rightSidebar'

export const Builder2 = () => {
  const { siteSettings, setSiteSettings } = useStore()
  const product = useProduct()

  const asyncRequestRef = useRef<AsyncRequestInstance>()

  async function fetchSiteSettings() {
    setSiteSettings(await SiteSettingsService.detail(product.id))
    return true
  }

  const { loading, request } = useRequest(async () => {
    await SiteSettingsService.upgradeSchema(product.id)
    asyncRequestRef.current?.reload()
  }, [product.id])

  return (
    <AsyncRequest
      ref={asyncRequestRef as any}
      className="w-full min-h-screen bg-white"
      request={fetchSiteSettings}
      deps={[product.id]}
    >
      <BuilderProvider
        initialState={{
          blocks: siteSettings.draft as any
        }}
      >
        <div className="flex flex-col w-full w-screen h-full h-screen overflow-hidden">
          {siteSettings.schema === 1 ? (
            <>
              <ConversionNavbar />
              <EmptyStates
                className="flex-1 pt-48 max-w-2xl mx-auto text-left"
                title="🔥 We've upgraded our builder"
                description={
                  <div className="space-y-2 text-lg text-left text-slate-500">
                    <p>
                      We've just launched our new builder with more UI blocks, and your landing page
                      currently uses an older block schema version. To edit the landing page, you
                      must upgrade the schema to the latest version.
                    </p>
                    <p>
                      Your website will still be available to visitors even if you choose not to
                      upgrade. However, you won't be able to make any further edits to it.
                    </p>
                  </div>
                }
                action={
                  <Button
                    loading={loading}
                    onClick={request}
                    className="!bg-emerald-500 !text-white !py-2 !text-lg"
                  >
                    👉 Upgrade to the latest builder
                  </Button>
                }
              />
            </>
          ) : (
            <>
              <Navbar />
              <div className="builder-main">
                <LeftSidebar />
                <Editor />
                <RightSidebar />
              </div>
            </>
          )}
        </div>
      </BuilderProvider>
    </AsyncRequest>
  )
}
