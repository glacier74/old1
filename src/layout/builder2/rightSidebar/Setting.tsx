import { Input } from '@heyforms/ui'
import { IconChevronDown, IconChevronUp } from '@tabler/icons'
import clsx from 'clsx'
import { FC, useCallback, useMemo, useState } from 'react'

import { ColorPicker } from '~/components/ColorPicker'
import { useBlockData, useBuilderContext } from '~/layout/builder2/context'

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
        <IconChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <IconChevronDown className="w-5 h-5 text-gray-500" />
      ),
    [isOpen]
  )

  function handleClick() {
    onSelect(schema.name)
  }

  return (
    <div className={clsx('builder-setting', className)} {...restProps}>
      <div
        className="flex items-center justify-between px-4 py-3 text-gray-700 select-none cursor-pointer"
        onClick={handleClick}
      >
        <span className="text-sm font-semibold">{schema.title}</span>
        {icon}
      </div>

      {isOpen && (
        <div className="px-4 py-3 bg-gray-50">
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
  const blockData = useBlockData()
  const { dispatch } = useBuilderContext()

  const isOpen = useMemo(() => schema.name === selectedName, [schema.name, selectedName])
  const icon = useMemo(
    () =>
      isOpen ? (
        <IconChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <IconChevronDown className="w-5 h-5 text-gray-500" />
      ),
    [isOpen]
  )

  function handlePaddingTopChange(paddingTop: any) {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: blockData!.id,
        updates: {
          'style.paddingTop': paddingTop
        }
      }
    })
  }

  function handlePaddingBottomChange(paddingBottom: any) {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: blockData!.id,
        updates: {
          'style.paddingBottom': paddingBottom
        }
      }
    })
  }

  function handleBackgroundChange(background: string) {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: blockData!.id,
        updates: {
          'style.background': background
        }
      }
    })
  }

  function handleClick() {
    onSelect(schema.name)
  }

  return (
    <div className={clsx('builder-setting', className)} {...restProps}>
      <div
        className="flex items-center justify-between px-4 py-3 text-gray-700 select-none cursor-pointer"
        onClick={handleClick}
      >
        <span className="text-sm font-semibold">{schema.title}</span>
        {icon}
      </div>

      {isOpen && (
        <div className="px-4 py-3 bg-gray-50">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm">Background</div>
              <ColorPicker
                value={blockData?.style?.background as string}
                onChange={handleBackgroundChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Padding Top</div>
              <Input
                type="number"
                className="!px-2.5 !py-1.5 w-20"
                value={blockData?.style?.paddingTop || 0}
                onChange={handlePaddingTopChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Padding Bottom</div>
              <Input
                type="number"
                className="!px-2.5 !py-1.5 w-20"
                value={blockData?.style?.paddingBottom || 0}
                onChange={handlePaddingBottomChange}
              />
            </div>
          </div>
        </div>
      )}
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

      <StylesItem
        schema={{
          name: 'style',
          title: 'Style'
        }}
        selectedName={selectedName}
        onSelect={handleSelect}
      />
    </div>
  )
}
