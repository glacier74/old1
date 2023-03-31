import { Avatar } from '@heyforms/ui'
import { AvatarProps } from '@heyforms/ui/types/avatar/Avatar'
import { isValid } from '@nily/utils'
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
  if (isValid(src)) {
    return (
      <div style={{ width: imageSize, height: imageSize }}>
        <Image
          className={clsx(
            'avatar',
            {
              'avatar-circular': circular,
              'avatar-rounded': rounded
            },
            className
          )}
          src={src!}
          quality={95}
          alt=""
          width={imageSize}
          height={imageSize}
        />
      </div>
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
