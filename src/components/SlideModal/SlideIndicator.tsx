import { stopPropagation } from '@heyforms/ui'
import clsx from 'clsx'
import { FC, MouseEvent, useMemo } from 'react'

interface SlideIndicatorProps {
  active: number
  length: number
  onChange: (index: number) => void
}

interface SlideIndicatorItemProps {
  index: number
  active: number
  onClick: (index: number) => void
}

const SlideIndicatorItem: FC<SlideIndicatorItemProps> = ({ index, active, onClick }) => {
  function handleClick(event: MouseEvent) {
    stopPropagation(event)
    onClick(index)
  }

  return (
    <button
      className={clsx('slide-indicator', {
        'slide-indicator-active': active === index
      })}
      aria-pressed="false"
      aria-label={`Go to Slide ${index + 1}`}
      onClick={handleClick}
    />
  )
}

export const SlideIndicator: FC<SlideIndicatorProps> = ({ active, length, onChange }) => {
  const list = useMemo(() => Array.from({ length }), [length])

  return (
    <div className="slide-indicators">
      {list.map((_, index) => (
        <SlideIndicatorItem key={index} index={index} active={active} onClick={onChange} />
      ))}
    </div>
  )
}
