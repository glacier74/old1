import { conv, isEmpty, isValidArray } from '@nily/utils'
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

    // Select first block
    if (isEmpty(state.selectBlockId) && isValidArray(blocks)) {
      dispatch({
        type: 'selectBlock',
        payload: {
          blockId: blocks[0].id
        }
      })
    }

    dispatch({
      type: 'setBlocks',
      payload: blocks
    })
  }, [siteSettings?.blocks, state.selectBlockId])

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
