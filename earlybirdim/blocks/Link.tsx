import { stopEvent } from '@heyforms/ui'
import clsx from 'clsx'
import { FC, MouseEvent } from 'react'

import { useBuilderContext } from '~/layout/builder2/context'

import { linkStyle } from './helper'

interface $LinkProps extends ComponentProps {
  type: string
  title?: string
  href: string
  appearance?: 'plain' | 'filled' | 'outline'
  isInNewTab?: boolean
  onClick?: (event: MouseEvent) => void
}

export const $Link: FC<$LinkProps> = ({
  type: _type,
  title,
  href,
  appearance = 'plain',
  isInNewTab,
  className,
  style,
  children,
  onClick
}) => {
  const { state } = useBuilderContext()

  function handleClick(event: MouseEvent) {
    if (state?.isBuilderMode) {
      return stopEvent(event)
    }

    onClick?.(event)
  }

  return (
    <a
      className={clsx('earlybird-link', className)}
      title={title}
      href={href}
      target={isInNewTab ? '_blank' : undefined}
      rel={isInNewTab ? 'noreferrer' : undefined}
      style={linkStyle(appearance, style)}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
