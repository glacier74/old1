import { Transition } from '@headlessui/react'
import { isValid } from '@nily/utils'
import { FC, useMemo } from 'react'

import { useBuilderContext } from '../context'
import { AddWidget } from './AddWidget'
import { SectionOptions } from './SectionOptions'
import { WidgetOptions } from './WidgetOptions'

export const RightSidebar2: FC = () => {
  const { state, dispatch } = useBuilderContext()

  const children = useMemo(() => {
    if (!state.selectedSection) {
      return null
    }

    switch (state.selectedSection.type) {
      case 'add-widget':
        return <AddWidget />

      case 'section':
        return <SectionOptions />

      case 'widget':
        return <WidgetOptions />
    }
  }, [state.selectedSection])

  function handleClose() {
    dispatch({
      type: 'updateState',
      payload: {
        selectedSection: undefined
      }
    })
  }

  return (
    <Transition
      className="fixed top-[57px] bottom-0 left-0 right-0 z-20"
      show={isValid(state.selectedSection)}
    >
      <Transition.Child
        className="absolute inset-0 z-20"
        enter="transition-opacity ease-linear duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        onClick={handleClose}
      />

      <Transition.Child
        className="absolute top-0 bottom-0 right-0 h-full bg-white border-l border-slate-200 w-[360px] shadow-2xl z-30"
        enter="transition ease-in-out duration-150 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-150 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        {children}
      </Transition.Child>
    </Transition>
  )
}
