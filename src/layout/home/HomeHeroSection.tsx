import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const HomeHeroSection: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="relative text-slate-900 max-w-7xl mx-auto px-5 z-10">
        <div className="pt-48 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold">Build the next big thing</h1>
          <div className="text-slate-700 text-lg md:text-xl max-w-3xl mt-5 font-normal mx-auto">
            Bring your idea to life with EarlyBird. Our platform allows you to build, pitch, and
            validate your early-stage business easily.
          </div>
        </div>

        <div className="mt-10">
          <div className="flex justify-center flex-col md:flex-row items-center space-y-5 space-x-0 md:space-y-0 md:space-x-5">
            <Link
              href="/sign-up"
              className="w-full md:w-auto px-4 py-3 md:px-6 md:py-3 text-normal text-center font-medium border border-slate-900 bg-slate-900 rounded-md text-white"
              title={t('home.signUp')}
            >
              Get started free
            </Link>
            <a
              href="https://help.earlybird.im/roadmap/"
              className="w-full md:w-auto px-4 py-3 md:px-6 md:py-3 text-normal text-center font-medium border border-slate-900 rounded-md"
            >
              View the roadmap
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
