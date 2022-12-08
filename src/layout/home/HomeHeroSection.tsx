import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import HeroSectionImage from '~public/static/hero-section.png'

export const HomeHeroSection: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="relative text-white max-w-7xl mx-auto px-5 z-10">
        <div className="pt-72">
          <h1 className="text-5xl md:text-7xl font-extrabold">Build the next big thing</h1>
          <div className="text-slate-300 text-xl md:text-2xl w-full md:w-4/5 mt-5 font-normal">
            Put your idea into perspective with us. EarlyBird lets you build, pitch and validate
            your early-stage business in a simpler way.
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-col md:flex-row items-center space-y-5 space-x-0 md:space-y-0 md:space-x-5">
            <Link
              href="/sign-up"
              className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 text-lg text-center font-medium border border-green-500 bg-green-600 rounded-md"
              title={t('home.signUp')}
            >
              Sign up for beta, it's FREE
            </Link>
            <a
              href="https://help.earlybird.im/roadmap/"
              className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 text-lg text-center font-medium border border-slate-100 rounded-md"
            >
              View the roadmap
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-300">No credit card required.</p>
        </div>
      </div>
    </section>
  )
}
