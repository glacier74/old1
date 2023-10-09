import { Trans, useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'

import AboutImage from '~public/static/about.webp'

export const AboutEvolution: FC = () => {
  const { t } = useTranslation('about')
  return (
    <section className="xl:py-24 md:py-16 py-12 md:px-12 px-6 z-10">
      <div className="max-w-2xl mx-auto">
        <Image
          src={AboutImage}
          alt={t('evolution.headline')}
          className="mx-auto mb-8"
          quality={100}
          width={200}
        />
        <h2 className="text-4xl font-bold text-slate-950 mb-8 text-center">
          {t('evolution.headline')}
        </h2>
        <div className="text-lg leading-normal text-slate-900 space-y-4">
          <p>
            <Trans
              i18nKey="evolution.desc1"
              t={t}
              components={{
                link1: (
                  <a
                    href="https://heyform.net"
                    className="text-emerald-500 underline"
                    target="_blank"
                  />
                ),
                link2: (
                  <a
                    href="https://tinysnap.app"
                    className="text-emerald-500 underline"
                    target="_blank"
                  />
                )
              }}
            />
          </p>
          <p>{t('evolution.desc2')}</p>
          <p>{t('evolution.desc3')}</p>
          <p>{t('evolution.desc4')}</p>
        </div>
      </div>
    </section>
  )
}
