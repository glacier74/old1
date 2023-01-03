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
          className="px-8 grid grid-col-1 md:grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {showcases.map(showcase => (
            <li key={showcase.url} className="relative">
              <a href={showcase.url}>
                <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-slate-100 overflow-hidden">
                  <img
                    className="object-cover pointer-events-none group-hover:opacity-75"
                    src={showcase.thumbnail}
                    alt={showcase.title}
                  />
                  <button type="button" className="absolute inset-0 focus:outline-none">
                    <span className="sr-only">View details for {showcase.title}</span>
                  </button>
                </div>
              </a>
              <a href={showcase.url}>
                <p className="mt-2 block text-lg font-bold text-slate-900 truncate pointer-events-none">
                  {showcase.title}
                </p>
              </a>
              <p className="block text-sm font-medium text-slate-500 pointer-events-none">
                by <span className="text-slate-700">{showcase.author}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
