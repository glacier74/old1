import clsx from 'clsx'
import { FC } from 'react'

import { WidgetFollowButtonProps } from '../WidgetProps'
import { formatNumber } from '../utils'

export const WidgetFollowButton: FC<WidgetFollowButtonProps> = ({
  className,
  followers = 0,
  followText = 'Follow'
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center gap-1 rounded-full bg-[var(--jingle-widget-follow-background)] px-4 py-1.5 text-center text-xs font-medium text-[var(--jingle-widget-follow-text)] hover:bg-[var(--jingle-widget-follow-background-hover)] active:bg-[var(--jingle-widget-follow-background-active)]',
        className
      )}
    >
      <span>{followText}</span>
      {followers > 0 && (
        <span className="text-[var(--jingle-widget-follow-text)]">{formatNumber(followers)}</span>
      )}
    </button>
  )
}
