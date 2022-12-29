import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const FeaturesHero: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="relative max-w-7xl mx-auto px-5 z-10 pt-48 md:pt-64 md:pb-32">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            Turn your idea into a reality
          </h1>
          <div className="text-slate-500 text-lg md:text-xl w-full md:max-w-3xl md:mx-auto mt-5 font-normal">
            Save time and resources by using EarlyBird to validate your idea before diving into
            product development.
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-col md:flex-row items-center place-content-center space-y-5 space-x-0 md:space-y-0 md:space-x-5">
            <Link
              href="/sign-up"
              className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 text-normal text-center font-medium border border-emerald-500 bg-emerald-500 rounded-md text-white"
              title={t('home.signUp')}
            >
              Get started free
            </Link>
            <a
              href="https://help.earlybird.im/roadmap/"
              className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 text-normal text-center font-medium border border-slate-300 rounded-md"
            >
              View the roadmap
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
