import Image, { ImageProps } from 'next/image'
import { FC, useMemo } from 'react'

export interface AirtableImageProps extends Omit<ImageProps, 'src'> {
  attachments: AirtableAttachment[]
}

export const AirtableImage: FC<AirtableImageProps> = ({
  attachments,
  quality = 95,
  ...restProps
}) => {
  const src = useMemo(
    () => (attachments || []).find(a => a.type.startsWith('image/'))?.url,
    [attachments]
  )

  if (!src) {
    return null
  }

  return <Image src={src} quality={quality} {...restProps} />
}
