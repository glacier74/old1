import clsx from 'clsx'
import { FC } from 'react'

interface $ListProps extends ComponentProps {
  as?: string
}

export const $List: FC<$ListProps> = ({
  as: Tag = 'ul' as any,
  className,
  children,
  ...restProps
}) => {
  return (
    <Tag className={clsx('earlybird-list', className)} {...restProps}>
      {children}
    </Tag>
  )
}
