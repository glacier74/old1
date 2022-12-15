import clsx from 'clsx'
import { FC, useEffect } from 'react'

import { useOpenTour } from '~/components'
import { useStore } from '~/store'

import { BlockWrapper } from '../blocks'
import { useBuilderContext } from '../context'
import { BubbleMenu, StripeConnectModal } from '../views'

export const BlockList: FC = () => {
  const { siteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()

  // Open builder tour
  useOpenTour('builder')

  useEffect(() => {
    dispatch({
      type: 'initBlocks',
      payload: siteSettings.blocks || []
    })
  }, [siteSettings?.blocks])

  return (
    <>
      <div
        className={clsx('builder-main', {
          'builder-main-mobile': state.previewMode === 'mobile'
        })}
      >
        <div className="builder-block-list scrollbar">
          {state.blocks.map(block => (
            <BlockWrapper key={block.id} block={block} />
          ))}
        </div>
      </div>

      <BubbleMenu />
      <StripeConnectModal />
    </>
  )
}
