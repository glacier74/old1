import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import showcases from '~/assets/showcases.json'

export const ShowcaseList: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="pt-16 pb-32">
      <div className="max-w-7xl mx-auto">
        <ul role="list" className="px-8 grid grid-col-1 md:grid-cols-3 gap-x-8 gap-y-8">
          {showcases.map(showcase => (
            <li key={showcase.url} className="relative bg-white border border-slate-200 rounded-lg">
              <a href={showcase.url}>
                <div className="group block w-full aspect-w-10 aspect-h-7 bg-slate-100 overflow-hidden">
                  <img
                    className="object-cover pointer-events-none rounded-t-lg"
                    src={showcase.thumbnail}
                    alt={showcase.title}
                  />
                  <button type="button" className="absolute inset-0 focus:outline-none">
                    <span className="sr-only">View details for {showcase.title}</span>
                  </button>
                </div>
              </a>
              <a href={showcase.url}>
                <p className="block text-lg font-bold text-slate-900 truncate pointer-events-none px-4 py-4">
                  {showcase.title}
                </p>
              </a>
              <p className="block text-sm font-medium text-slate-500 pointer-events-none"></p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
