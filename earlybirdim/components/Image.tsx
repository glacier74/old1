import NextImage from 'next/image'
import { FC } from 'react'

export interface ImageProps extends ComponentProps {
  src: string
  width: number
  height: number
  alt?: string
  loading?: 'lazy' | 'eager'
}

export const Image: FC<ImageProps> = ({
  src,
  width = 0,
  height = 0,
  alt = '',
  loading = 'lazy',
  ...restProps
}) => {
  return (
    <NextImage
      src={src}
      data-src={src}
      width={width}
      height={height}
      alt={alt}
      loading={loading}
      {...restProps}
    />
  )
}
