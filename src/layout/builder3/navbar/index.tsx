import { Button, Spin, Switch, notification } from '@heyforms/ui'
import { IconChecks, IconChevronLeft } from '@tabler/icons'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'

import { useProduct } from '~/layout'
import { ShareModal } from '~/layout/builder/views/Navbar/ShareModal'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { useRequest, useVisible } from '~/utils'

import { useBuilderContext } from '../context'
import { UpgradeModal } from '../navbar/UpgradeModal'
import { AlertModal } from '../preview/AlertModal'

export const Navbar: FC = () => {
  const { siteSettings, updateSiteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()
  const product = useProduct()

  const [shareModalVisible, openShareModal, closeShareModal] = useVisible()
  const [alertModalVisible, openAlertModal] = useVisible()
  const [upgradeModalVisible, openUpgradeModal, closeUpgradeModal] = useVisible()

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

      notification.success({
        title: 'Your landing page has been successfully published.'
      })
    } catch (err: any) {
      if (err.error === 'invalid_draft_version') {
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

  const handleShare = useCallback(() => {
    if (window.navigator.canShare?.()) {
      window.navigator.share({
        title: product.name,
        text: product.tagline,
        url: `https://${product.domain}.${process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN}`
      })
    } else {
      openShareModal()
    }
  }, [product.domain, product.name, product.tagline])

  const handleButtonClick = useCallback(() => {
    if (!product.subscription?.isActive) {
      return openUpgradeModal()
    }

    request()
  }, [product.subscription?.isActive, request])

  const handlePublishCallback = useCallback(() => {
    closeUpgradeModal()
    request()
  }, [request])

  return (
    <>
      <div className="flex items-center justify-between h-[3.5rem] px-4 border-b border-slate-200">
        <div className="flex-1 flex items-center">
          <Link
            className="inline-flex items-center text-sm -ml-3 pl-1 pr-3 py-1.5 rounded hover:bg-slate-100"
            href={`/product/${product.id}`}
          >
            <IconChevronLeft className="w-5 h-5 text-slate-500" />
            <span className="ml-1">{product.name}</span>
          </Link>

          <div className="flex items-center text-xs ml-4 text-slate-500">
            {state.isSyncing ? (
              <>
                <Spin className="mr-1 w-4 h-4 text-slate-400" />
                <span>Saving changes...</span>
              </>
            ) : state.lastSyncedAt > 0 ? (
              <>
                <IconChecks className="mr-1 w-4 h-4 text-slate-400" />
                <span>Saved at {dayjs(state.lastSyncedAt).format('h:mm A')}</span>
              </>
            ) : (
              <span>Changes will be saved automatically</span>
            )}
          </div>
        </div>

        <div className="flex-[2_1_0%] flex items-center justify-center">
          <Switch.Group
            className="builder-mode"
            value={state.previewMode}
            options={previewModeOptions}
            onChange={handleModeChange}
          />
        </div>

        <div className="flex-1 flex items-center justify-end space-x-2">
          <Button className="!py-1.5 !rounded" onClick={handleShare}>
            Share
          </Button>

          <Button
            type="success"
            className="!py-1.5 !rounded !bg-[#10b981]"
            loading={loading}
            disabled={!siteSettings.canPublish || state.isSyncing}
            onClick={handleButtonClick}
          >
            Publish
          </Button>
        </div>
      </div>

      <ShareModal visible={shareModalVisible} onClose={closeShareModal} />
      <AlertModal visible={alertModalVisible} />
      <UpgradeModal
        visible={upgradeModalVisible}
        onPublish={handlePublishCallback}
        onClose={closeUpgradeModal}
      />
    </>
  )
}
