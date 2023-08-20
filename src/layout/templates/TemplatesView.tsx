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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-12 gap-8">
          {templates.map(template => (
            <Link
              key={template._id}
              href={`/templates/${template.slug}`}
              className="rounded-md shadow-md"
            >
              <div className="w-full aspect-video">
                <Image
                  className="rounded-t-md w-full h-full object-cover"
                  src={template.Thumbnail}
                  alt={template.Name}
                  width={360}
                  height={200}
                  quality={100}
                />
              </div>

              <div className="mt-3 flex justify-between items-center py-2 px-4 sm:text-lg text-base font-medium">
                {template.Name}
              </div>
            </Link>
          ))}
        </div>

        <Pagination
          className="mt-5 !border-none"
          uri={category ? `/templates/category/${encodeURIComponent(category)}` : '/templates'}
          total={total}
          page={page}
          limit={limit}
        />
      </div>
    </section>
  )
}
