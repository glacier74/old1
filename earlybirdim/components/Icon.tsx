import { Icon as InternalIcon } from '@earlybirdim/icons'
import { FC } from 'react'

export interface IconProps extends ComponentProps {
  name: string
}

export const Icon: FC<IconProps> = ({ name, ...restProps }) => (
  <InternalIcon name={name} {...restProps} />
)
