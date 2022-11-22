import { notification } from '@heyforms/ui'
import { conv } from '@nily/utils'
import { FC, useEffect, useMemo } from 'react'

import { useProduct } from '~/layout'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { Queue } from '~/utils'

import { BlockWrapper } from '../blocks'
import { useBuilderContext } from '../context'
import { BubbleMenu, NavigationModal, SocialMediaModal, StripeConnectModal } from '../views'

export const BlockList: FC = () => {
  const { siteSettings } = useStore()
  const product = useProduct()
  const { state, dispatch } = useBuilderContext()

  const queue = useMemo(() => {
    return new Queue({
      concurrency: 1,
      scheduleInterval: 1_000,
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
    <>
      <div className="block-list ml-64 min-h-screen">
        {state.blocks.map(block => (
          <BlockWrapper key={block.id} block={block} />
        ))}
      </div>

      <BubbleMenu />
      <StripeConnectModal />
      <SocialMediaModal />
      <NavigationModal />
    </>
  )
}
