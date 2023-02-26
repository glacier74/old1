import { FC, useMemo } from 'react'

import components from '../components'
import { useBlockData } from '../context'
import { Setting } from './Setting'

export const RightSidebar: FC = () => {
  const blockData = useBlockData()

  const component = useMemo(
    () => (blockData?.componentId ? components[blockData.componentId] : undefined),
    [blockData?.componentId]
  )

  if (!component) {
    return null
  }

  return (
    <div className="flex flex-col w-[18.75rem] h-full bg-white border-l border-gray-200 duration-150 scrollbar">
      <Setting key={blockData!.id} schemas={component.settingSchemas} />
    </div>
  )
}
