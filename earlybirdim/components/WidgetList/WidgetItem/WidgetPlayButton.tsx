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
        'flex items-center gap-1.5 rounded-full bg-[var(--jingle-widget-follow-background)] px-5 py-1.5 text-xs font-medium text-[var(--jingle-widget-follow-text)] hover:bg-[var(--jingle-widget-follow-background-hover)] active:bg-[var(--jingle-widget-follow-background-active)]',
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
