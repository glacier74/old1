import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const FeaturesHero: FC = () => {
  const { t } = useTranslation('features')

  return (
    <section className="bg-gradient-to-br from-emerald-100 via-blue-50 to-rose-100">
      <div className="relative max-w-7xl mx-auto px-5 z-10 py-32">
        <div className="text-center">
          <h1 className="max-w-3xl mx-auto text-3xl md:text-6xl font-bold text-slate-900">
            {t('hero.headline')}
          </h1>
          <div className="text-slate-500 text-lg md:text-2xl w-full md:max-w-3xl md:mx-auto mt-6">
            {t('hero.subHeadline')}
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-col md:flex-row items-center place-content-center space-y-5 space-x-0 md:space-y-0 md:space-x-5">
            <Link
              href="/sign-up"
              className="w-full md:w-auto px-4 py-2 md:px-8 md:py-3 text-lg text-center font-medium bg-slate-900 rounded-full text-white"
              locale={false}
            >
              {t('hero.cta1')}
            </Link>
            <a
              href="https://help.earlybird.im/user/roadmap.html"
              className="w-full md:w-auto px-4 py-2 md:px-8 md:py-3 text-lg text-center font-medium border border-slate-700 rounded-full"
            >
              {t('hero.cta2')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
