import clsx from 'clsx'
import { IconPlay } from 'earlybirdim/internalIcons'
import { FC } from 'react'

import { WidgetPlayButtonProps } from '../WidgetProps'

export const WidgetPlayButton: FC<WidgetPlayButtonProps> = ({
  className,
  playText,
  pauseText,
  ...restProps
}) => {
  function handleClick() {
    //
  }

  return (
    <button
      className={clsx(
        'flex items-center gap-1.5 rounded-full bg-[var(--widget-follow-bg)] px-5 py-1.5 text-xs font-medium text-[var(--widget-follow-text)] text-white hover:bg-[var(--widget-follow-bg-hover)] active:bg-[var(--widget-follow-bg-active)]',
        className
      )}
      onClick={handleClick}
      {...restProps}
    >
      <IconPlay className="-ml-0.5 h-3 w-3" />
      {playText && <span>{playText}</span>}
    </button>
  )
}
