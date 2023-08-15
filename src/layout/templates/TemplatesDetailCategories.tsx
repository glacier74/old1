import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const TemplatesDetailCategories: FC<{ categories: string[] }> = ({ categories }) => {
  const { t } = useTranslation()

  return (
    <section className="max-w-4xl mx-auto md:px-12 px-6 lg:py-20 py-12 z-10">
      <div className="text-center">
        <div className="sm:text-3xl text-2xl font-semibold text-center">
          Other categories used by people like you
        </div>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center md:mt-14 mt-8 md:gap-5 gap-2">
          {categories.map(c => (
            <Link
              key={c}
              className="border rounded px-8 py-1 text-base cursor-pointer border-[#BBBBB"
              href={`/templates/category/${encodeURIComponent(c.toLowerCase())}`}
            >
              {c}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
