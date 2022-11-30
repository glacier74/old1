import { Avatar } from '@heyforms/ui'
import { AvatarProps } from '@heyforms/ui/types/avatar/Avatar'
import { FC } from 'react'

import { cropImage } from '~/utils'

interface RoundImageProps extends AvatarProps {
  imageSize: number
}

export const RoundImage: FC<RoundImageProps> = ({
  src,
  imageSize = 0,
  size = 0,
  text,
  retainLength = 4,
  circular = true,
  rounded = true,
  ...restProps
}) => {
  return (
    <Avatar
      src={cropImage(src, imageSize, imageSize)}
      size={size}
      text={text}
      retainLength={retainLength}
      circular={circular}
      rounded={rounded}
      {...restProps}
    />
  )
}
