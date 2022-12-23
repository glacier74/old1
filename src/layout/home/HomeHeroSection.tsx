import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const HomeHeroSection: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="relative text-slate-900 max-w-7xl mx-auto px-12 z-10">
        <div className="pt-48 text-left">
          <h1 className="text-4xl leading-tight md:text-6xl font-extrabold md:leading-tight">Create <span className="bg-emerald-100 md:px-4 md:py-2">landing pages</span><br /> your audience will love</h1>
          <div className="text-slate-700 text-lg md:text-xl mt-5 font-normal">
            No-code landing page builder that allows you to build, pitch, and
            validate your early-stage business easily.
          </div>
        </div>

        <div className="mt-10 pb-24">
          <div className="flex flex-col md:flex-row items-center space-y-5 space-x-0 md:space-y-0 md:space-x-5">
            <Link
              href="/sign-up"
              className="w-full md:w-auto px-4 py-3 md:px-6 md:py-3 text-lg text-center font-medium border border-emerald-500 bg-emerald-500 rounded-md text-white"
              title={t('home.signUp')}
            >
              Sign up free
            </Link>
          </div>
          <p className="text-sm text-slate-700 mt-4"><span className="text-red-700">*</span> No credit card required.</p>
        </div>
      </div>
    </section>
  )
}
