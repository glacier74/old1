import { Button, EmptyStates } from '@heyforms/ui'
import { isValidArray } from '@nily/utils'
import { IconLayoutGrid } from '@tabler/icons'
import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Frame, { FrameContext } from 'react-frame-component'

import { useProductId } from '~/layout'
import { useBuilderContext } from '~/layout/builder2/context'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { Queue } from '~/utils'

import { BlockWrapper } from './BlockWrapper'

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
  const { siteSettings, updateSiteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()
  const productId = useProductId()
  const [styles, setStyles] = useState<string>()

  const queue = useMemo(() => {
    return new Queue({
      concurrency: 1,
      scheduleInterval: 2_400,
      taskIntervalTime: 10_000
    })
  }, [])

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
        blocks: (siteSettings.blocks as any[]) || []
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
      queue.clear()
    }
  }, [])

  useEffect(() => {
    dispatch({
      type: 'initState',
      payload: {
        blocks: (siteSettings.draft as any) || []
      }
    })
  }, [siteSettings?.draft])

  const sync = useCallback(async () => {
    const result = await SiteSettingsService.updateDraft(productId, {
      draft: state.blocks as any,
      version: siteSettings.version
    })

    updateSiteSettings(result)
  }, [productId, siteSettings.version, state.blocks])

  // Auto save
  useEffect(() => {
    if (state.version > 0) {
      queue.add(async () => {
        await sync()
      })
    }
  }, [state.version])

  return (
    <div className={`builder-editor builder-editor-${state.previewMode}`}>
      {isValidArray(state.blocks) ? (
        <Frame
          className="w-full h-full scrollbar"
          initialContent="<!DOCTYPE html><html><head></head><body class='iframe-scrollbar'><div></div></body></html>"
        >
          <FrameScript styles={styles} />
          {state.blocks.map((block: any) => (
            <BlockWrapper key={block.id} block={block} />
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
