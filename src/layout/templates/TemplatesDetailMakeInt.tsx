import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

import { dataMakeInt } from './dataMakeInt'

export const TemplatesDetailMakeInt: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-emerald-900/80 md:px-12 px-6 md:py-32 py-20 z-10">
      <div className="max-w-7xl mx-auto text-center">
        <div className="sm:text-5xl text-3xl font-bold text-white">
          Make life easy with integrations
        </div>
        <div className="flex flex-wrap justify-around md:mt-14 mt-7 gap-12">
          {dataMakeInt.map((makeInt, index) => (
            <div key={index} className="flex flex-col md:gap-5 gap-3">
              <Image
                src={makeInt.logo}
                width={100}
                height={100}
                alt={makeInt.title}
                quality={100}
                className="rounded-full"
              />
              <div className="sm:text-lg text-base font-medium text-white">{makeInt.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
