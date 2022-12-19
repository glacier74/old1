import { Button, Tooltip, notification } from '@heyforms/ui'
import { deepClone } from '@nily/utils'
import {
  IconChevronLeft,
  IconDatabase,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDroplet,
  IconLayoutGrid,
  IconPlug,
  IconSettings,
  IconShare
} from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo } from 'react'

import { useProductId } from '~/layout'
import { useBuilderContext } from '~/layout/builder/context'
import { SiteSettingsService } from '~/service'
import { useRequest, useUnsaveChanges } from '~/utils'

import { InsertBlock } from './InsertBlock'

export const Navbar: FC = () => {
  const { t } = useTranslation()
  const productId = useProductId()
  const { state, dispatch } = useBuilderContext()

  const { loading, error, request } = useRequest(async () => {
    await SiteSettingsService.update(productId, {
      blocks: state.blocks
    })

    dispatch({
      type: 'update',
      payload: {
        lastSyncedBlocks: deepClone(state.blocks),
        isBlocksChanged: false
      }
    })
  }, [productId, state.blocks])

  const options: any[] = useMemo(
    () => [
      {
        value: 'desktop',
        label: (
          <Tooltip ariaLabel="Desktop">
            <IconDeviceDesktop className="w-4 h-4" />
          </Tooltip>
        )
      },
      {
        value: 'mobile',
        label: (
          <Tooltip ariaLabel="Mobile">
            <IconDeviceMobile className="w-4 h-4" />
          </Tooltip>
        )
      }
    ],
    []
  )

  const toggleBlocksSidebar = useCallback(() => {
    dispatch({
      type: 'update',
      payload: {
        isBlocksSidebarOpen: !state.isBlocksSidebarOpen
      }
    })
  }, [state.isBlocksSidebarOpen])

  function handleModeChange(previewMode: any) {
    dispatch({
      type: 'update',
      payload: {
        previewMode
      }
    })
  }

  // If the changes have not been saved, the user will be prompted.
  useUnsaveChanges(state.isBlocksChanged, t('builder.leaveBrowserMessage'))

  useEffect(() => {
    if (error) {
      notification.error({
        title: t(error.message)
      })
    }
  }, [error])

  return (
    <div className="flex items-center justify-between h-[3.75rem] px-4 border-b border-gray-200">
      <div className="flex-1">
        <Link
          className="group flex items-center text-sm hover:text-green-500"
          href={`/product/${productId}`}
        >
          <IconChevronLeft className="w-5 h-5 text-slate-500 -ml-1 group-hover:text-green-500" />
          <span className="ml-1">{t('sidebar.dashboard')}</span>
        </Link>
      </div>

      <div className="flex-[2_1_0%] flex items-center justify-center">
        <InsertBlock />
        <div
          className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100 addBlock"
          onClick={toggleBlocksSidebar}
        >
          <IconLayoutGrid className="w-5 h-5" />
          <span className="text-[0.6875rem]">Blocks</span>
        </div>
        <div className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100">
          <IconDroplet className="w-5 h-5" />
          <span className="text-[0.6875rem]">Design</span>
        </div>
        <div className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100">
          <IconShare className="w-5 h-5" />
          <span className="text-[0.6875rem]">Share</span>
        </div>

        <div className="mx-1.5 w-px h-5 bg-gray-200" />

        <Link
          href={`/product/${productId}/engagements`}
          className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100"
        >
          <IconDatabase className="w-5 h-5" />
          <span className="text-[0.6875rem]">Engagement</span>
        </Link>
        <Link
          href={`/product/${productId}/integrations`}
          className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100"
        >
          <IconPlug className="w-5 h-5" />
          <span className="text-[0.6875rem]">Integration</span>
        </Link>
        <Link
          href={`/product/${productId}/settings`}
          className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100"
        >
          <IconSettings className="w-5 h-5" />
          <span className="text-[0.6875rem]">Settings</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-end">
        {/*<Switch.Group*/}
        {/*  className="builder-mode"*/}
        {/*  value={state.previewMode}*/}
        {/*  options={options}*/}
        {/*  onChange={handleModeChange}*/}
        {/*/>*/}

        {/*<div className="mx-4 w-px h-5 bg-gray-200" />*/}

        <Button
          type="success"
          className="builder-publish !py-1.5"
          disabled={!state.isBlocksChanged || loading}
          loading={loading}
          onClick={request}
        >
          Publish
        </Button>
      </div>
    </div>
  )
}
