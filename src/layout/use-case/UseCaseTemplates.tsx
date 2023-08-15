import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

import { dataTemplates } from './dataTemplates'

export const UseCaseTemplates: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="lg:pt-20 pt-12 md:px-12 px-6 z-10">
      <div className="sm:text-3xl text-2xl font-semibold text-center">
        Get started with waitlist landing page templates
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-12 gap-8 text-left sm:mt-10 mt-5">
        {dataTemplates.map((templates, index) => (
          <div key={index} className="flex flex-col gap-3">
            <Image
              src={templates.img}
              alt={''}
              width={500}
              height={600}
              quality={100}
              style={{ width: '100%' }}
            />
            <div className="flex justify-between items-center">
              <div className="sm:text-lg text-base font-medium">{templates.name}</div>
              <div className="flex gap-2">
                <div className="sm:w-20 w-16 sm:h-8 h-7 border flex items-center justify-center border-[#bbbbbb] rounded">
                  <span className="sm:text-sm text-xs">{templates.btn1}</span>
                </div>
                <div className="sm:w-20 w-16 sm:h-8 h-7 border flex items-center justify-center border-[#2d993f] rounded">
                  <span className="sm:text-sm text-xs text-[#2d993f]">{templates.btn2}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
