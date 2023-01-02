import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

const categories = [
    { name: 'Commerce', href: '#', current: true },
    { name: 'Personal', href: '#', current: false },
    { name: 'Community', href: '#', current: false },
    { name: 'Web3', href: '#', current: false },
    { name: 'SaaS', href: '#', current: false },
    { name: 'Mobile', href: '#', current: false },
    { name: 'Event', href: '#', current: false },
    { name: 'Serivce', href: '#', current: false },
  ]

const pages = [
{
    title: 'Fumasterpiece',
    author: 'Rando',
    thumbnail:
    'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
},
// More files...
]
  
function classNames(...classes) {
return classes.filter(Boolean).join(' ')
}

export const ShowcaseList: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="py-32 bg-slate-100">
      <div className="max-w-7xl mx-auto">
        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {pages.map((page) => (
            <li key={page.source} className="relative">
            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img src={page.thumbnail} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                <button type="button" className="absolute inset-0 focus:outline-none">
                <span className="sr-only">View details for {page.title}</span>
                </button>
            </div>
            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{page.title}</p>
            <p className="block text-sm font-medium text-gray-500 pointer-events-none">{page.author}</p>
            </li>
        ))}
        </ul>
      </div>
    </section>
  )
}
