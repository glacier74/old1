import { useGlobalContext } from '@earlybirdim/components'
import { stopEvent } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { IconArrowUpRight } from '@tabler/icons'
import clsx from 'clsx'
import { IconPause, IconPlay } from 'earlybirdim/internalIcons'
import { FC, MouseEvent, useMemo } from 'react'

import { WidgetPlayButtonProps } from '../WidgetProps'

export const WidgetPlayButton2: FC<Pick<WidgetPlayButtonProps, 'className' | 'playText'>> = ({
  className,
  playText
}) => {
  return (
    <button
      className={clsx(
        'flex items-center gap-1.5 rounded-full bg-[var(--jingle-widget-follow-background)] overflow-hidden px-3 py-0.5 text-xs font-medium text-[var(--jingle-widget-follow-text)] hover:bg-[var(--jingle-widget-follow-background-hover)] active:bg-[var(--jingle-widget-follow-background-active)]',
        className
      )}
    >
      <IconArrowUpRight className="-ml-0.5 h-6 w-6" />
      {playText && <span>{playText}</span>}
    </button>
  )
}

export const WidgetPlayButton: FC<WidgetPlayButtonProps> = ({
  className,
  widgetId,
  songId: rawSongId,
  songURL,
  playText,
  pauseText,
  ...restProps
}) => {
  const { isPreview, songs, toggle } = useGlobalContext()

  const songId = widgetId + rawSongId
  const isPlayable = isValid(songURL)

  const song = useMemo(() => songs[songId], [songs, songId])

  const status = useMemo(() => {
    if (!isPreview && isPlayable) {
      return song?.status
    }
  }, [song?.status])

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (isPlayable && !isPreview) {
      stopEvent(event)
      toggle(widgetId, songId, songURL!)
    }
  }

  return (
    <button
      className={clsx(
        'flex items-center gap-1.5 rounded-full bg-[var(--jingle-widget-follow-background)] overflow-hidden px-5 py-1.5 text-xs font-medium text-[var(--jingle-widget-follow-text)] hover:bg-[var(--jingle-widget-follow-background-hover)] active:bg-[var(--jingle-widget-follow-background-active)]',
        className
      )}
      onClick={handleClick}
      {...restProps}
    >
      {status === 'playing' ? (
        <IconPause className="-ml-0.5 h-3 w-3" />
      ) : (
        <IconPlay className="-ml-0.5 h-3 w-3" />
      )}
      <span>{status === 'playing' ? pauseText : playText}</span>
    </button>
  )
}
