import clsx from 'clsx'
import { FC } from 'react'

interface $StyleProps extends ComponentProps {
  as?: string
}

export const $Style: FC<$StyleProps> = ({
  as: Tag = 'div' as any,
  className,
  children,
  ...restProps
}) => {
  return (
    <Tag className={clsx('earlybird-style', className)} {...restProps}>
      {children}
    </Tag>
  )
}
