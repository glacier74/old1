import { Modal } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import party from 'party-js'
import { startTransition, useEffect, useMemo, useRef, useState } from 'react'

import { IconAI, Spin } from '~/components'
import { useBuilderContext, useMergeOptions } from '~/layout/builder3/context'
import { ProductService, SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { useVisible } from '~/utils'

export const Completions = () => {
  const { siteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()
  const mergeOptions = useMergeOptions()

  const unfinished = useMemo(
    () => state.completions.filter(c => !siteSettings.completions.includes(c.name)),
    [siteSettings.completions, state.completions]
  )

  const [error, setError] = useState<string>()
  const loadingRef = useRef(false)

  const [visible, open, close] = useVisible()

  const selected = useMemo(
    () => state.completions.find(c => c.name === state.selectedCompletionName),
    [state.completions, state.selectedCompletionName]
  )

  async function handleCompletions(unfinished: any[]) {
    if (loadingRef.current || unfinished.length < 1) {
      return
    }

    setError(undefined)
    loadingRef.current = true

    const selected = unfinished[0]

    dispatch({
      type: 'updateState',
      payload: {
        selectedCompletionName: selected.name
      }
    })

    await ProductService.completions(siteSettings.productId, selected, {
      onMessage: data => {
        startTransition(() => {
          mergeOptions(selected.name, data[selected.name])
        })
      },
      onFinish: async (err?: string, data?: AnyMap<any>) => {
        loadingRef.current = false

        if (err) {
          return setError(err)
        }

        // Generating again if error occurred in GPT response.
        if (isEmpty(data)) {
          return handleCompletions(unfinished)
        }

        // 删除第一个
        unfinished.shift()

        const unfinishedNames = unfinished.map(u => u.name)

        await SiteSettingsService.updateSettings(siteSettings.productId, {
          completions: state.completions
            .filter(c => !unfinishedNames.includes(c.name))
            .map(c => c.name)
        })

        if (unfinished.length > 0) {
          return handleCompletions(unfinished)
        }

        party.confetti(document.querySelector('.builder-editor') as HTMLElement, {
          count: [40, 80],
          speed: [800, 1_600]
        })

        dispatch({
          type: 'updateState',
          payload: {
            selectedCompletionName: undefined
          }
        })
      }
    })
  }

  function handleConfirm() {
    handleCompletions(unfinished)
    close()
  }

  useEffect(() => {
    // 新建 project
    if (siteSettings.version === 0) {
      handleCompletions(unfinished)
    }

    // 上次未完成 AI completions，询问用户是否继续
    else if (unfinished.length > 0) {
      open()
    }
  }, [])

  return (
    <>
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-[9999]">
          <div className="w-full h-full flex flex-col items-center justify-center gap-6">
            <Spin className="!w-6 !h-6 !text-white" />
            {error ? (
              <div className="text-xl font-semibold text-red-500 text-center">{error}</div>
            ) : (
              <div className="text-white text-center">
                <div className="text-xl font-semibold">Generating copies for Header</div>
                <div className="text-sm mt-2">
                  This may take a few seconds, please don't close this page.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Modal.Confirm
        type="success"
        visible={visible}
        icon={<IconAI />}
        title="There are still some unfinished copies that have not been generated by AI."
        description="Would you like AI to continue generating the copies for you?"
        cancelLabel="Cancel"
        confirmLabel="Confirm"
        onCancel={close}
        onConfirm={handleConfirm}
      />
    </>
  )
}
