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
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map(template => (
            <Link
              key={template._id}
              href={`/templates/${template.slug}`}
              className="rounded-md shadow-md"
            >
              <div className="px-8 pt-8 overflow-hidden bg-gradient-to-br from-lime-50 via-yellow-50 to-sky-100">
                <div className="w-full aspect-video">
                  <Image
                    className="rounded-t-xl w-full h-full object-cover"
                    src={template.Thumbnail}
                    alt={template.Name}
                    width={360}
                    height={200}
                    quality={100}
                  />
                </div>
              </div>
              <div className="py-4 px-4 sm:text-lg text-base font-medium">{template.Name}</div>
            </Link>
          ))}
        </div>

        <Pagination
          className="mt-16 !border-none"
          uri={category ? `/templates/category/${encodeURIComponent(category)}` : '/templates'}
          total={total}
          page={page}
          limit={limit}
        />
      </div>
    </section>
  )
}
