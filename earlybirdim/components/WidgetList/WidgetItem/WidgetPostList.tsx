import { isArray } from '@heyooo-inc/utils'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useMemo } from 'react'

import { WidgetPostListProps } from '../WidgetProps'

export const WidgetPostList: FC<WidgetPostListProps> = ({
  itemClassNames: rawItemClassNames,
  imageClassName,
  imageAlt,
  imageWidth,
  imageHeight,
  posts: rawPosts = [],
  maxCount = 0,
  ...restProps
}) => {
  const itemClassNames = useMemo(
    () =>
      isArray(rawItemClassNames)
        ? rawItemClassNames
        : (Array.from({ length: maxCount }).fill(rawItemClassNames) as string[]),
    [maxCount, rawItemClassNames]
  )

  const posts = useMemo(() => {
    const len = rawPosts.length

    if (len < maxCount) {
      return [...rawPosts, ...(Array.from({ length: maxCount - len }).fill(null) as null[])]
    }

    return rawPosts.slice(0, maxCount)
  }, [maxCount, rawPosts])

  return (
    <div {...restProps}>
      {posts.map((row, index) => (
        <div
          key={index}
          className={clsx('relative rounded-md bg-[#f2f2f2]', itemClassNames[index])}
        >
          {row && (
            <Image
              className={clsx('h-full w-full rounded-md object-cover', imageClassName)}
              src={row.thumbnail}
              width={imageWidth}
              height={imageHeight}
              alt={row.title || imageAlt || ''}
            />
          )}
          <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-md"></div>
        </div>
      ))}
    </div>
  )
}
