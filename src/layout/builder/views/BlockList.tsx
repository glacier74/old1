import { isValid } from '@nily/utils'
import { useTour } from '@reactour/tour'
import clsx from 'clsx'
import { FC, useEffect } from 'react'

import { useTourStorage } from '~/components'
import { THEMES } from '~/constants'
import { insertThemeStyle, loadFont } from '~/layout/builder/utils'
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
      payload: {
        blocks: siteSettings.blocks || [],
        theme: (isValid(siteSettings.theme) ? siteSettings.theme : THEMES[0]) as any
      }
    })
  }, [siteSettings?.blocks, siteSettings?.theme])

  useEffect(() => {
    if (isValid(state.theme)) {
      loadFont(state.theme.fontFamily)
      insertThemeStyle(state.theme)
    }
  }, [state.theme])

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
