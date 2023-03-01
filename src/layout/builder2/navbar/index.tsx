import { Button, Switch } from '@heyforms/ui'
import { IconChevronLeft } from '@tabler/icons'
import Link from 'next/link'
import { FC, useMemo } from 'react'

import { useProductId } from '~/layout'
import { useBuilderContext } from '~/layout/builder2/context'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { useRequest } from '~/utils'

export const Navbar: FC = () => {
  const { siteSettings, updateSiteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()
  const productId = useProductId()

  const { loading, request } = useRequest(async () => {
    await SiteSettingsService.publish(productId, {
      draft: state.blocks as any,
      version: siteSettings.version
    })

    updateSiteSettings({
      draft: state.blocks as any,
      canPublish: false
    })
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

  return (
    <div className="flex items-center justify-between h-[3.5rem] px-4 border-b border-gray-200">
      <div className="flex-1">
        <Link
          className="inline-flex items-center text-sm -ml-0.5 pl-0.5 pr-3 py-1 rounded hover:bg-gray-100"
          href="/"
        >
          <IconChevronLeft className="w-6 h-6 text-gray-600" />
          <span className="ml-1">EarlyBird</span>
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

      <div className="flex-1 flex items-center justify-end">
        <Button
          type="success"
          className="!py-1.5"
          loading={loading}
          disabled={!siteSettings.canPublish}
          onClick={request}
        >
          Publish
        </Button>
      </div>
    </div>
  )
}
