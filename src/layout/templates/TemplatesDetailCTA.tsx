import { FC } from 'react'

export const TemplatesDetailCTA: FC<{ template: TemplateRecord }> = ({ template }) => {
  return (
    <section className="bg-yellow-100/30 md:px-12 px-6 md:py-32 py-20 z-10">
      <div className="max-w-3xl mx-auto text-center">
        <div className="md:text-4xl text-2xl font-bold">{template['CTA title']}</div>
        <div className="md:mt-8 mt-4 md:text-xl text-lg text-slate-700">
          {template['CTA Description']}
        </div>
      </div>
    </section>
  )
}
