import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const UseCaseTemplates: FC<{ template: TemplateRecord; similars: TemplateRecord[] }> = ({
  template,
  similars
}) => {
  const { t } = useTranslation()

  return (
    <section className="lg:pt-20 pt-12 md:px-12 px-6 z-10 py-16 mb-16">
      <div className="sm:text-3xl text-2xl font-semibold text-center">
        Get started with {template.Category.toLowerCase()} landing page templates
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-12 gap-8 text-left sm:mt-10 mt-5">
        {similars.map(row => (
          <Link
            key={row._id}
            className="rounded-md shadow-md flex flex-col gap-3"
            href={`/templates/${row.slug}`}
          >
            <div className="px-8 pt-8 overflow-hidden bg-gradient-to-br from-lime-50 via-yellow-50 to-sky-100">
              <div className="w-full aspect-video">
                <Image
                  className="rounded-t-xl w-full h-full object-cover"
                  src={row.Thumbnail}
                  alt={row.Name}
                  width={500}
                  height={400}
                  quality={100}
                />
              </div>
            </div>
            <div className="py-2 px-4 font-medium">{row.Name}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
