import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const PricingHero: FC = () => {
  const { t } = useTranslation('pricing')

  return (
    <section>
      <div className="relative max-w-7xl mx-auto px-5 z-10 pt-32 md:pt-24 md:pb-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 ">{t('hero.headline')}</h1>
          <div className="text-slate-700 text-base md:text-lg w-full md:max-w-3xl md:mx-auto mt-5">
            {t('hero.subHeadline')}
          </div>
        </div>
      </div>
    </section>
  )
}
