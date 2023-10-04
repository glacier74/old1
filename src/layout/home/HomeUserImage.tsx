import { Trans, useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import UserImageIllustration from '~public/static/all-nighter.png'

export const HomeUserImage: FC = () => {
  const { t } = useTranslation('home')

  return (
    <section className="relative sm:py-32 py-16">
      <h2 className="max-w-3xl mx-auto text-3xl md:text-6xl font-extrabold text-center">
        <Trans
          i18nKey="userImage.headline"
          t={t}
          components={{
            span: <span className="text-red-700/80 underline" />
          }}
        />
      </h2>
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-4 gap-4 place-items-center">
        <div className="col-span-2">
          <div className="py-4 md:py-8 px-4 text-slate-900">
            <div className="w-full mt-8">
              <h3 className="sm:text-2xl text-xl font-semibold mb-2">{t('userImage.q1')}</h3>
              <p>{t('userImage.a1')}</p>
              <h3 className="sm:text-2xl text-xl font-semibold mt-8 mb-2">{t('userImage.q2')}</h3>
              <p>{t('userImage.a2')}</p>
              <p className="mt-8">
                <Trans
                  i18nKey="userImage.a3"
                  t={t}
                  components={{
                    span: <span className="font-bold" />
                  }}
                />
              </p>
              <p className="text-xl font-semibold mt-8">{t('userImage.q4')}</p>
              <p className="mt-4">
                <Trans
                  i18nKey="userImage.a4"
                  t={t}
                  components={{
                    a: (
                      <a
                        href="https://earlybird.im/blog/how-we-built-namebridge-in-16-hours-with-a-0-budget/"
                        className="text-emerald-700 underline"
                        target="_blank"
                        rel="noreferrer"
                      />
                    )
                  }}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 p-8">
          <Image
            src={UserImageIllustration}
            alt="Avoid burning time and money at early stage "
            className="w-full object-cover"
            quality={100}
            width={548}
          />
        </div>
      </div>
    </section>
  )
}
