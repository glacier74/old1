import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

import { PreviewModal } from '../create-product/PreviewModal'

export const TemplatesDetailHero: FC<{ template: TemplateRecord }> = ({ template }) => {
  const { t } = useTranslation()
  const [payload, setPayload] = useState<Template_V3>()

  function handleClick() {
    setPayload({
      id: template.slug,
      name: template.Name,
      thumbnail: template.Thumbnail,
      categoryId: ''
    })
  }

  return (
    <>
      <section className="max-w-7xl mx-auto md:px-12 px-6 xl:py-20 lg:py-20 py-12 md:pt-12 pt-6 z-10">
        <div className="mb-[32px] text-sm font-medium">
          <Link href="/templates">All templates</Link>
          <span className="px-2 text-slate-500">-</span>
          <Link href={`/templates/category/${template.Category}`}>{template.Category}</Link>
          <span className="px-2 text-slate-500">-</span>
          <span className="text-slate-500">{template.Name}</span>
        </div>
        <div className="max-w-7xl mx-auto">
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

            <div className="group flex-1 relative">
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors hover:bg-black/20 group-hover:opacity-100">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg bg-emerald-500 text-white text-sm z-10 shadow-lg transition-colors hover:bg-emerald-600"
                  onClick={handleClick}
                >
                  Preview
                </button>
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

      <PreviewModal
        template={payload}
        onSelect={handleClick}
        onClose={() => setPayload(undefined)}
      />
    </>
  )
}
