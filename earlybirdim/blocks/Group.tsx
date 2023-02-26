import clsx from 'clsx'
import { FC } from 'react'

interface $GroupProps extends ComponentProps {
  as?: string
}

export const $Group: FC<$GroupProps> = ({
  as: Tag = 'div' as any,
  className,
  children,
  ...restProps
}) => {
  return (
    <Tag className={clsx('earlybird-group', className)} {...restProps}>
      {children}
    </Tag>
  )
}
