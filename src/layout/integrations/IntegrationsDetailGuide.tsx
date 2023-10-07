import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const IntegrationsDetailGuide: FC<{ integration: IntegrationRecord }> = ({
  integration
}) => {
  const { t } = useTranslation('integrations')

  return (
    <section className="bg-green-100 py-16">
      <div className="relative max-w-5xl mx-auto px-6 sm:py-20 py-10 z-10 text-center">
        <h3 className="sm:text-4xl text-2xl font-bold mb-4">
          {t('guide.howTo')} EarlyBird <span className="text-emerald-500">+</span> {integration.Name}
        </h3>
        <p className="text-xl text-slate-700 mb-8">
          {t('guide.connectWith')} {integration.Name} {t('guide.connectDesc')}
        </p>

        <a
          href={integration.GuideURL}
          className="bg-slate-900 text-slate-50 font-medium px-8 py-3 text-lg rounded-full"
        >
          {t('guide.tutorial')}
        </a>
      </div>
    </section>
  )
}
