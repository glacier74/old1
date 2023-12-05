import { Transition } from '@headlessui/react'
import { Button } from '@heyforms/ui'
import { IconX } from '@tabler/icons'
import clsx from 'clsx'
import { FC, useMemo } from 'react'

import { isMobile } from '~/layout/builder3/utils'
import { useStore } from '~/store'

import { useBuilderContext } from '../context'
import templates from '../templates'
import { OptionGroup } from './OptionGroup'
import { VisibilityOption } from './VisibilityOption'

export const RightSidebar: FC = () => {
  const { isBuilderSidebarOpen, closeBuilderSidebar, siteSettings } = useStore()
  const { dispatch } = useBuilderContext()

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

  const children = useMemo(
    () => (
      <div className="builder3-sidebar-tabs">
        <div className="flex items-center justify-between px-5 border-b border-gray-200">
          <div className="py-4 text-slate-900 font-medium text-sm">Options</div>

          <div className="flex items-center gap-2">
            <VisibilityOption schemas={schemas} />
            <Button
              className="!border-none !p-2 -mr-2"
              leading={<IconX className="text-slate-900" />}
              onClick={closeBuilderSidebar}
            />
          </div>
        </div>

        <div className="mt-5 px-4 space-y-2">
          {visibleSchemas.map((schema: any) => (
            <OptionGroup key={schema.name} schema={schema} onSelect={handleSelect} />
          ))}
        </div>
      </div>
    ),
    [schemas, visibleSchemas]
  )

  if (isMobile()) {
    return (
      <Transition
        className="fixed top-[57px] bottom-0 left-0 right-0 z-20"
        show={isBuilderSidebarOpen}
      >
        <Transition.Child
          className="absolute inset-0 z-20"
          enter="transition-opacity ease-linear duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        />

        <Transition.Child
          className="absolute top-0 bottom-0 right-0 h-full bg-white md:border-l md:border-slate-200 w-full md:w-[360px] shadow-2xl z-30"
          enter="transition ease-in-out duration-300 md:duration-150 transform"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-300 md:duration-150 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          {children}
        </Transition.Child>
      </Transition>
    )
  }

  return (
    <div
      className={clsx(
        'relative flex flex-col h-full bg-white border-l border-slate-200 duration-300 scrollbar transition-all',
        isBuilderSidebarOpen
          ? 'w-[320px] min-[1400px]:w-[360px] 2xl:w-[480px] opacity-100'
          : 'w-[0px] opacity-0'
      )}
    >
      {children}
    </div>
  )
}
