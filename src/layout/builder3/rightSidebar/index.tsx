import { Tabs } from '@heyforms/ui'
import { ITab } from '@heyforms/ui/types/tabs/context'
import clsx from 'clsx'
import { FC, useMemo, useRef } from 'react'

import { PLAN_LEVELS } from '~/constants'
import { PlanBadge, PlanCheck } from '~/layout/product/PlanCheck'
import { useStore } from '~/store'

import { useBuilderContext } from '../context'
import templates from '../templates'
import { CodeInjection } from './CodeInjection'
import { OptionGroup } from './OptionGroup'

export const RightSidebar: FC = () => {
  const { isBuilderSidebarOpen, siteSettings } = useStore()
  const { dispatch } = useBuilderContext()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const schemas = useMemo(
    () => templates[siteSettings.template]?.schemas || [],
    [siteSettings.template]
  )

  function navRender(tab: ITab) {
    switch (tab.name) {
      case 'codeInjection':
        return (
          <PlanCheck className="-my-4 py-4 cursor-pointer" minimalLevel={PLAN_LEVELS.plan_shipper}>
            <div>
              <span>{tab.title}</span>
              <PlanBadge className="ml-2" minimalLevel={PLAN_LEVELS.plan_shipper} />
            </div>
          </PlanCheck>
        )

      default:
        return tab.title
    }
  }

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
        'flex flex-col h-full bg-white border-l border-slate-200 duration-300 scrollbar transition-all',
        isBuilderSidebarOpen
          ? 'w-[0px] opacity-0'
          : 'w-[320px] min-[1400px]:w-[360px] 2xl:w-[480px] opacity-100'
      )}
    >
      <Tabs className="builder3-sidebar-tabs" navRender={navRender}>
        <Tabs.Pane name="option" title="Options">
          <div className="px-4 space-y-2">
            {schemas.map((schema: any) => (
              <OptionGroup key={schema.name} schema={schema} onSelect={handleSelect} />
            ))}
          </div>
        </Tabs.Pane>

        <Tabs.Pane name="codeInjection" title="Code injection">
          <CodeInjection />
        </Tabs.Pane>
      </Tabs>
    </div>
  )
}
