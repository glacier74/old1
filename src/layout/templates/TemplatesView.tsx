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
      <div className="max-w-7xl mx-auto flex flex-wrap xl:gap-12 gap-8">
        {templates.map(template => (
          <Link
            key={template._id}
            href={`/templates/${template.slug}`}
            className="rounded-md shadow-md"
          >
            <div className="flex flex-col justify-between h-full gap-3 w-90">
              <Image
                src={template.Thumbnail}
                alt={template.Name}
                width={360}
                height={200}
                quality={100}
              />
              <div className="flex justify-between items-center py-2 px-4">
                <div className="sm:text-lg text-base font-medium">{template.Name}</div>
              </div>
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
    </section>
  )
}
