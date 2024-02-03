import { Transition } from '@headlessui/react'
import { Button, Tooltip } from '@heyforms/ui'
import { IconX } from '@tabler/icons'
import clsx from 'clsx'
import { FC, useMemo, useState } from 'react'

import { useStore } from '~/store'

import { Customize } from './Customize'
import { Themes } from './Themes'

interface TabsProps {
  activeName: string
  options: Array<{
    name: string
    title: string
  }>
  onChange: (activeName: string) => void
}

const Tabs: FC<TabsProps> = ({ activeName, options, onChange }) => {
  return (
    <div className="flex items-center border-b border-slate-100">
      {options.map(row => (
        <div key={row.name} className="flex-1 flex justify-center">
          <button
            className={clsx(
              '-mb-px py-3 border-b-[2px] text-[13px] font-medium',
              activeName === row.name
                ? 'text-emerald-600 border-emerald-500'
                : 'text-slate-700 border-transparent'
            )}
            onClick={() => onChange(row.name)}
          >
            {row.title}
          </button>
        </div>
      ))}
    </div>
  )
}

const Container = () => {
  const { closeThemeModal } = useStore()
  const [activeName, setActiveName] = useState('themes')

  const children = useMemo(() => {
    switch (activeName) {
      case 'themes':
        return <Themes />

      case 'customize':
        return <Customize />

      default:
        return null
    }
  }, [activeName])

  return (
    <div className="absolute inset-0 bg-white">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between px-5 border-b border-gray-200">
          <div className="flex items-center gap-1">
            <div className="py-4 text-slate-900 font-semibold text-sm">Theme</div>
          </div>

          <Tooltip ariaLabel="Close">
            <div>
              <Button
                className="!border-none !p-1 -mr-1 text-slate-700"
                leading={<IconX />}
                onClick={closeThemeModal}
              />
            </div>
          </Tooltip>
        </div>

        <div className="flex-1 design-tabs">
          <Tabs
            activeName={activeName}
            options={[
              {
                name: 'themes',
                title: 'Themes'
              },
              {
                name: 'customize',
                title: 'Customize'
              }
            ]}
            onChange={setActiveName}
          />

          <div className="h-[calc(100vh-154px)] scrollbar">{children}</div>
        </div>
      </div>
    </div>
  )
}

export const Theme: FC = () => {
  const { isThemeModalOpen } = useStore()

  return (
    <Transition className="fixed top-[56px] bottom-0 left-0 right-0 z-20" show={isThemeModalOpen}>
      <Transition.Child
        className="absolute inset-0 z-[98]"
        enter="transition-opacity ease-linear duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      />

      <Transition.Child
        className="absolute top-0 bottom-0 right-0 h-full bg-white md:border-l md:border-slate-200 w-full md:w-[360px] shadow-2xl z-[99]"
        enter="transition ease-in-out duration-300 md:duration-150 transform"
        enterFrom="translate-y-full md:translate-y-0 md:translate-x-full"
        enterTo="translate-y-0 md:translate-x-0"
        leave="transition ease-in-out duration-300 md:duration-150 transform"
        leaveFrom="translate-y-0 md:translate-x-0"
        leaveTo="translate-y-full md:translate-y-0 md:translate-x-full"
      >
        <Container />
      </Transition.Child>
    </Transition>
  )
}
