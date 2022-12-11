import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const PricingHero: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="relative text-white max-w-7xl mx-auto px-5 z-10 pt-48 md:pt-64 md:pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold">Affordable pricing for startups</h1>
          <div className="text-slate-400 text-xl md:text-2xl w-full md:max-w-3xl md:mx-auto mt-5 font-normal">
            We understand that startups often have limited budgets and need to be mindful of their
            spending, get started for free today and consider upgrading when you want to.
          </div>
        </div>
      </div>
    </section>
  )
}
