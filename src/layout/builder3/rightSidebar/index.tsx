import { FC, useCallback, useMemo, useRef } from 'react'

import { useStore } from '~/store'

import { useBuilderContext } from '../context'
import templates from '../templates'
import { OptionGroup } from './OptionGroup'

export const RightSidebar: FC = () => {
  const { siteSettings } = useStore()
  const { state, dispatch } = useBuilderContext()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const schemas = useMemo(
    () => templates[siteSettings.template]?.schemas || [],
    [siteSettings.template]
  )

  const handleSelect = useCallback(
    (value: string) => {
      dispatch({
        type: 'updateState',
        payload: {
          selectedOptionName: state.selectedOptionName !== value ? value : undefined
        }
      })
    },
    [state.selectedOptionName]
  )

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-[320px] min-[1400px]:w-[360px] 2xl:w-[480px] h-full bg-white border-l border-slate-200 duration-150 scrollbar"
    >
      <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-[18px]">
        <span>Options</span>
      </div>

      <div className="px-4 pb-6 space-y-2">
        {schemas.map((schema: any) => (
          <OptionGroup key={schema.name} schema={schema} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  )
}
