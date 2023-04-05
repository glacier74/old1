import { IconChevronRight } from '@tabler/icons'
import Link from 'next/link'
import { FC } from 'react'

import { AirtableImage } from '~/components'

import { CollectionWrap } from './CollectionWrap'

interface GroupCollectionsProps {
  categories: string[]
  groups: Array<{
    category: string
    records: CollectionRecord[]
  }>
}

export const GroupCollections: FC<GroupCollectionsProps> = ({ categories, groups }) => {
  return (
    <CollectionWrap categories={categories}>
      <div className="w-full space-y-20">
        {groups.map(g => (
          <div key={g.category}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-gray-900">{g.category}</h2>
              <a
                className="flex items-center text-sm text-gray-700 hover:text-green-500"
                href={`/collections/category/${encodeURIComponent(g.category.toLowerCase())}`}
              >
                More <IconChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
              {g.records.map(record => (
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
        ))}
      </div>
    </CollectionWrap>
  )
}
