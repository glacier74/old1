import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import { PreviewModal } from '../create-product/PreviewModal'

export const TemplatesDetailHero: FC<{ template: TemplateRecord }> = ({ template }) => {
  const router = useRouter()
  const [payload, setPayload] = useState<Template_V3>()
  const { t } = useTranslation('templates')

  function handleClick() {
    setPayload({
      id: template.slug,
      name: template.Name,
      thumbnail: template.Thumbnail,
      categoryId: ''
    })
  }

  function handleSelect() {
    router.push(`/product/create?template=${template.slug}}`)
  }

  return (
    <>
      <section className="max-w-7xl mx-auto md:px-12 px-6 xl:py-20 lg:py-20 py-12 md:pt-12 pt-6 z-10">
        <div className="mb-8 text-base font-medium">
          <Link href="/templates">{t('detail.heroHeadline')}</Link>
          <span className="px-2 text-slate-500">-</span>
          <Link href={`/templates/category/${template.LowerCaseCategory}`}>
            {template.Category}
          </Link>
          <span className="px-2 text-slate-500">-</span>
          <span className="text-slate-500">{template.Name}</span>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:gap-20 gap-8">
            <div className="flex-1 xl:space-y-7 space-y-5">
              <h1 className="text-3xl leading-8 font-bold md:text-5xl md:leading-[48px]">
                {template.Name}
              </h1>
              <div className="text-slate-500 sm:text-xl text-base whitespace-pre-line">
                {template.Description}
              </div>
              <div>
                <button
                  type="button"
                  className="w-full md:w-auto bg-slate-900 rounded-full py-2 px-8 text-slate-50 md:text-lg text-base"
                  onClick={handleSelect}
                >
                  {t('detail.useButton')}
                </button>
              </div>
            </div>

            <div className="group flex-1 relative rounded-xl">
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors hover:bg-black/20 group-hover:opacity-100 rounded-xl">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg bg-emerald-500 text-white text-sm z-10 shadow-lg transition-colors hover:bg-emerald-600"
                  onClick={handleClick}
                >
                  {t('detail.preview')}
                </button>
              </div>
              <div className="px-8 pt-8 overflow-hidden aspect-video bg-gradient-to-br from-emerald-50 via-blue-50 to-sky-100">
                <Image
                  className="rounded-t-2xl w-full h-full object-cover shadow-2xl"
                  src={template.Thumbnail}
                  width={500}
                  height={300}
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
        onSelect={handleSelect}
        onClose={() => setPayload(undefined)}
      />
    </>
  )
}
