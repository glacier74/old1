import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import showcases from '~/assets/showcases.json'

export const ShowcaseList: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="py-32 bg-slate-100">
      <div className="max-w-7xl mx-auto">
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {showcases.map(showcase => (
            <li key={showcase.source} className="relative">
              <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img
                  className="object-cover pointer-events-none group-hover:opacity-75"
                  src={showcase.thumbnail}
                  alt={showcase.title}
                />
                <button type="button" className="absolute inset-0 focus:outline-none">
                  <span className="sr-only">View details for {showcase.title}</span>
                </button>
              </div>
              <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                {showcase.title}
              </p>
              <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                {showcase.author}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
