import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const MicroSaasIdeasHero: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="heroMicroSaasIdeas">
      <div className="relative max-w-5xl mx-auto sm:px-10 px-6 md:py-24 py-12 z-10">
        <div className="text-center">
          <h2 className="max-w-4xl mx-auto text-2xl leading-8 font-bold md:text-5xl md:leading-tight">
            Micro SaaS Ideas
          </h2>
          <p className="mt-4 sm:text-xl text-base text-slate-700">
            Learn from industry leaders and success stories, get insights into profitable niches,
            and gain valuable guidance to start your own micro SaaS business.
          </p>
        </div>
      </div>
    </section>
  )
}
