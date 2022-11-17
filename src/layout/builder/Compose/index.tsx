import { notification } from '@heyforms/ui'
import { conv } from '@nily/utils'
import { FC, useEffect, useMemo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useProduct } from '~/layout'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { Queue } from '~/utils'

import { BlockList } from './BlockList'
import { ComposeStoreProvider, useComposeStore } from './store'
import { BubbleMenu, CommandMenu, SiteHeader, StripeConnectModal } from './views'

const Component = () => {
  const { siteSettings } = useStore()
  const { state, dispatch } = useComposeStore()
  const product = useProduct()

  const queue = useMemo(() => {
    return new Queue({
      concurrency: 1,
      scheduleInterval: 5_000,
      taskIntervalTime: 10_000
    })
  }, [product.id])

  async function syncData() {
    try {
      await SiteSettingsService.update(product.id, {
        content: JSON.stringify(state.blocks) as any
      })
    } catch (err: any) {
      notification.error({
        message: 'Error',
        title: err.message
      })
    }
  }

  function visibilityListener() {
    if (document.visibilityState === 'hidden') {
      syncData()
    }
  }

  useEffect(() => {
    const blocks = conv.json<Block[]>(siteSettings.content, [])!

    dispatch({
      type: 'setBlocks',
      payload: blocks
    })
  }, [siteSettings?.content])

  useEffect(() => {
    // Add to queue
    if (state.syncVersion > 0) {
      queue.add(async () => {
        await syncData()
      })
    }

    document.addEventListener('visibilitychange', visibilityListener)

    return () => {
      document.removeEventListener('visibilitychange', visibilityListener)
    }
  }, [state.syncVersion])

  return (
    <div className="pl-72 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SiteHeader />

        <div className="editor-content mt-6">
          <DndProvider backend={HTML5Backend}>
            <BlockList />
          </DndProvider>
        </div>

        <CommandMenu />
        <BubbleMenu />
        <StripeConnectModal />
      </div>
    </div>
  )
}

const Compose: FC = () => {
  return (
    <ComposeStoreProvider>
      <Component />
    </ComposeStoreProvider>
  )
}

export default Compose
