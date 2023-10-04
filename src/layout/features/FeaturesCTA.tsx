import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const FeaturesCTA: FC = () => {
  const { t } = useTranslation('features')

  return (
    <section className="bg-emerald-50">
      <div className="max-w-7xl mx-auto py-32 px-4 text-center">
        <h2 className="font-bold text-4xl text-slate-900">{t('bottom.headline')}</h2>
        <p className="max-w-3xl mx-auto mt-6 text-xl text-slate-700">{t('bottom.subHeadline')}</p>

        <div className="mt-10">
          <div className="flex flex-col md:flex-row items-center place-content-center space-y-5 space-x-0 md:space-y-0 md:space-x-5">
            <Link
              href="/sign-up"
              className="w-full md:w-auto px-4 py-2 md:px-8 md:py-3 text-lg text-center font-medium bg-slate-900 rounded-full text-white"
              locale={false}
            >
              {t('bottom.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
