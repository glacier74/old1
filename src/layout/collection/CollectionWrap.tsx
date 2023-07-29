import { Input } from '@heyforms/ui'
import { IconChevronRight } from '@tabler/icons'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, ReactNode, useState } from 'react'

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
  const [isOpened, setOpened] = useState(false)

  function handleSearch(search: string) {
    router.push(`/collections/search?query=${encodeURIComponent(search)}`)
  }

  function handleClick() {
    setOpened(isOpened => !isOpened)
  }

  return (
    <section>
      <div className="relative max-w-7xl mx-auto px-5 z-10 py-32 md:py-48">
        <div className="text-center mb-24 md:mb-32">
          <h1 className="max-w-3xl mx-auto text-3xl md:text-5xl font-bold text-slate-900 ">
            Discover inspiration for your landing page
          </h1>
          <div className="text-slate-700 text-base md:text-lg w-full md:max-w-3xl md:mx-auto mt-6">
            Quickly find your landing page inspiration from our vast collection of hundreds of
            examples, and adapt it to make it uniquely yours.
          </div>
        </div>
        <div className="mt-16 md:flex gap-12">
          <div className="mb-8 border-b border-gray-200 mb:mb-0 md:border-b-none">
            <Input.Search value={search} placeholder="Search" onSearch={handleSearch} />
            <div className="mt-4">
              <div
                className="pb-4 md:pb-0 flex items-center justify-between md:block"
                onClick={handleClick}
              >
                <h3 className="text-xl font-medium mb-0 md:mb-2">Categories</h3>
                <IconChevronRight
                  className={clsx('md:hidden w-4 h-4 text-gray-700', { 'rotate-90': isOpened })}
                />
              </div>
              <div className="relative">
                <ul className={clsx('hidden md:block space-y-2', { '!block pb-4': isOpened })}>
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
          </div>

          <div className="md:flex-1">{children}</div>
        </div>
      </div>
    </section>
  )
}
