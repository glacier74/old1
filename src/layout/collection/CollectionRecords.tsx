import { EmptyStates, Input } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useMemo } from 'react'

import { IconPlan } from '~/components'

const CollectionThumbnail: FC<{ metaTitle: string; attachments: AirtableAttachment[] }> = ({
  metaTitle,
  attachments
}) => {
  const imageURL = useMemo(
    () => (attachments || []).find(a => a.type.startsWith('image/'))?.thumbnails?.large?.url,
    [attachments]
  )

  if (!imageURL) {
    return null
  }

  return (
    <Image
      className="pointer-events-none object-cover transition-transform transform-gpu ease-in-out group-hover:scale-105"
      src={imageURL}
      alt={metaTitle}
      width={400}
      height={280}
      quality={95}
    />
  )
}

const CATEGORIES = ['Technology', 'Healthcare', 'E-commerce', 'Education', 'Finance']

export const CollectionRecords: FC<{
  search?: string
  category?: string
  records: CollectionRecord[]
}> = ({ search, category, records }) => {
  console.log(search, category)

  function handleSearch(search: string) {
    console.log(search)
  }

  return (
    <section>
      <div className="relative max-w-7xl mx-auto px-5 z-10 pt-32 pb-32 md:pt-48 md:pb-48">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 ">
            Affordable pricing for startups
          </h1>
          <div className="text-slate-700 text-base md:text-lg w-full md:max-w-3xl md:mx-auto mt-5">
            We understand that startups often have limited budgets and to be mindful of their
            spending. Get started for free and consider upgrading when you want to.
          </div>
        </div>
        <div className="mt-16 sm:mt-20 flex gap-12">
          <div>
            <Input.Search placeholder="Search" onSearch={handleSearch} />
            <div className="mt-4">
              <ul className="space-y-2">
                {CATEGORIES.map(c => (
                  <li key={c}>
                    <Link
                      className={clsx('text-slate-900 hover:text-green-500', {
                        '!text-green-500': category === c
                      })}
                      href={`/collections?category=${encodeURIComponent(c)}`}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex-1">
            {isEmpty(records) ? (
              <EmptyStates
                className="w-full pt-32 flex flex-col justify-center"
                icon={<IconPlan className="non-scaling-stroke" />}
                title="No results found"
                description="We're sorry, but we couldn't find any results for you. Please try using different keywords or category."
              />
            ) : (
              <div className="w-full">
                <ul
                  role="list"
                  className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6"
                >
                  {records.map(record => (
                    <li
                      key={record['URL']}
                      className="border border-slate-200 rounded-lg shadow-sm"
                    >
                      <a className="group" href={record['URL']}>
                        <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-t-lg bg-gray-100">
                          <CollectionThumbnail
                            metaTitle={record['Meta title']}
                            attachments={record['Thumbnail']}
                          />
                        </div>
                        <p className="pointer-events-none px-4 py-3 block truncate text-sm font-medium text-gray-900">
                          {record['Meta title']}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
