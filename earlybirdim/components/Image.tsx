import NextImage from 'next/image'
import { FC } from 'react'

export interface ImageProps extends ComponentProps {
  src: string
  width: number
  height: number
  alt?: string
  loading?: 'lazy' | 'eager'
  quality?: number
}

export const Image: FC<ImageProps> = ({
  src,
  width = 0,
  height = 0,
  alt = '',
  loading,
  quality = 100,
  ...restProps
}) => {
  if (!/https?:\/\//.test(src)) {
    return null
  }

  return (
    <NextImage
      src={src}
      data-src={src}
      width={width}
      height={height}
      // see https://stackoverflow.com/a/76008677
      sizes={width === 0 ? '100vw' : undefined}
      alt={alt}
      loading={loading}
      quality={quality}
      {...restProps}
    />
  )
}
