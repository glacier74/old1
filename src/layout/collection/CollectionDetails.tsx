import { FC } from 'react'

import { AirtableImage } from '~/components'

export const CollectionDetails: FC<{
  record: CollectionRecord
}> = ({ record }) => {
  return (
    <section>
      <div className="relative max-w-7xl mx-auto px-5 z-10 pt-32 pb-32 md:pt-48 md:pb-48">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 ">
            Get inspiration from {record.Title}
          </h1>
          <div className="text-slate-700 text-base md:text-lg w-full md:max-w-3xl md:mx-auto mt-5">
            the desktop (light) landing page version
          </div>
        </div>
        <div className="mt-16 sm:mt-20">
          <div className="flex gap-10">
            <div className="flex-1">
              <AirtableImage
                className="w-full h-auto bg-slate-50 border-slate-100 rounded-xl shadow-md"
                attachments={record.Screenshot}
                alt={record.Title}
                width={800}
                height={0}
              />
            </div>

            <div className="md:w-96 relative">
              <div className="sticky top-24">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {record.Title}
                </h1>
                <p className="mt-2 text-base text-gray-500">{record.Description}</p>
                <a
                  href={record.URL}
                  className="mt-4 block py-2 bg-green-500 text-white text-center rounded-lg font-medium transition hover:bg-green-600"
                >
                  Explore {record.Title}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
