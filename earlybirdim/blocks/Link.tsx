import clsx from 'clsx'
import { FC } from 'react'

import { linkStyle } from './helper'

interface $LinkProps extends ComponentProps {
  type: string
  title?: string
  href: string
  appearance?: 'plain' | 'filled' | 'outline'
  isInNewTab?: boolean
}

export const $Link: FC<$LinkProps> = ({
  type: _type,
  title,
  href,
  appearance = 'plain',
  isInNewTab,
  className,
  children,
  style
}) => {
  return (
    <a
      className={clsx('earlybird-link', className)}
      title={title}
      href={href}
      target={isInNewTab ? '_blank' : undefined}
      rel={isInNewTab ? 'noreferrer' : undefined}
      style={linkStyle(appearance, style)}
    >
      {children}
    </a>
  )
}
