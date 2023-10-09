import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import { FC } from 'react'

interface Props {
  categories: string[]
  category?: string
}

export const IntegrationsCat_Items: FC<Props> = ({ categories, category }) => {
  const { t } = useTranslation('integrations')
  return (
    <div className="flex flex-col sm:items-start items-center sm:gap-8 gap-5 sm:w-[220px] w-full">
      <div className="sm:text-base text-xl sm:font-medium font-semibold">
        {t('category.category')}
      </div>
      <div className="flex sm:flex-col flex-wrap justify-center w-full">
        {categories.map(c => (
          <Link
            key={c}
            className={clsx('sm:mb-6 mb-4 cursor-pointer text-sm sm:text-left text-center mx-2', {
              'text-emerald-600': c.toLowerCase() === category
            })}
            href={`/integrations/category/${encodeURIComponent(c.toLowerCase())}`}
          >
            {c}
          </Link>
        ))}
      </div>
    </div>
  )
}
