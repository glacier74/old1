import { Tooltip } from '@heyforms/ui'
import { IconCodeCircle, IconLayoutGrid } from '@tabler/icons'
import { FC } from 'react'

import { useBuilderContext } from '~/layout/builder2/context'
import { Blocks } from '~/layout/builder2/leftSidebar/Blocks'

export const LeftSidebar: FC = () => {
  const { state, dispatch } = useBuilderContext()

  function handleToggleBlocks() {
    dispatch({
      type: 'updateState',
      payload: {
        updates: {
          isBlocksOpen: !state.isBlocksOpen
        }
      }
    })
  }

  return (
    <>
      <div className="flex flex-col w-9 h-full bg-white border-r border-gray-200 duration-150 select-none">
        <div
          className="flex items-center justify-center w-9 h-9 text-gray-600 hover:bg-gray-100 cursor-pointer"
          onClick={handleToggleBlocks}
        >
          <Tooltip ariaLabel="Blocks" placement="right">
            <IconLayoutGrid />
          </Tooltip>
        </div>
        <div className="flex items-center justify-center w-9 h-9 text-gray-600 hover:bg-gray-100 cursor-pointer">
          <Tooltip ariaLabel="Code Injection" placement="right">
            <IconCodeCircle />
          </Tooltip>
        </div>
      </div>

      {state.isBlocksOpen && <Blocks />}
    </>
  )
}
