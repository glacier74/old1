import { isValid } from '@nily/utils'
import clsx from 'clsx'
import { FC, useMemo } from 'react'

const VIDEO_RULES = [
  {
    regex: /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-z0-9_-]+)/i,
    handler: (matches: string[]) => {
      return `https://www.youtube.com/embed/${matches[2]}`
    }
  },
  {
    regex: /^https?:\/\/youtu\.be\/([a-z0-9_-]+)/i,
    handler: (matches: string[]) => {
      return `https://www.youtube.com/embed/${matches[1]}`
    }
  },
  {
    regex: /^https?:\/\/www\.youtube\.com\/embed\/([a-z0-9_-]+)/i,
    handler: (matches: string[]) => {
      return `https://www.youtube.com/embed/${matches[1]}`
    }
  },
  {
    regex: /^https?:\/\/vimeo\.com\/(\d+)/i,
    handler: (matches: string[]) => {
      return `https://player.vimeo.com/video/${matches[1]}`
    }
  }
]

interface $VideoProps extends ComponentProps {
  src: string
  alt?: string
}

export const $Video: FC<$VideoProps> = ({ src: rawSrc, alt, className, ...restProps }) => {
  const src = useMemo(() => {
    if (isValid(rawSrc)) {
      for (const rule of VIDEO_RULES) {
        const matches = rawSrc.match(rule.regex)

        if (matches) {
          return rule.handler(matches)
        }
      }
    }

    return rawSrc
  }, [rawSrc])

  return (
    <iframe
      className={clsx('earlybird-video', className)}
      src={src}
      title={alt}
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      {...restProps}
    />
  )
}
