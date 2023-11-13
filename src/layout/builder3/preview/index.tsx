import { GlobalContext } from '@earlybirdim/components'
import { FC, useCallback, useEffect, useMemo } from 'react'
import Frame from 'react-frame-component'

import { useProduct } from '~/layout'
import { CodeInjectionModal } from '~/layout/builder3/preview/CodeInjectionModal'
import { PublicSiteDangerouslyHTML } from '~/layout/public-site/PublicSiteDangerouslyHTML'
import { PublicSiteHiddenBlocksStyle } from '~/layout/public-site/PublicSiteHiddenBlocksStyle'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { isResponseError, useVisible } from '~/utils'

import { useBuilderContext } from '../context'
import templates from '../templates'
import { Queue, formOptionWalker } from '../utils'
import { AlertModal } from './AlertModal'
import { ScrollIntoView } from './ScrollIntoView'

export const Preview: FC = () => {
  const { siteSettings, updateSiteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()
  const product = useProduct()

  const [alertModalVisible, openAlertModal] = useVisible()
  const queue = useMemo(() => new Queue(), [])

  useEffect(() => {
    return () => {
      queue.clear()
    }
  }, [])

  const sync = useCallback(async () => {
    try {
      // Add id to form type
      const draft = state.options
      formOptionWalker(draft)

      const result = await SiteSettingsService.updateDraft(product.id, {
        draft,
        version: siteSettings.version
      })

      updateSiteSettings(result)
    } catch (err: any) {
      if (isResponseError(err, 'invalid_draft_version')) {
        openAlertModal()
      }
    }
  }, [product.id, siteSettings.version, state.options])

  function updateSyncing(isSyncing: boolean, lastSyncedAt?: number) {
    const updates: AnyMap<unknown> = {
      isSyncing
    }

    if (lastSyncedAt) {
      updates.lastSyncedAt = lastSyncedAt
    }

    dispatch({
      type: 'updateState',
      payload: updates
    })
  }

  queue.on(event => {
    switch (event) {
      case 'start':
        queue.sync(sync)
        updateSyncing(true)
        break

      case 'complete':
      case 'failed':
        updateSyncing(false, queue.lastSyncedAt)
        break
    }
  })

  // Auto save
  useEffect(() => {
    if (state.version > 0) {
      queue.add()
    }
  }, [state.version])

  useEffect(() => {
    return () => {
      queue.clear()
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <div className={`builder-editor builder-editor-${state.previewMode}`}>
        <Frame
          className="w-full h-full scrollbar"
          initialContent="<!DOCTYPE html><html class='scroll-smooth'><head><script src='https://cdn.tailwindcss.com'></script><script>tailwind.config = {darkMode: 'class'}</script><script>document.addEventListener('click',function(event){var a=event.target;var depth=3;while(a&&a.tagName!=='A'&&depth-->0){a=a.parentNode}if(a&&a.tagName=='A'){event.preventDefault()}});</script></head><body class='iframe-scrollbar'><div></div></body></html>"
        >
          <ScrollIntoView
            selectedOptionName={state.selectedOptionName}
            selectedCompletionName={state.selectedCompletionName}
            selectedListId={state.selectedListId}
          />

          <GlobalContext.Provider
            value={{
              productId: product.id,
              isPreview: true
            }}
          >
            {templates[siteSettings.template]?.render({
              product,
              options: state.options,
              hiddenBlocks: siteSettings.hiddenBlocks
            })}
          </GlobalContext.Provider>

          <PublicSiteDangerouslyHTML html={siteSettings.customCode} />
          <PublicSiteHiddenBlocksStyle hiddenBlocks={siteSettings.hiddenBlocks} />
        </Frame>
      </div>

      <AlertModal visible={alertModalVisible} />
      <CodeInjectionModal />
    </div>
  )
}
