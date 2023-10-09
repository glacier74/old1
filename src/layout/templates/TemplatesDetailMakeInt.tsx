import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const TemplatesDetailMakeInt: FC<{ integrations: IntegrationRecord[] }> = ({
  integrations
}) => {
  const { t } = useTranslation('templates')

  return (
    <section className="bg-emerald-200/50 md:px-12 px-6 md:py-32 py-20 z-10">
      <div className="max-w-7xl mx-auto text-center">
        <div className="sm:text-5xl text-3xl font-bold text-slate-950">
          {t('detail.integrationHeadline')}
        </div>
        <div className="grid grid-cols-3 mt-8 md:mt-16 md:grid-cols-6 gap-6 md:gap-12">
          {integrations.map(row => (
            <Link
              key={row._id}
              className="flex flex-col items-center md:gap-5 gap-3"
              href={`/integrations/${row.slug}`}
            >
              <Image
                src={row.Logo!}
                width={80}
                height={80}
                alt={row.Name}
                quality={100}
                className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] object-cover"
              />
              <div className="text-slate-950">{row.Name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
