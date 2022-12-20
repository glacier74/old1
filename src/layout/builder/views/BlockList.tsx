import { useTour } from '@reactour/tour'
import clsx from 'clsx'
import { FC, useEffect } from 'react'

import { useTourStorage } from '~/components'
import { useStore } from '~/store'

import { BlockWrapper } from '../blocks'
import { useBuilderContext } from '../context'
import { BubbleMenu, StripeConnectModal } from '../views'

export const BlockList: FC = () => {
  const { siteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()
  const { setIsOpen } = useTour()
  const [value, setValue] = useTourStorage('builder')

  useEffect(() => {
    if (!value) {
      setIsOpen(true)
      setValue(true)
    }

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
