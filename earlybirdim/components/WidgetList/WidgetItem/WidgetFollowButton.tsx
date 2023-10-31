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
        'inline-flex items-center gap-1 rounded-full border border-[var(--widget-follow-border)] bg-[var(--widget-follow-bg)] px-4 py-1.5 text-center text-xs font-medium text-[var(--widget-follow-text)] hover:bg-[var(--widget-follow-bg-hover)] active:bg-[var(--widget-follow-bg-active)]',
        className
      )}
    >
      <span>{followText}</span>
      {followers > 0 && (
        <span className="text-[var(--widget-followers-text)]">{formatNumber(followers)}</span>
      )}
    </button>
  )
}
