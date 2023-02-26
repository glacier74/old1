import clsx from 'clsx'
import { FC } from 'react'

interface $TextProps extends ComponentProps {
  type: string
  as?: string
  html: string
}

export const $Text: FC<$TextProps> = ({
  type: _type,
  as: Tag = 'span' as any,
  className,
  html,
  ...restProps
}) => {
  return (
    <Tag className={clsx('earlybird-text', className)} {...restProps}>
      {html}
    </Tag>
  )
}
