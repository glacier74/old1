import { GlobalContext } from '@earlybirdim/components'
import { Tooltip } from '@heyforms/ui'
import { IconPlus } from '@tabler/icons'
import { FC, useCallback, useEffect, useMemo } from 'react'
import Frame from 'react-frame-component'
import { useLocalStorage } from 'react-use'

import { IconRotatedArrow } from '~/components'
import { useProduct } from '~/layout'
import { PublicSiteDangerouslyHTML } from '~/layout/public-site/PublicSiteDangerouslyHTML'
import { PublicSiteHiddenBlocksStyle } from '~/layout/public-site/PublicSiteHiddenBlocksStyle'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { isResponseError, useVisible } from '~/utils'

import { useBuilderContext } from '../context'
import templates from '../templates'
import { Queue, formOptionWalker } from '../utils'
import { AlertModal } from './AlertModal'
import { CodeInjectionModal } from './CodeInjectionModal'
import { ScrollIntoView } from './ScrollIntoView'

export const Preview: FC = () => {
  const { siteSettings, updateSiteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()
  const product = useProduct()

  const [value, setValue] = useLocalStorage('jinglebio-tour-v1')

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

  function handleAddWidget() {
    setValue(true)
    dispatch({
      type: 'updateState',
      payload: {
        selectedSection: {
          type: 'add-widget'
        }
      }
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
          className="w-full h-full"
          initialContent="<!DOCTYPE html><html class='scroll-smooth'><head><script src='https://cdn.tailwindcss.com'></script><script>tailwind.config = {darkMode: 'class'}</script><script>document.addEventListener('click',function(event){var a=event.target;var depth=10;while(a&&a.tagName!=='A'&&depth-->0){a=a.parentNode}if(a&&a.tagName=='A'){event.preventDefault()}});</script></head><body class='iframe-scrollbar'><div></div></body></html>"
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
              html {
                width: 100vw;
                height: 100vh;
                overflow: hidden;
              }
              body {
                height: 100vh;
                overflow-x: hidden;
                overflow-y: auto;
              }
              .tooltip {
                pointer-events: none;
                z-index: 50;
                white-space: pre;
                overflow-wrap: break-word;
                border-radius: 0.25rem;
                padding-left: 0.625rem;
                padding-right: 0.625rem;
                padding-top: 0.375rem;
                padding-bottom: 0.375rem;
                text-align: center;
                font-size: 0.75rem;
                line-height: 1rem;
                color: #fff;
                text-decoration: none;
                text-shadow: none;
                text-transform: none;
                letter-spacing: normal;
                background: #1f1f1f;
              }
              .widget-active .widget-body,
              .widget-active .widget-actions {
                opacity: 0;
              }
              .widget-active .widget-content {
                background: #fbfbfb;
                box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
              }
              .dark .widget-active .widget-content {
                background: #1e293b;
              }
              `
            }}
          />

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

      {product.isJingleBio && (
        <>
          <div className="fixed bottom-8 right-8 z-20">
            <Tooltip ariaLabel="Add Widget">
              <button
                type="button"
                className="p-2 rounded-full bg-white hover:bg-slate-100 hover:text-slate-900 shadow-[rgba(0,0,0,0.08)_0px_2px_4px,rgba(0,0,0,0.06)_0px_2px_12px,rgba(0,0,0,0.04)_0px_8px_14px,rgba(0,0,0,0.02)_0px_12px_16px]"
                onClick={handleAddWidget}
              >
                <IconPlus />
              </button>
            </Tooltip>
          </div>
          {!value && (
            <div className="fixed inset-0 pointer-events-none bg-black/50 z-10">
              <div className="fixed bottom-11 right-20 animate-bounce-x">
                <div className="flex items-center gap-2 text-white">
                  <span className="text-sm">Click to add a widget</span>
                  <IconRotatedArrow className="h-5" />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <AlertModal visible={alertModalVisible} />
      <CodeInjectionModal />
    </div>
  )
}
