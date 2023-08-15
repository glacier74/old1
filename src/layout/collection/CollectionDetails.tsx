import { FC } from 'react'

import { AirtableImage } from '~/components'

export const CollectionDetails: FC<{
  record: CollectionRecord
}> = ({ record }) => {
  return (
    <section>
      <div className="relative max-w-7xl mx-auto px-5 z-10 pt-32 pb-32 md:pt-48 md:pb-48">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 ">
            Landing page example - {record.Name}
          </h1>
        </div>
        <div className="mt-16 sm:mt-20">
          <div className="flex gap-0 md:gap-10">
            <div className="flex-1">
              <AirtableImage
                className="w-full h-auto bg-slate-50 border-slate-100 rounded-xl shadow-md"
                src={record.Screenshot}
                alt={record.Name}
                width={800}
                height={0}
              />
            </div>

            <div className="md:w-96 relative">
              <div className="sticky top-24 border border-slate-100 px-4 py-8 shadow-sm">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {record.Name}
                </h1>
                <p className="mt-2 text-base text-gray-500">{record.Description}</p>
                <a
                  href={`${record.URL}?ref=earlybird`}
                  className="mt-4 block py-2 bg-slate-900 text-white text-center rounded-lg font-medium transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit {record.Name}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
