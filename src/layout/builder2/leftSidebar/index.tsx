import { Tooltip } from '@heyforms/ui'
import { IconBolt, IconCode, IconDatabase, IconLayoutGrid, IconSettings } from '@tabler/icons'
import Link from 'next/link'
import { FC, useCallback } from 'react'

import { useProductId } from '~/layout'
import { useBuilderContext } from '~/layout/builder2/context'

import { AddBlockModal } from './AddBlockModal'
import { Blocks } from './Blocks'
import { CodeInjection } from './CodeInjection'

export const LeftSidebar: FC = () => {
  const { state, dispatch } = useBuilderContext()
  const productId = useProductId()

  const handleClick = useCallback(
    (activeTabName: string) => {
      dispatch({
        type: 'updateState',
        payload: {
          updates: {
            activeTabName: state.activeTabName !== activeTabName ? activeTabName : undefined
          }
        }
      })
    },
    [state.activeTabName]
  )

  return (
    <>
      <div className="flex flex-col w-10 h-full bg-white border-r border-slate-200 duration-150 select-none">
        <Tooltip ariaLabel="Blocks" placement="right">
          <div
            className="flex items-center justify-center w-10 h-10 text--600 hover:bg-slate-100 cursor-pointer"
            onClick={() => handleClick('blocks')}
          >
            <IconLayoutGrid className="w-5 h-5 text-slate-800" />
          </div>
        </Tooltip>

        <Tooltip ariaLabel="Code injection" placement="right">
          <div
            className="flex items-center justify-center w-10 h-10 text-slate-600 hover:bg-slate-100 cursor-pointer"
            onClick={() => handleClick('codeInjection')}
          >
            <IconCode className="w-5 h-5 text-slate-800" />
          </div>
        </Tooltip>

        <Tooltip ariaLabel="Lead capture" placement="right">
          <div className="flex items-center justify-center w-10 h-10 text-slate-600 hover:bg-slate-100 cursor-pointer">
            <Link
              href={`/product/${productId}/engagements`}
              className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100 pageSettings"
            >
              <IconDatabase className="w-5 h-5 text-slate-800" />
            </Link>
          </div>
        </Tooltip>

        <Tooltip ariaLabel="Integrations" placement="right">
          <div className="flex items-center justify-center w-10 h-10 text-slate-600 hover:bg-slate-100 cursor-pointer">
            <Link
              href={`/product/${productId}/integrations`}
              className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100 pageSettings"
            >
              <IconBolt className="w-5 h-5 text-slate-800" />
            </Link>
          </div>
        </Tooltip>

        <Tooltip ariaLabel="Settings" placement="right">
          <div className="flex items-center justify-center w-10 h-10 text-slate-600 hover:bg-slate-100 cursor-pointer">
            <Link
              href={`/product/${productId}/settings`}
              className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100 pageSettings"
            >
              <IconSettings className="w-5 h-5 text-slate-800" />
            </Link>
          </div>
        </Tooltip>
      </div>

      <Blocks />
      <CodeInjection />
      <AddBlockModal />
    </>
  )
}
