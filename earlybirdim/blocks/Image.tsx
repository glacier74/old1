import clsx from 'clsx'
import NextImage from 'next/image'
import { FC } from 'react'

interface $ImageProps extends ComponentProps {
  src: string
  alt?: string
  width: number
  height: number
  quality?: number
}

export const $Image: FC<$ImageProps> = ({
  src,
  alt = '',
  width,
  height,
  quality = 95,
  className,
  ...restProps
}) => {
  return (
    <NextImage
      className={clsx('earlybird-image', className)}
      src={src}
      data-src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      {...restProps}
    />
  )
}
