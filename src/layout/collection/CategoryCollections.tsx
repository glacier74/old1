import { EmptyStates } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import Link from 'next/link'
import { FC } from 'react'

import { AirtableImage, IconPlan, Pagination } from '~/components'

import { CollectionWrap } from './CollectionWrap'

interface CategoryCollectionsProps {
  search?: string
  category?: string
  categories: string[]
  records: CollectionRecord[]
  page: number
  total: number
  limit: number
}

export const CategoryCollections: FC<CategoryCollectionsProps> = ({
  search,
  category,
  categories,
  records,
  page,
  total,
  limit
}) => {
  return (
    <CollectionWrap categories={categories} category={category} search={search}>
      <div className="flex-1">
        <div className="w-full">
          {isEmpty(records) ? (
            <EmptyStates
              className="w-full pt-32 flex flex-col justify-center"
              icon={<IconPlan className="non-scaling-stroke" />}
              title="No results found"
              description="We're sorry, but we couldn't find any results for you. Please try using different keywords or category."
            />
          ) : (
            <>
              <ul
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

              <Pagination
                className="mt-5 !border-none"
                uri={`/collections/category/${category}`}
                total={total}
                page={page}
                limit={limit}
              />
            </>
          )}
        </div>
      </div>
    </CollectionWrap>
  )
}
