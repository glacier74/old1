import clsx from 'clsx'
import { FC } from 'react'
import sanitizeHtml from 'sanitize-html'

interface $HtmlProps extends ComponentProps {
  type: string
  as?: string
  html: string
}

export const $Html: FC<$HtmlProps> = ({
  type: _type,
  as: Tag = 'div' as any,
  className,
  html,
  ...restProps
}) => {
  return (
    <Tag
      className={clsx('earlybird-html', className)}
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(html, {
          allowedAttributes: {
            a: ['href', 'target', 'rel'],
            '*': ['style', 'class']
          }
        })
      }}
      {...restProps}
    />
  )
}
