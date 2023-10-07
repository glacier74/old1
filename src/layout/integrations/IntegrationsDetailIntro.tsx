import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { Markdown } from '~/components/Markdown'

export const IntegrationsDetailIntro: FC<{ integration: IntegrationRecord }> = ({
  integration
}) => {
  const { t } = useTranslation('integrations')

  return (
    <section className="max-w-2xl mx-auto py-16">
      <div className="relative px-6 sm:py-20 py-10 z-10">
        <h3 className="sm:text-4xl text-2xl font-bold mb-4">{t('detail.whatIs')} {integration.Name}?</h3>
        <Markdown className="text-lg text-slate-700 mb-8" markdown={integration.Intro} />
        <a
          href="/sign-up"
          className="bg-slate-900 text-slate-50 font-medium px-8 py-3 text-lg rounded-full"
        >
          {t('detail.heroCTA')}
        </a>
        <p className="text-slate-500 text-sm mt-4">{t('detail.ctaDesc')}</p>
      </div>
    </section>
  )
}
