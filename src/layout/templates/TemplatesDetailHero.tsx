import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

export const TemplatesDetailHero: FC = () => {
  const { t } = useTranslation()
  return (
    <section className="max-w-7xl mx-auto md:px-12 px-6 xl:py-20 lg:py-20 py-12 md:pt-12 pt-6 z-10">
      <div className="text-sm font-medium">
        All templates - Saas <span className="text-slate-500">- Template Name 1</span>
      </div>
      <div className="flex sm:flex-row flex-col justify-between items-center max-w-5xl mx-auto mt-7 md:gap-5 gap-7">
        <div className="flex flex-col justify-center items-start xl:gap-7 gap-5">
          <div className="md:text-3xl text-xl font-bold">Template Name 1</div>
          <div className="md:text-xl text-base text-slate-700">
            This powerful order form lets people place orders and pay-all in the same place.
            Ka-ching.
          </div>
          <div className="bg-slate-900 rounded-full py-2 px-8 inline-flex">
            <span className="text-slate-50 md:text-lg text-base">Use this template</span>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="absolute flex items-center justify-center w-20 h-7 border border-[#BBBBBB] text-sm bg-white cursor-pointer">
            Preview
          </div>
          <Image src="/static/temp2.jpg" width={500} height={400} alt="" />
        </div>
      </div>
    </section>
  )
}
