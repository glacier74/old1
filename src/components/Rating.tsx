import clsx from 'clsx'
import { FC, ReactNode, useMemo, useState } from 'react'

import { IconStarFilled } from '~/components/Icon'

interface RatingProps extends ComponentProps {
  itemClassName?: string
  itemHighlightClassName?: string
  count?: number
  itemIcon?: ReactNode
  readonly?: boolean
  value?: number
  onChange?: (value: number) => void
}

interface RatingItemPropsProps extends ComponentProps {
  highlightClassName?: string
  index: number
  hoverIndex?: number
  icon?: ReactNode
  readonly?: boolean
  value: number
  onClick: (value: number) => void
  onHover: (value: number) => void
}

const RatingItem: FC<RatingItemPropsProps> = ({
  className,
  highlightClassName,
  value = 0,
  index = 0,
  hoverIndex = 0,
  icon,
  readonly,
  onClick,
  onHover,
  ...restProps
}) => {
  const isChecked = useMemo(
    () => (hoverIndex > 0 ? hoverIndex >= index : value >= index),
    [hoverIndex, index, value]
  )

  function handleClick() {
    if (!readonly) {
      onClick(index)
    }
  }

  function handleOver() {
    if (!readonly) {
      onHover(index)
    }
  }

  return (
    <div
      className={clsx(
        'w-6 h-6 text-slate-300 will-change-auto transition-colors duration-100 cursor-pointer',
        isChecked && (highlightClassName || 'text-yellow-400'),
        className
      )}
      role="radio"
      aria-checked={isChecked}
      aria-label={`Rate ${index}`}
      tabIndex={-1}
      onClick={handleClick}
      onMouseOver={handleOver}
      {...restProps}
    >
      {icon || <IconStarFilled className="w-full h-full" />}
    </div>
  )
}

export const Rating: FC<RatingProps> = ({
  className,
  itemClassName,
  itemHighlightClassName,
  count = 5,
  itemIcon,
  readonly,
  value = 0,
  onChange,
  ...restProps
}) => {
  const [hoverIndex, setHoverIndex] = useState(0)

  function handleClick(index: number) {
    onChange?.(index)
  }

  function handleLeave() {
    if (!readonly) {
      setHoverIndex(0)
    }
  }

  return (
    <div
      className={clsx('flex items-center gap-2', className)}
      role="radiogroup"
      aria-label="Rating"
      onMouseLeave={handleLeave}
      {...restProps}
    >
      {Array.from({ length: count }).map((_, index) => (
        <RatingItem
          key={index}
          className={itemClassName}
          highlightClassName={itemHighlightClassName}
          index={index + 1}
          hoverIndex={hoverIndex}
          icon={itemIcon}
          readonly={readonly}
          value={value}
          onClick={handleClick}
          onHover={setHoverIndex}
        />
      ))}
    </div>
  )
}
