import { EmptyStates, Input } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { AirtableImage, IconPlan } from '~/components'

const CATEGORIES = ['Technology', 'Healthcare', 'E-commerce', 'Education', 'Finance']

export const CollectionRecords: FC<{
  search?: string
  category?: string
  records: CollectionRecord[]
}> = ({ search, category, records }) => {
  const router = useRouter()

  function handleSearch(search: string) {
    router.push(`/collections?search=${encodeURIComponent(search)}`)
  }

  return (
    <section>
      <div className="relative max-w-7xl mx-auto px-5 z-10 py-32 md:py-48">
        <div className="text-center mb-32">
          <h1 className="max-w-3xl mx-auto text-3xl md:text-6xl font-bold text-slate-900 ">
            Discover inspiration for your landing page
          </h1>
          <div className="text-slate-700 text-base md:text-2xl w-full md:max-w-3xl md:mx-auto mt-6">
            Quickly find your landing page inspiration from our vast collection of hundreds of
            examples, and adapt it to make it uniquely yours.
          </div>
        </div>
        <div className="mt-16 sm:mt-20 flex gap-12">
          <div>
            <Input.Search placeholder="Search" onSearch={handleSearch} />
            <div className="mt-4">
              <h3 className="text-xl font-medium mb-2">Categories</h3>
              <ul className="space-y-2">
                {CATEGORIES.map(c => (
                  <li key={c}>
                    <Link
                      className={clsx('text-slate-700 hover:text-green-500', {
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
                  key={category}
                  role="list"
                  className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6"
                >
                  {records.map(record => (
                    <li key={record.Slug} className="border border-slate-100 rounded-lg shadow-sm">
                      <Link className="group" href={`/collections/${record.Slug}`}>
                        <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-t-lg bg-slate-100/50">
                          <AirtableImage
                            className="pointer-events-none object-cover transition-transform transform-gpu ease-in-out"
                            src={record.Thumbnail}
                            alt={record.Title}
                            width={400}
                            height={280}
                          />
                        </div>
                        <p className="pointer-events-none px-4 py-3 block truncate text-sm font-medium text-gray-900">
                          {record.Title}
                        </p>
                      </Link>
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
