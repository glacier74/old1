import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { Pagination } from '~/components'

// import Marquee from 'react-fast-marquee'
interface TemplateData {
  'Preview URL': string
  'Auto ID': string
  Name: string
  Category: string
  Price: string
}

interface TemplatesViewProps {
  templates: TemplateRecord[]
  category?: string
  total: number
  page: number
  limit: number
}

export const TemplatesView: FC<TemplatesViewProps> = ({
  templates,
  category,
  total,
  page,
  limit
}) => {
  return (
    <section className="lg:py-24 py-12 md:px-12 px-6 z-10">
      <div className="max-w-5xl mx-auto flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {templates.map(template => (
            <Link
              key={template._id}
              href={`/templates/${template.slug}`}
              className="rounded-md shadow-md"
            >
              <div className="flex flex-col justify-between h-full w-90">
                <div className="bg-emerald-400 px-8 pt-8 overflow-hidden">
                  <Image
                    src={template.Thumbnail}
                    alt={template.Name}
                    width={432}
                    height={240}
                    quality={100}
                    className="rounded-t-2xl object-cover shadow-2xl"
                  />
                </div>
                <div className="text-center py-4 px-4">
                  <div className="sm:text-lg text-base font-medium">{template.Name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Pagination
        className="mt-5 !border-none"
        uri={category ? `/templates/category/${encodeURIComponent(category)}` : '/templates'}
        total={total}
        page={page}
        limit={limit}
      />
    </section>
  )
}
