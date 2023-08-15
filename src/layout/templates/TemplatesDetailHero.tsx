import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

export const TemplatesDetailHero: FC<{ template: TemplateRecord }> = ({ template }) => {
  const { t } = useTranslation()

  return (
    <section className="max-w-7xl mx-auto md:px-12 px-6 xl:py-20 lg:py-20 py-12 md:pt-12 pt-6 z-10">
      <div className="text-sm font-medium">
        All templates - Saas <span className="text-slate-500">- {template.Name}</span>
      </div>
      <div className="max-w-7xl mx-auto mt-[30px]">
        <div className="flex items-center gap-20">
          <div className="flex-1 xl:space-y-7 space-y-5">
            <div className="text-3xl leading-8 font-bold md:text-5xl md:leading-[48px]">
              {template.Name}
            </div>
            <div className="text-slate-500 sm:text-xl text-base whitespace-pre-line">
              {template.Description}
            </div>
            <div className="bg-slate-900 rounded-full py-2 px-8 inline-flex">
              <span className="text-slate-50 md:text-lg text-base">Use this template</span>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute w-20 h-7 border border-[#BBBBBB] text-sm bg-white cursor-pointer">
              Preview
            </div>
            <div
              className="px-8 pt-8 overflow-hidden"
              style={{
                background: template.Background
              }}
            >
              <Image
                className="rounded-t-2xl object-cover shadow-2xl"
                src={template.Thumbnail}
                width={500}
                height={400}
                loading="lazy"
                alt={template.Name}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
