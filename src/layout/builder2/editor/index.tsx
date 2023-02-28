import { Button, EmptyStates } from '@heyforms/ui'
import { isValidArray } from '@nily/utils'
import { IconLayoutGrid } from '@tabler/icons'
import { FC, useContext, useEffect, useState } from 'react'
import Frame, { FrameContext } from 'react-frame-component'

import { useBuilderContext } from '~/layout/builder2/context'
import { useStore } from '~/store'

import { BlockWrapper } from './BlockWrapper'

const FrameScript: FC<{ styles?: string }> = ({ styles }) => {
  const { document } = useContext(FrameContext)

  useEffect(() => {
    if (document?.head && styles) {
      document.head.innerHTML = styles
    }
  }, [document, styles])

  return null
}

export const Editor: FC = () => {
  const { siteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()
  const [styles, setStyles] = useState<string>()

  function getStyles() {
    let head = ''

    const stylesheets = Array.from(document.querySelectorAll('link[rel=stylesheet]'))
    const inlineStyles = Array.from(document.querySelectorAll('head style'))

    stylesheets.forEach(link => {
      head += link.outerHTML
    })

    inlineStyles.forEach(style => {
      head += style.outerHTML
    })

    return head
  }

  function handleModalOpen() {
    dispatch({
      type: 'updateState',
      payload: {
        updates: {
          isCreateBlockModalOpen: true
        }
      }
    })
  }

  useEffect(() => {
    dispatch({
      type: 'initState',
      payload: {
        blockDatalist: (siteSettings.blocks as any[]) || []
      }
    })
  }, [siteSettings?.blocks])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setStyles(getStyles())
    })

    observer.observe(document.head, {
      attributes: true,
      childList: true,
      subtree: true
    })

    setStyles(getStyles())

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className={`builder-editor builder-editor-${state.previewMode}`}>
      {isValidArray(state.blockDatalist) ? (
        <Frame
          className="w-full h-full scrollbar"
          initialContent="<!DOCTYPE html><html><head></head><body class='iframe-scrollbar'><div></div></body></html>"
        >
          <FrameScript styles={styles} />
          {state.blockDatalist.map((data: any) => (
            <BlockWrapper key={data.id} data={data} />
          ))}
        </Frame>
      ) : (
        <EmptyStates
          className="pt-[18rem]"
          icon={<IconLayoutGrid className="non-scaling-stroke" />}
          title="This page currently has no blocks"
          description="A block is a modular element of a webpage that can contain different types of content. You can click the button below to add one."
          action={<Button onClick={handleModalOpen}>Add block</Button>}
        />
      )}
    </div>
  )
}
