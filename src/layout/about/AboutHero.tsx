import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const AboutHero: FC = () => {
  const { t } = useTranslation('about')

  return (
    <section className="bg-green-100/30">
      <div className="relative max-w-7xl mx-auto px-6 md:py-24 py-12 z-10 text-center">
        <h1 className="max-w-4xl mx-auto text-2xl leading-8 font-bold md:text-5xl md:leading-tight">
          {t('hero.headline')}
        </h1>
        <p className="mt-4 sm:text-xl text-base text-slate-700">{t('hero.description')}</p>
      </div>
    </section>
  )
}
