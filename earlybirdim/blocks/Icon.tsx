import { Icon as EarlyBirdIcon } from '@earlybirdim/icons'
import clsx from 'clsx'
import { FC } from 'react'

import { $Image } from './Image'

interface IconProps extends ComponentProps {
  width?: number
  height?: number
  color?: string
  background?: string
}

interface SvgIconProps extends IconProps {
  type: 'svg'
  name: string
}

interface EmojiIconProps extends IconProps {
  type: 'emoji'
  text: string
}

interface ImageIconProps extends IconProps {
  type: 'image'
  src: string
  alt?: string
}

export const $Icon: FC<SvgIconProps | EmojiIconProps | ImageIconProps> = ({
  type,

  // Image icons
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  src,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  alt,
  width,
  height,

  // Emoji icons
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  text,

  // SVG icons
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  name,
  className,
  color,
  background,
  ...restProps
}) => {
  return (
    <span
      className={clsx(`earlybird-icon earlybird-icon-${type}`, className)}
      style={{
        color,
        background
      }}
      {...restProps}
    >
      {(() => {
        switch (type) {
          case 'image':
            return <$Image src={src} alt={alt} width={width!} height={height!} {...restProps} />

          case 'emoji':
            return <span>{text}</span>

          case 'svg':
            return <EarlyBirdIcon name={name} width={width} height={height} {...restProps} />

          default:
            return null
        }
      })()}
    </span>
  )
}
