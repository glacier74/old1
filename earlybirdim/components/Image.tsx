import NextImage from 'next/image'
import { FC } from 'react'

import { useGlobalContext } from './GlobalContext'

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
  const { isPreview } = useGlobalContext()

  if (!/https?:\/\//.test(src)) {
    return null
  }

  const isAdaptiveWidth = width === 0

  return (
    <NextImage
      src={src}
      data-src={src}
      width={isAdaptiveWidth ? (isPreview ? 9999 : undefined) : width}
      height={height}
      // see https://stackoverflow.com/a/76008677
      sizes={isAdaptiveWidth ? '100vw' : undefined}
      alt={alt}
      loading={loading}
      quality={quality}
      {...restProps}
    />
  )
}
