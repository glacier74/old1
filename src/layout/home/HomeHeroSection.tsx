import { Tooltip } from '@heyforms/ui'
import dayjs from 'dayjs'
import { Trans, useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import { IconHomeHero } from '~/components'
import HomeBanner from '~public/static/home-banner.png'
import UserAvatar1 from '~public/static/userAvatar-1.png'
import UserAvatar2 from '~public/static/userAvatar-2.png'

export const HomeHeroSection: FC<{ usersCount: number }> = ({ usersCount }) => {
  const { t } = useTranslation('home')
  const [time, setTime] = useState<string>()

  useEffect(() => {
    setTime(dayjs().add(10, 'm').format('h:mm A'))
  }, [])

  return (
    <section className="homeHero">
      <div className="relative text-slate-900 max-w-7xl mx-auto px-8 md:px-12 z-10">
        <div className="sm:pt-24 pt-8 text-center">
          <div className="inline-block rounded-full px-6 py-2 mb-8 text-sm md:text-base text-slate-700 border border-slate-200">
            <Trans
              i18nKey="hero.caption"
              t={t}
              values={{ time }}
              components={{
                span: <span className="font-bold text-emerald-500" />
              }}
            />
          </div>
          <h1 className="max-w-3xl mx-auto text-4xl md:text-6xl font-bold md:font-extrabold">
            <Trans
              i18nKey="hero.headline"
              t={t}
              components={{
                wrap: <span className="relative whitespace-nowrap text-emerald-500" />,
                icon: <IconHomeHero />,
                span: <span className="relative" />
              }}
            />
          </h1>
          <div className="max-w-3xl mx-auto text-slate-700 text-lg md:text-xl mt-6 leading-snug">
            {t('hero.subHeadline')}
          </div>
        </div>

        <div className="mt-8 pb-8">
          <div className="flex justify-center flex-col md:flex-row items-center space-y-5 space-x-0 md:space-y-0 md:space-x-5">
            <Link
              href="/sign-up"
              className="w-auto px-4 py-3 md:px-8 md:py-3 bg-emerald-400/30 hover:bg-emerald-500/30 rounded-full text-slate-950 sm:text-lg text-base font-medium"
              title={t('home.signUp')}
              locale={false}
            >
              {t('hero.cta')}
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center mb-16">
          <div className="md:flex justify-center items-center">
            <div>
              <div className="flex place-content-center">
                <div className="text-sm sm:text-base text-slate-800 mb-4">
                  <Trans
                    i18nKey="hero.users"
                    t={t}
                    values={{
                      count: new Intl.NumberFormat().format(usersCount)
                    }}
                    components={{
                      span: <span className="font-medium" />
                    }}
                  />
                </div>
                <Tooltip ariaLabel="Real-time data updated hourly">
                  <div className="group ml-3 flex h-3 w-3">
                    <span className="animate-ping absolute h-3 w-3 rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-block rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                </Tooltip>
              </div>
              <Image
                src={UserAvatar1}
                alt="People using EarlyBird"
                className="inline-block"
                quality={100}
              />
              <Image
                src={UserAvatar2}
                alt="People using EarlyBird"
                className="hidden md:inline-block"
                quality={100}
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <Image
            src={HomeBanner}
            alt="EarlyBird Screenshot"
            className="w-full shadow-sm rounded-lg"
            quality={100}
            width={1184}
            priority
          />
        </div>
      </div>
    </section>
  )
}
