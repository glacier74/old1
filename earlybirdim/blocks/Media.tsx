import { FC } from 'react'

import { $Image } from './Image'
import { $Video } from './Video'

interface $MediaProps extends ComponentProps {
  type: 'image' | 'video'
  src: string
  alt?: string
  width?: number
  height?: number
  quality?: number
}

export const $Media: FC<$MediaProps> = ({ type, width, height, ...restProps }) => {
  return type === 'image' ? (
    <$Image className="earlybird-media" width={width!} height={height!} {...restProps} />
  ) : (
    <$Video className="earlybird-media" {...restProps} />
  )
}
