import { Input } from '@heyforms/ui'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'

interface CollectionWrapProps {
  search?: string
  categories: string[]
  category?: string
  children: ReactNode
}

export const CollectionWrap: FC<CollectionWrapProps> = ({
  search,
  category,
  categories,
  children
}) => {
  const router = useRouter()

  function handleSearch(search: string) {
    router.push(`/collections/search?query=${encodeURIComponent(search)}`)
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
            <Input.Search value={search} placeholder="Search" onSearch={handleSearch} />
            <div className="mt-4">
              <h3 className="text-xl font-medium mb-2">Categories</h3>
              <ul className="space-y-2">
                {categories.map(c => (
                  <li key={c}>
                    <Link
                      className={clsx('text-slate-700 hover:text-green-500', {
                        '!text-green-500': category === c.toLowerCase()
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

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </section>
  )
}
