import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const TemplatesDetailMakeInt: FC<{ integrations: IntegrationRecord[] }> = ({
  integrations
}) => {
  const { t } = useTranslation()

  return (
    <section className="bg-emerald-900/80 md:px-12 px-6 md:py-32 py-20 z-10">
      <div className="max-w-7xl mx-auto text-center">
        <div className="sm:text-5xl text-3xl font-bold text-white">
          Make life easy with integrations
        </div>
        <div className="flex flex-wrap justify-around md:mt-14 mt-7 gap-12">
          {integrations.map(row => (
            <Link
              key={row._id}
              className="flex flex-col md:gap-5 gap-3"
              href={`/integrations/${row.slug}`}
            >
              <Image
                src={row.Logo!}
                width={80}
                height={80}
                alt={row.Name}
                quality={100}
                className="object-cover"
              />
              <div className="sm:text-lg text-base font-medium text-white">{row.Name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
