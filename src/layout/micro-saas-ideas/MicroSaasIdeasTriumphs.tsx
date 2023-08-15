import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

import { dataTriumphs } from './dataTriumphs'

export const MicroSaasIdeasTriumphs: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative max-w-7xl mx-auto sm:px-10 px-6 z-10">
      <div className="text-center">
        <div className="sm:text-3xl text-2xl font-semibold">Triumphs in Micro SaaS</div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-9 gap-5 text-left sm:mt-11 mt-5">
          {dataTriumphs.map((triumphs, index) => (
            <div
              key={index}
              className="flex flex-col justify-between border border-slate-200 w-full"
            >
              <Image
                src={triumphs.logo}
                alt={''}
                width={360}
                height={240}
                quality={100}
                style={{ width: '100%' }}
              />
              <div className="py-6 px-5">
                <div className="text-lg font-bold">{triumphs.name}</div>
                <div className="mt-2 text-slate-700">{triumphs.desc}</div>
                <div className="text-sm mt-5 font-medium">{triumphs.date}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="underline text-sm mt-9 text-[#101010]">
          Read all inspiring Micro SaaS success stories
        </div>
      </div>
    </section>
  )
}
