import { Button, Tooltip, notification } from '@heyforms/ui'
import { deepClone } from '@nily/utils'
import { StepType, useTour } from '@reactour/tour'
import {
  IconBolt,
  IconChevronLeft,
  IconDatabase,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDroplet,
  IconLayoutGrid,
  IconSettings,
  IconShare
} from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo } from 'react'

import { useTourStorage } from '~/components'
import { useProductId } from '~/layout'
import { useBuilderContext } from '~/layout/builder/context'
import { SiteSettingsService } from '~/service'
import { useRequest, useUnsaveChanges } from '~/utils'

import { InsertBlock } from './InsertBlock'

export const Navbar: FC = () => {
  const { t } = useTranslation()
  const productId = useProductId()
  const { state, dispatch } = useBuilderContext()

  const { setIsOpen, setSteps, setCurrentStep } = useTour()
  const [value, setValue] = useTourStorage('blocks')

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

  const steps: StepType[] = [
    {
      selector: '.block-card-selected',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">Reorder block</div>
          <div>Click and hold the block, then drag to a new location to reorder these blocks.</div>
        </div>
      ),
      position: 'left'
    },
    {
      selector: '.block-card-menu-open',
      content: (
        <div className="text-sm space-y-2">
          <div className="text-base font-bold">Block menu</div>
          <div>
            Click the rectangle made of three dots to expand the dropdown menu, where you can
            duplicate or delete the block.
          </div>
        </div>
      ),
      position: 'left'
    }
  ]

  const toggleBlocksSidebar = useCallback(() => {
    // Open tour
    if (!value) {
      // Select first block
      if (!state.selectBlockId) {
        dispatch({
          type: 'selectBlock',
          payload: {
            blockId: state.blocks[0]?.id
          }
        })
      }

      setTimeout(() => {
        setSteps(steps)
        setCurrentStep(0)
        setIsOpen(true)
        setValue(true)
      }, 150)
    }

    dispatch({
      type: 'update',
      payload: {
        isBlocksSidebarOpen: !state.isBlocksSidebarOpen
      }
    })
  }, [value, state.blocks, state.selectBlockId, state.isBlocksSidebarOpen])

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
          className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100 blockSidebar"
          onClick={toggleBlocksSidebar}
        >
          <IconLayoutGrid className="w-5 h-5" />
          <span className="text-[0.6875rem]">Blocks</span>
        </div>
        <Tooltip ariaLabel="Coming soon">
          <div className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded opacity-50 cursor-pointer text-slate-700 hover:bg-slate-100">
            <IconDroplet className="w-5 h-5" />
            <span className="text-[0.6875rem]">Design</span>
          </div>
        </Tooltip>
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
          <span className="text-[0.6875rem]">Lead capture</span>
        </Link>
        <Link
          href={`/product/${productId}/integrations`}
          className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100"
        >
          <IconBolt className="w-5 h-5" />
          <span className="text-[0.6875rem]">Integrations</span>
        </Link>
        {/*<Link*/}
        {/*  href={`/product/${productId}/integrations`}*/}
        {/*  className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100"*/}
        {/*>*/}
        {/*  <IconPlug className="w-5 h-5" />*/}
        {/*  <span className="text-[0.6875rem]">Integration</span>*/}
        {/*</Link>*/}
        <Link
          href={`/product/${productId}/settings`}
          className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100 pageSettings"
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
