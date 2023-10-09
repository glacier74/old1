import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const IntegrationsDetailJourney: FC = () => {
  const { t } = useTranslation('integrations')

  return (
    <section className="bg-white">
      <div className="relative max-w-3xl mx-auto px-6 sm:py-24 py-12 z-10">
        <div className="flex flex-col justify-center items-start gap-5">
          <h3 className="sm:text-4xl text-2xl font-bold">{t('journey.headline')}</h3>
          <h4 className="text-slate-500 text-xl font-medium">{t('journey.desc')}</h4>
          <p className="text-lg">{t('journey.desc2')}</p>
          <a
            href="/sign-up"
            className="bg-slate-900 px-8 py-3 text-lg font-medium rounded-full text-white"
          >
            {t('journey.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
