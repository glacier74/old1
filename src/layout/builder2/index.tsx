import { Button, EmptyStates } from '@heyforms/ui'
import { IconTransform } from '@tabler/icons'
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
                className="flex-1 pt-60 bg-slate-50"
                icon={<IconTransform />}
                title="Block schema conversion"
                description={
                  <div className="space-y-2">
                    <p>
                      Your landing page currently utilizes an older version of the block schema, and
                      in order to make changes, you need to upgrade to the latest version.
                    </p>
                    <p>
                      Nevertheless, your website remains accessible to visitors even if you decide
                      not to upgrade.
                    </p>
                  </div>
                }
                action={
                  <Button loading={loading} onClick={request}>
                    Upgrade to latest schema
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
