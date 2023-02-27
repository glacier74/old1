import { FC, useContext, useEffect, useState } from 'react'
import Frame, { FrameContext } from 'react-frame-component'

import { useBuilderContext } from '~/layout/builder2/context'
import { BlockWrapper } from '~/layout/builder2/editor/BlockWrapper'
import { useStore } from '~/store'

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
    setMounted(true)

    return () => {
      observer.disconnect()
    }
  }, [])

  // https://github.com/ryanseddon/react-frame-component/pull/207#issuecomment-1043023525
  const [isMounted, setMounted] = useState(false)

  return (
    <div className={`builder-editor builder-editor-${state.previewMode}`}>
      {isMounted && (
        <Frame
          className="w-full h-full"
          initialContent="<!DOCTYPE html><html><head></head><body class='scrollbar'><div></div></body></html>"
        >
          <FrameScript styles={styles} />
          {state.blockDatalist.map((data: any) => (
            <BlockWrapper key={data.id} data={data} />
          ))}
        </Frame>
      )}
    </div>
  )
}
