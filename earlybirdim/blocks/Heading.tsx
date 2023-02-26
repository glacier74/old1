import clsx from 'clsx'
import { FC } from 'react'

import { $Html } from './Html'

interface $HeadingProps extends ComponentProps {
  as?: string
  html: string
}

export const $Heading: FC<$HeadingProps> = props => {
  return <$Html type="html" {...props} />
}

export const $H1: FC<$HeadingProps> = ({ className, ...restProps }) => {
  return <$Heading as="h1" className={clsx('earlybird-h1', className)} {...restProps} />
}

export const $H2: FC<$HeadingProps> = ({ className, ...restProps }) => {
  return <$Heading as="h2" className={clsx('earlybird-h2', className)} {...restProps} />
}

export const $H3: FC<$HeadingProps> = ({ className, ...restProps }) => {
  return <$Heading as="h3" className={clsx('earlybird-h3', className)} {...restProps} />
}

export const $H4: FC<$HeadingProps> = ({ className, ...restProps }) => {
  return <$Heading as="h4" className={clsx('earlybird-h4', className)} {...restProps} />
}

export const $H5: FC<$HeadingProps> = ({ className, ...restProps }) => {
  return <$Heading as="h5" className={clsx('earlybird-h5', className)} {...restProps} />
}

export const $H6: FC<$HeadingProps> = ({ className, ...restProps }) => {
  return <$Heading as="h6" className={clsx('earlybird-h6', className)} {...restProps} />
}
