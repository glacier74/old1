import { Button, Switch } from '@heyforms/ui'
import { IconChevronLeft } from '@tabler/icons'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'

import { useProduct } from '~/layout'
import { useBuilderContext } from '~/layout/builder2/context'
import { AlertModal } from '~/layout/builder2/editor/AlertModal'
import { ShareModal } from '~/layout/builder/views/Navbar/ShareModal'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { useRequest, useVisible } from '~/utils'

export const Navbar: FC = () => {
  const { siteSettings, updateSiteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()
  const product = useProduct()

  const [shareModalVisible, openShareModal, closeShareModal] = useVisible()
  const [alertModalVisible, openAlertModal] = useVisible()

  const { loading, request } = useRequest(async () => {
    try {
      await SiteSettingsService.publish(product.id, {
        draft: state.blocks as any,
        version: siteSettings.version
      })

      updateSiteSettings({
        draft: state.blocks as any,
        canPublish: false
      })
    } catch (err: any) {
      if (err.error === 'invalid_draft_version') {
        openAlertModal()
      }
    }
  }, [siteSettings.version, state.blocks])

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
        updates: {
          previewMode
        }
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

  return (
    <>
      <div className="flex items-center justify-between h-[3.5rem] px-4 border-b border-gray-200">
        <div className="flex-1">
          <Link
            className="inline-flex items-center text-sm -ml-3 pl-1 pr-3 py-1.5 rounded hover:bg-slate-100"
            href={`/product/${product.id}`}
          >
            <IconChevronLeft className="w-5 h-5 text-slate-500" />
            <span className="ml-1">{product.name}</span>
          </Link>
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
            className="!py-1.5 !rounded"
            loading={loading}
            disabled={!siteSettings.canPublish}
            onClick={request}
          >
            Publish
          </Button>
        </div>
      </div>

      <ShareModal visible={shareModalVisible} onClose={closeShareModal} />
      <AlertModal visible={alertModalVisible} />
    </>
  )
}
