import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { FC, useState } from 'react'

import { useGlobalContext } from './GlobalContext'

export interface ImageProps extends Pick<NextImageProps, 'onError'>, ComponentProps {
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
  const [isLoadFailed, setLoadFailed] = useState(false)

  if (!/https?:\/\//.test(src)) {
    return null
  }

  const isAdaptiveWidth = width === 0

  function handleError() {
    setLoadFailed(true)
  }

  if (isLoadFailed) {
    return <img src={src} 
    data-src={src} 
    width={isAdaptiveWidth ? (isPreview ? 9999 : undefined) : width}
    height={height} 
    alt={alt} 
    {...restProps}
    />
  }

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
      onError={handleError}
      {...restProps}
    />
  )
}
