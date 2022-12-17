import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const PricingHero: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="relative max-w-7xl mx-auto px-5 z-10 pt-48 md:pt-64 md:pb-16">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 ">Affordable pricing for startups</h1>
          <div className="text-slate-500 text-lg md:text-xl w-full md:max-w-3xl md:mx-auto mt-5 font-normal">
            We understand that startups often have limited budgets and need to be mindful of their
            spending, get started for free today and consider upgrading when you want to.
          </div>
        </div>
      </div>
    </section>
  )
}
