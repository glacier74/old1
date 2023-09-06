import { Tooltip } from '@heyforms/ui'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import HomeBanner from '~public/static/home-banner.png'
import UserAvatar1 from '~public/static/userAvatar-1.png'
import UserAvatar2 from '~public/static/userAvatar-2.png'

export const HomeHeroSection: FC<{ usersCount: number }> = ({ usersCount }) => {
  const { t } = useTranslation()

  return (
    <section className="homeHero">
      <div className="relative text-slate-900 max-w-7xl mx-auto px-8 md:px-12 z-10">
        <div className="sm:pt-24 pt-8 text-center">
          <div className="inline-block rounded-full px-6 py-2 mb-8 text-sm md:text-base text-slate-700 border border-slate-200">
            Acquire your first customer by{' '}
            <span className="font-bold text-emerald-500">
              {dayjs().add(10, 'm').format('h:mm A')}
            </span>{' '}
            with no waiting
          </div>
          <h1 className="max-w-3xl mx-auto text-4xl md:text-6xl font-bold md:font-extrabold">
            Create{' '}
            <span className="relative whitespace-nowrap text-emerald-500">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-emerald-300/70"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              <span className="relative">landing pages</span>
            </span>{' '}
            that capture early adopters
          </h1>
          <div className="max-w-3xl mx-auto text-slate-700 text-lg md:text-xl mt-6 leading-snug">
            Your ideas have the potential to be worth millions, and you can start without any
            technical knowledge, aided by ChatGPT!
          </div>
        </div>

        <div className="mt-8 pb-8">
          <div className="flex justify-center flex-col md:flex-row items-center space-y-5 space-x-0 md:space-y-0 md:space-x-5">
            <Link
              href="/sign-up"
              className="w-auto px-4 py-3 md:px-8 md:py-3 bg-emerald-400/30 hover:bg-emerald-500/30 rounded-full text-slate-950 sm:text-lg text-base font-medium"
              title={t('home.signUp')}
            >
              Get started for free -&#62;
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center mb-16">
          <div className="md:flex justify-center items-center">
            <div>
              <div className="flex place-content-center">
                <div className="text-sm sm:text-base text-slate-800 mb-4">
                  <span className="font-medium">{new Intl.NumberFormat().format(usersCount)}</span>{' '}
                  makers and startups are building their landing pages with EarlyBird
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
