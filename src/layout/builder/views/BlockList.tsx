import { conv } from '@nily/utils'
import { FC, useEffect } from 'react'

import { useOpenTour } from '~/components'
import { useStore } from '~/store'

import { BlockWrapper } from '../blocks'
import { useBuilderContext } from '../context'
import { BubbleMenu, NavigationModal, SocialMediaModal, StripeConnectModal } from '../views'

export const BlockList: FC = () => {
  const { siteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()

  // Open builder tour
  useOpenTour('builder')

  useEffect(() => {
    const blocks = conv.json<Block[]>(siteSettings.blocks, [])!

    dispatch({
      type: 'initBlocks',
      payload: blocks
    })
  }, [siteSettings?.blocks])

  return (
    <>
      <div className="builder-blocks">
        <div className="builder-blocks-container">
          {state.blocks.map(block => (
            <BlockWrapper key={block.id} block={block} />
          ))}
        </div>
      </div>

      <BubbleMenu />
      <StripeConnectModal />
      <SocialMediaModal />
      <NavigationModal />
    </>
  )
}
