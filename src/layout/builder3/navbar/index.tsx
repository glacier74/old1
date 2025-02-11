import { Button, Spin, Switch, Tooltip } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { IconChecks, IconChevronLeft, IconCode, IconPalette } from '@tabler/icons'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { useLocalStorage } from 'react-use'

import { IconAI, IconSidebar, IconSidebarOpen } from '~/components'
import { PLAN_LEVELS } from '~/constants'
import { useProduct } from '~/layout'
import { ShareModal } from '~/layout/builder/views/Navbar/ShareModal'
import { PlanCheck } from '~/layout/product/PlanCheck'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { isResponseError, useRequest, useVisible } from '~/utils'

import { useBuilderContext } from '../context'
import { AlertModal } from '../preview/AlertModal'

export const Navbar: FC = () => {
  const {
    siteSettings,
    updateSiteSettings,
    isBuilderSidebarOpen,
    openBuilderSidebar,
    closeBuilderSidebar,
    openAIModal,
    openCodeInjectionModal,
    openThemeModal
  } = useStore()
  const { state, dispatch } = useBuilderContext()
  const product = useProduct()

  const [shareModalVisible, openShareModal, closeShareModal] = useVisible()
  const [alertModalVisible, openAlertModal] = useVisible()

  const [tourv2, setTourv2] = useLocalStorage('jinglebio-tour-v2')

  const { loading, request } = useRequest(async () => {
    try {
      await SiteSettingsService.publish(product.id, {
        draft: state.options as any,
        version: siteSettings.version
      })

      updateSiteSettings({
        draft: state.options as any,
        canPublish: false
      })

      openShareModal()
    } catch (err: any) {
      if (isResponseError(err, 'invalid_draft_version')) {
        openAlertModal()
      }
    }
  }, [siteSettings.version, state.options])

  const previewModeOptions: any[] = useMemo(
    () => [
      {
        value: 'desktop',
        label: 'Desktop'
      },
      {
        value: 'tablet',
        label: 'Tablet'
      },
      {
        value: 'phone',
        label: 'Phone'
      }
    ],
    []
  )

  function handleModeChange(previewMode: any) {
    dispatch({
      type: 'updateState',
      payload: {
        previewMode
      }
    })
  }

  function handleOpenThemeModal() {
    setTourv2(true)
    openThemeModal()
  }

  return (
    <>
      <div className="relative flex items-center justify-between h-[3.5rem] px-4 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-slate-200 after:z-[15]">
        <div className="flex-1 flex items-center">
          <Link
            className="inline-flex items-center text-sm -ml-3 p-2 md:pl-1 md:pr-3 md:py-1.5 rounded hover:bg-slate-100"
            href={`/product/${product.id}`}
          >
            <IconChevronLeft className="w-5 h-5 text-slate-500" />
            <span className="hidden md:inline ml-1">{product.name}</span>
          </Link>

          <div className="flex items-center text-xs ml-0 md:ml-4 text-slate-700">
            {state.isSyncing ? (
              <>
                <Spin className="mr-1 w-4 h-4 text-slate-400" />
                <span className="hidden md:inline">Saving changes...</span>
              </>
            ) : state.lastSyncedAt > 0 ? (
              <>
                <IconChecks className="mr-1 w-4 h-4 text-slate-400" />
                <span className="hidden md:inline">
                  Saved at {dayjs(state.lastSyncedAt).format('h:mm A')}
                </span>
              </>
            ) : (
              <span className="hidden md:inline">Changes will be saved automatically</span>
            )}
          </div>
        </div>

        <div className="hidden flex-[2_1_0%] md:flex items-center justify-center">
          <Switch.Group
            className="builder-mode"
            value={state.previewMode}
            options={previewModeOptions}
            onChange={handleModeChange}
          />
        </div>

        <div className="flex-1 flex items-center justify-end gap-3">
          <div className="flex items-center justify-end gap-2">
            {isValid(state.completions) && (
              <Tooltip ariaLabel="AI assistant">
                <div>
                  <Button
                    className="!py-1.5"
                    leading={<IconAI className="w-7 h-7 text-slate-800" />}
                    onClick={openAIModal}
                  />
                </div>
              </Tooltip>
            )}

            <Tooltip ariaLabel="Insert custom code">
              <div>
                <PlanCheck
                  className="cursor-pointer !pointer-events-auto"
                  minimalLevel={PLAN_LEVELS.plan_shipper}
                  redirectUrl={`/product/${siteSettings.productId}/edit`}
                >
                  <Button
                    className="!py-1.5"
                    leading={<IconCode className="w-7 h-7 text-slate-800" />}
                    onClick={openCodeInjectionModal}
                  />
                </PlanCheck>
              </div>
            </Tooltip>

            {product.isJingleBio && (
              <Tooltip ariaLabel="Customize theme">
                <div className="relative">
                  <Button
                    className="!py-1.5"
                    leading={<IconPalette className="w-7 h-7 text-slate-800" />}
                    onClick={handleOpenThemeModal}
                  />

                  {!tourv2 && (
                    <div className="flex absolute h-2 w-2 top-0 right-0 -mt-0.5 -mr-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                    </div>
                  )}
                </div>
              </Tooltip>
            )}

            <Button className="!py-1.5 !text-sm" onClick={openShareModal}>
              Share
            </Button>

            <Button
              type="success"
              className="!py-1.5 !text-sm !bg-[#10b981]"
              loading={loading}
              disabled={!siteSettings.canPublish || state.isSyncing}
              onClick={request}
            >
              Publish
            </Button>
          </div>

          {!product.isJingleBio && (
            <>
              <div className="w-px h-[20px] bg-slate-200"></div>

              {isBuilderSidebarOpen ? (
                <Tooltip ariaLabel="Close sidebar">
                  <div>
                    <Button
                      className="!py-1.5"
                      leading={<IconSidebarOpen className="w-7 h-7 text-slate-800" />}
                      onClick={closeBuilderSidebar}
                    />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip ariaLabel="Open sidebar">
                  <div>
                    <Button
                      className="!py-1.5"
                      leading={<IconSidebar className="w-7 h-7 text-slate-800" />}
                      onClick={openBuilderSidebar}
                    />
                  </div>
                </Tooltip>
              )}
            </>
          )}
        </div>
      </div>

      <ShareModal visible={shareModalVisible} onClose={closeShareModal} />
      <AlertModal visible={alertModalVisible} />
    </>
  )
}
