import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

const ALL_CATEGORY = 'All'

export const TemplatesHero: FC<{ categories: string[]; category?: string }> = ({
  categories,
  category = ALL_CATEGORY
}) => {
  const { t } = useTranslation('templates')
  return (
    <section className="sm:px-12 px-6 md:py-28 sm:py-20 py-12 z-10 bg-slate-50">
      <div className="text-center">
        <h1 className="max-w-2xl mx-auto text-3xl leading-8 font-bold md:text-5xl md:leading-[48px] text-center">
          {t('hero.headline')}
        </h1>
        <div className="max-w-3xl mx-auto text-slate-500 sm:text-xl text-base lg:mt-8 mt-3">
          {t('hero.desc')}
        </div>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center md:mt-14 mt-8 md:gap-5 gap-2">
          {[ALL_CATEGORY, ...categories].map(c => (
            <Link
              key={c}
              className={clsx(
                'border rounded-md px-6 py-1.5',
                category.toLowerCase() === c.toLowerCase()
                  ? 'bg-[#060716] border-[#060716] text-white'
                  : 'border-[#BBBBBB] hover:bg-slate-100'
              )}
              href={
                c === ALL_CATEGORY
                  ? '/templates'
                  : `/templates/category/${encodeURIComponent(c.toLowerCase())}`
              }
            >
              {c}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
