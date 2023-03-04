import { IconChevronDown, IconChevronUp } from '@tabler/icons'
import clsx from 'clsx'
import { FC, useCallback, useMemo, useState } from 'react'

import { SettingField } from './fields'

interface SettingProps extends ComponentProps {
  schemas: any[]
  selectedName?: string
}

interface SettingItemProps extends Omit<SettingProps, 'schemas'> {
  schema: any
  onSelect: (selectedName: string) => void
}

const SettingItem: FC<SettingItemProps> = ({
  className,
  schema,
  selectedName,
  onSelect,
  ...restProps
}) => {
  const isOpen = useMemo(() => schema.name === selectedName, [schema.name, selectedName])
  const icon = useMemo(
    () =>
      isOpen ? (
        <IconChevronUp className="w-5 h-5 text-slate-500" />
      ) : (
        <IconChevronDown className="w-5 h-5 text-slate-500" />
      ),
    [isOpen]
  )

  function handleClick() {
    onSelect(schema.name)
  }

  return (
    <div className={clsx('builder-setting', className)} {...restProps}>
      <div
        className="flex items-center justify-between px-4 py-3 text-slate-700 select-none cursor-pointer"
        onClick={handleClick}
      >
        <span className="text-sm font-semibold">{schema.title}</span>
        {icon}
      </div>

      {isOpen && (
        <div className="px-4 py-3 bg-slate-50">
          <SettingField schema={schema} />
        </div>
      )}
    </div>
  )
}

export const StylesItem: FC<SettingItemProps> = ({
  className,
  schema,
  selectedName,
  onSelect,
  ...restProps
}) => {
  const isOpen = useMemo(() => schema.name === selectedName, [schema.name, selectedName])
  const icon = useMemo(
    () =>
      isOpen ? (
        <IconChevronUp className="w-5 h-5 text-slate-500" />
      ) : (
        <IconChevronDown className="w-5 h-5 text-slate-500" />
      ),
    [isOpen]
  )

  function handleClick() {
    onSelect(schema.name)
  }

  return (
    <div className={clsx('builder-setting', className)} {...restProps}>
      <div
        className="flex items-center justify-between px-4 py-3 text-slate-700 select-none cursor-pointer"
        onClick={handleClick}
      >
        <span className="text-sm font-semibold">{schema.title}</span>
        {icon}
      </div>
    </div>
  )
}

export const Setting: FC<SettingProps> = ({ schemas }) => {
  const [selectedName, setSelectedName] = useState<string | undefined>(schemas[0].name)

  const handleSelect = useCallback(
    (name: string) => {
      setSelectedName(selectedName === name ? undefined : name)
    },
    [selectedName]
  )

  return (
    <div>
      {schemas.map(schema => (
        <SettingItem
          key={schema.name}
          schema={schema}
          selectedName={selectedName}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}
