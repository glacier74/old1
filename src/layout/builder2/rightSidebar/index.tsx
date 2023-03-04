import { Button } from '@heyforms/ui'
import { IconX } from '@tabler/icons'
import { FC, useMemo } from 'react'

import components from '../components'
import { useBlockData, useBuilderContext } from '../context'
import { Setting } from './Setting'

export const RightSidebar: FC = () => {
  const blockData = useBlockData()
  const { dispatch } = useBuilderContext()

  const component = useMemo(
    () => (blockData?.componentId ? components[blockData.componentId] : undefined),
    [blockData?.componentId]
  )

  if (!component) {
    return null
  }

  function handleClose() {
    dispatch({
      type: 'selectBlock',
      payload: {
        blockId: undefined
      }
    })
  }

  return (
    <div className="flex flex-col w-[19rem] 2xl:w-[22rem] h-full bg-white border-l border-slate-200 duration-150 scrollbar">
      <div className="flex items-center justify-between px-4 py-2">
        <span>Block Settings</span>
        <Button.Link className="-mr-3.5" leading={<IconX />} onClick={handleClose} />
      </div>
      <Setting key={blockData!.id} schemas={component.settingSchemas} />
    </div>
  )
}
