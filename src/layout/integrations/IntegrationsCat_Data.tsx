import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useTranslation } from 'next-i18next'

interface Props {
  groups: Array<{
    category: string
    records: IntegrationRecord[]
  }>
}

export const IntegrationsCat_Data: FC<Props> = ({ groups }) => {
  const { t } = useTranslation('integrations')
  return (
    <div className="w-full">
      <div className="my-12 space-y-12">
        {groups.map(g => (
          <div key={g.category}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-gray-900">{g.category}</h2>
            </div>

            <div className="grid lg:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 xl:gap-10 lg:gap-8 gap-5">
              {g.records.map(record => (
                <Link href={`/integrations/${record.slug}`} key={record.slug}>
                  <div className="flex flex-col justify-center items-center h-full py-8 px-4 mb-6 cursor-pointer text-sm border rounded-md shadow-sm hover:border-emerald-500">
                    <div className="flex items-center justify-center space-x-4">
                      <Image
                        src={record.Logo!}
                        alt={record.Name}
                        width={36}
                        height={36}
                        quality={100}
                      />
                      <div className="text-lg font-bold">{record.Name}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-200/30 rounded-md py-4 px-5 my-8 text-center">
        <p className="sm:text-lg text-base mb-2 mt-2 text-slate-700">
          {t('category.ctaRequest')}
          <a
            className="font-bold underline text-emerald-500 ml-1"
            href="https://earlybird.canny.io/feature-requests"
            target="_blank"
          >
            {t('category.ctaRequestLink')}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
