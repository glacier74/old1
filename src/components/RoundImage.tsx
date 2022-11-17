import { Avatar } from '@heyforms/ui'
import { AvatarProps } from '@heyforms/ui/types/avatar/Avatar'
import { FC } from 'react'

import { cropImage } from '~/utils'

export const RoundImage: FC<AvatarProps> = ({
  src,
  size = 0,
  text,
  retainLength = 4,
  circular = true,
  rounded = true,
  ...restProps
}) => {
  return (
    <Avatar
      src={cropImage(src, size, size)}
      size={size}
      text={text}
      retainLength={retainLength}
      circular={circular}
      rounded={rounded}
      {...restProps}
    />
  )
}
