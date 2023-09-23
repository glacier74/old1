import clsx from 'clsx'
import { FC, useMemo, useRef, useState } from 'react'

import { PLAN_LEVELS } from '~/constants'
import { PlanBadge, PlanCheck } from '~/layout/product/PlanCheck'
import { useStore } from '~/store'

import { useBuilderContext } from '../context'
import templates from '../templates'
import { CodeInjection } from './CodeInjection'
import { OptionGroup } from './OptionGroup'
import { VisibilityOption } from './VisibilityOption'

export const RightSidebar: FC = () => {
  const { isBuilderSidebarOpen, siteSettings } = useStore()
  const { dispatch } = useBuilderContext()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [activeKey, setActiveKey] = useState<'options' | 'codeInjection'>('options')

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
        <div className="tabs-navbar flex items-center justify-between">
          <div className="tabs-nav-list">
            <button
              className={clsx('tabs-nav', activeKey === 'options' && 'tabs-nav-active')}
              onClick={() => setActiveKey('options')}
            >
              Options
            </button>
            <PlanCheck
              className="-my-4 py-4 cursor-pointer"
              minimalLevel={PLAN_LEVELS.plan_shipper}
              redirectUrl={`/product/${siteSettings.productId}/edit`}
            >
              <button
                className={clsx('tabs-nav', activeKey === 'codeInjection' && 'tabs-nav-active')}
                onClick={() => setActiveKey('codeInjection')}
              >
                <span>Code injection</span>
                <PlanBadge className="ml-2" minimalLevel={PLAN_LEVELS.plan_shipper} />
              </button>
            </PlanCheck>
          </div>

          <VisibilityOption schemas={schemas} />
        </div>

        <div className="py-6">
          {activeKey === 'options' ? (
            <div className="px-4 space-y-2">
              {visibleSchemas.map((schema: any) => (
                <OptionGroup key={schema.name} schema={schema} onSelect={handleSelect} />
              ))}
            </div>
          ) : (
            <CodeInjection />
          )}
        </div>
      </div>
    </div>
  )
}
