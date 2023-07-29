import { GlobalContext } from '@earlybirdim/components'
import { FC, useCallback, useEffect, useMemo } from 'react'
import Frame from 'react-frame-component'

import { useProductId } from '~/layout'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { useVisible } from '~/utils'

import { useBuilderContext } from '../context'
import templates from '../templates'
import { Queue } from '../utils'
import { AlertModal } from './AlertModal'
import { ScrollIntoView } from './ScrollIntoView'

export const Preview: FC = () => {
  const { siteSettings, updateSiteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()
  const productId = useProductId()

  const [alertModalVisible, openAlertModal] = useVisible()
  const queue = useMemo(() => new Queue(), [])

  useEffect(() => {
    return () => {
      queue.clear()
    }
  }, [])

  const sync = useCallback(async () => {
    try {
      const result = await SiteSettingsService.updateDraft(productId, {
        draft: state.options as any,
        version: siteSettings.version
      })

      updateSiteSettings(result)
    } catch (err: any) {
      if (err.error === 'invalid_draft_version') {
        openAlertModal()
      }
    }
  }, [productId, siteSettings.version, state.options])

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
    <>
      <div className={`builder-editor builder-editor-${state.previewMode}`}>
        <Frame
          className="w-full h-full scrollbar"
          initialContent="<!DOCTYPE html><html class='scroll-smooth'><head><script src='https://cdn.tailwindcss.com'></script></head><body class='iframe-scrollbar'><div></div></body></html>"
        >
          <ScrollIntoView
            selectedOptionName={state.selectedOptionName}
            selectedCompletionName={state.selectedCompletionName}
          />
          <GlobalContext.Provider
            value={{
              productId,
              isPreview: true
            }}
          >
            {templates[siteSettings.template]?.render({
              options: state.options
            })}
          </GlobalContext.Provider>
        </Frame>
      </div>

      <AlertModal visible={alertModalVisible} />
    </>
  )
}
