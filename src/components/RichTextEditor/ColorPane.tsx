import { Button, stopPropagation } from '@heyforms/ui'
import { isUndefined } from '@nily/utils'
import clsx from 'clsx'
import { FC } from 'react'

interface ColorPaneProps {
  color?: string
  backgroundColor?: string
  onColorChange: (color?: string) => void
  onBackgroundColorChange: (color?: string) => void
}

interface TextColorItemProps {
  isActive?: boolean
  value?: string
  onClick: (value?: string) => void
}

const TextColorItem: FC<TextColorItemProps> = ({ isActive, value, onClick }) => {
  function handleClick(event: any) {
    onClick(value)
  }

  return (
    <button
      className={clsx('editor__text-color-item', {
        'is-active': isActive
      })}
      style={{ color: value }}
      onClick={handleClick}
    >
      <span
        style={{
          borderColor: value
        }}
      >
        A
      </span>
    </button>
  )
}

const BackgroundColorItem: FC<TextColorItemProps> = ({ isActive, value, onClick }) => {
  function handleClick(event: any) {
    onClick(value)
  }

  return (
    <button
      className={clsx('editor__background-color-item', {
        'editor__background-color-transparent': isUndefined(value),
        'is-active': isActive
      })}
      onClick={handleClick}
    >
      <span style={{ backgroundColor: value }}></span>
    </button>
  )
}

const TEXT_COLORS = ['#000', '#9ca3af', '#ef4444', '#eab308', '#22c55e', '#3b82f6', '#a855f7']
const BACKGROUND_COLORS = [
  undefined,
  '#f9fafb',
  '#fef2f2',
  '#fefce8',
  '#f0fdf4',
  '#eff6ff',
  '#faf5ff',

  '#d1d5db',
  '#9ca3af',
  '#ef4444',
  '#eab308',
  '#22c55e',
  '#3b82f6',
  '#a855f7'
]

export const ColorPane: FC<ColorPaneProps> = ({
  color,
  backgroundColor,
  onColorChange,
  onBackgroundColorChange,
  ...restProps
}) => {
  function handleReset() {
    onColorChange(undefined)
    onBackgroundColorChange(undefined)
  }

  return (
    <div className="editor__color-menu" onClick={stopPropagation} {...restProps}>
      <div className="space-y-1">
        <div className="text-sm">Text color</div>
        <div className="flex items-center space-x-1">
          {TEXT_COLORS.map(value => (
            <TextColorItem value={value} isActive={value === color} onClick={onColorChange} />
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-sm">Background color</div>
        <div className="flex items-center space-x-1">
          {BACKGROUND_COLORS.slice(0, 7).map(value => (
            <BackgroundColorItem
              value={value}
              isActive={value === backgroundColor}
              onClick={onBackgroundColorChange}
            />
          ))}
        </div>
        <div className="flex items-center space-x-1">
          {BACKGROUND_COLORS.slice(7).map(value => (
            <BackgroundColorItem
              value={value}
              isActive={value === backgroundColor}
              onClick={onBackgroundColorChange}
            />
          ))}
        </div>
      </div>

      <Button className="w-full !py-1" onClick={handleReset}>
        Reset
      </Button>
    </div>
  )
}
