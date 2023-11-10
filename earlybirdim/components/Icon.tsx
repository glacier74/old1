import dynamic from 'next/dynamic'
import { FC } from 'react'

export interface IconProps extends ComponentProps {
  name: string
}

const InternalIcon = dynamic(() => import('@earlybirdim/icons').then(mod => mod.Icon))

export const Icon: FC<IconProps> = ({ name, ...restProps }) => (
  <InternalIcon name={name} {...restProps} />
)
