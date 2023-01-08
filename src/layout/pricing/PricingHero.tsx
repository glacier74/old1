import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const PricingHero: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="relative max-w-7xl mx-auto px-5 z-10 pt-36 md:pt-48 md:pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 ">
            Affordable pricing for startups
          </h1>
          <div className="text-slate-700 text-lg md:text-xl w-full md:max-w-3xl md:mx-auto mt-5 font-medium">
            We understand that startups often have limited budgets and to be mindful of their
            spending. Get started for free and consider upgrading when you want to.
          </div>
        </div>
      </div>
    </section>
  )
}
