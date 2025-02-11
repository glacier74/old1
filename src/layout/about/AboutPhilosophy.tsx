import { Trans, useTranslation } from 'next-i18next'
import { FC } from 'react'

export const AboutPhilosophy: FC = () => {
  const { t } = useTranslation('about')

  return (
    <section className="bg-slate-50 xl:py-24 md:py-16 py-12 md:px-12 px-6 z-10 my-24">
      <div className="max-w-3xl mx-auto">
        <h3 className="sm:text-4xl text-2xl font-bold text-center mb-8">
          {t('philosophy.headline')}
        </h3>
        <div className="text-slate-900 text-lg leading-relaxed">
          <p className="mb-4">
            <Trans
              i18nKey="philosophy.transparency"
              t={t}
              components={{
                strong: <span className="font-bold" />
              }}
            />
          </p>
          <p className="mb-4">
            <Trans
              i18nKey="philosophy.human"
              t={t}
              components={{
                strong: <span className="font-bold" />
              }}
            />
          </p>
          <p className="mb-4">
            <Trans
              i18nKey="philosophy.focus"
              t={t}
              components={{
                strong: <span className="font-bold" />
              }}
            />
          </p>
        </div>
      </div>
    </section>
  )
}
