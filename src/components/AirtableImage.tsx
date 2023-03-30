import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

export const AirtableImage: FC<ImageProps> = ({ src, quality = 95, ...restProps }) => {
  if (!src) {
    return null
  }

  return <Image src={src} quality={quality} {...restProps} />
}
