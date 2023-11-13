import clsx from 'clsx'
import { FC, useMemo, useRef } from 'react'

import { useStore } from '~/store'

import { useBuilderContext } from '../context'
import templates from '../templates'
import { OptionGroup } from './OptionGroup'
import { VisibilityOption } from './VisibilityOption'

export const RightSidebar: FC = () => {
  const { isBuilderSidebarOpen, siteSettings } = useStore()
  const { dispatch } = useBuilderContext()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const schemas = useMemo(
    () => templates[siteSettings.template]?.schemas || [],
    [siteSettings.template]
  )

  const visibleSchemas = useMemo(
    () => schemas.filter((schema: any) => !siteSettings.hiddenBlocks?.includes(schema.name)),
    [schemas, siteSettings.hiddenBlocks]
  )

  function handleSelect(value?: string) {
    dispatch({
      type: 'updateState',
      payload: {
        selectedOptionName: value
      }
    })
  }

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative flex flex-col h-full bg-white border-l border-slate-200 duration-300 scrollbar transition-all',
        isBuilderSidebarOpen
          ? 'w-[320px] min-[1400px]:w-[360px] 2xl:w-[480px] opacity-100'
          : 'w-[0px] opacity-0'
      )}
    >
      <div className="builder3-sidebar-tabs">
        <div className="flex items-center justify-between px-5 border-b border-gray-200">
          <div className="py-4 text-slate-900 font-medium text-sm">Options</div>
          <VisibilityOption schemas={schemas} />
        </div>

        <div className="mt-5 px-4 space-y-2">
          {visibleSchemas.map((schema: any) => (
            <OptionGroup key={schema.name} schema={schema} onSelect={handleSelect} />
          ))}
        </div>
      </div>
    </div>
  )
}
