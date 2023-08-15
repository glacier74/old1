import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const IntegrationsHero: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-[#f8fafc]">
      <div className="relative max-w-7xl mx-auto px-6 md:py-24 py-12 z-10">
        <div className="text-center">
          <div className="max-w-2xl mx-auto text-3xl font-bold sm:text-5xl">
            Supercharge your workflow with your favorite apps
          </div>
          <div className="text-slate-500 text-base sm:text-xl w-full md:max-w-3xl md:mx-auto lg:mt-8 mt-3">
            Welcome to a world where your landing page and your favorite tools work in perfect
            harmony. Discover how our integrations can open doors to seamless and streamlined
            workflows.
          </div>
        </div>
      </div>
    </section>
  )
}
