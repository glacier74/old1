import { Input } from '@heyforms/ui'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface CollectionSidebarProps {
  categories: string[]
  category?: string
}

export const CollectionSidebar: FC<CollectionSidebarProps> = ({ categories, category }) => {
  const router = useRouter()

  function handleSearch(search: string) {
    router.push(`/collections/search?query=${encodeURIComponent(search)}`)
  }

  return (
    <div>
      <Input.Search placeholder="Search" onSearch={handleSearch} />
      <div className="mt-4">
        <h3 className="text-xl font-medium mb-2">Categories</h3>
        <ul className="space-y-2">
          {categories.map(c => (
            <li key={c}>
              <Link
                className={clsx('text-slate-700 hover:text-emerald-500', {
                  '!text-emerald-500': category === c.toLowerCase()
                })}
                href={`/collections/category/${encodeURIComponent(c.toLowerCase())}`}
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
