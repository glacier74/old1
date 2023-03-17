import { Avatar } from '@heyforms/ui'
import { AvatarProps } from '@heyforms/ui/types/avatar/Avatar'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

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
  className,
  ...restProps
}) => {
  if (src) {
    return (
      <Image
        className={clsx(
          'avatar',
          {
            'avatar-circular': circular,
            'avatar-rounded': rounded
          },
          className
        )}
        src={src}
        quality={95}
        alt=""
        width={imageSize}
        height={imageSize}
      />
    )
  }

  return (
    <Avatar
      className={className}
      size={size}
      text={text}
      retainLength={retainLength}
      circular={circular}
      rounded={rounded}
      {...restProps}
    />
  )
}
