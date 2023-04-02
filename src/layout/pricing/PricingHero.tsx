import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const PricingHero: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="relative max-w-7xl mx-auto px-5 z-10 pt-32 md:pt-48 md:pb-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-slate-900 ">
          Simple & flexible pricing
          </h1>
          <div className="text-slate-700 text-base md:text-lg w-full md:max-w-3xl md:mx-auto mt-5">
          No overcharges or hidden fees. We prefer simple and transparent.
          </div>
        </div>
      </div>
    </section>
  )
}
