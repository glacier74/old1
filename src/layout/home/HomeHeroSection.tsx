import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import HeroSectionImage from '~public/static/hero-section.png'

export const HomeHeroSection: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="relative">
        <Image
          src={HeroSectionImage}
          alt={t('common.name')}
          className="absolute -top-[9rem] -left-4 pointer-events-none"
          width="640"
          height="635"
          quality={100}
        />
      </div>
      <div className="relative text-white max-w-7xl mx-auto z-10">
        <div className="pt-[31rem]">
          <h1 className="text-8xl font-bold">Let's ship from here</h1>
          <div className="text-3xl w-3/4 mt-5">
            Put your idea into perspective with us. EarlyBird lets you build, pitch and validate
            your early-stage business in a simpler way.
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center space-x-10">
            <Link
              href="/sign-up"
              className="px-4 py-2.5 text-base border border-green-500 bg-green-500 rounded-md"
              title={t('home.signUp')}
            >
              Sign up for beta
            </Link>
            <a href="#" className="px-4 py-2.5 text-base border border-white rounded-md">
              View the roadmap
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
