import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'
import dayjs from 'dayjs'

export const HomeHeroSection: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="relative text-slate-900 max-w-7xl mx-auto px-12 z-10">
        <div className="pt-48 text-left">
          <h1 className="text-4xl leading-tight md:text-6xl font-extrabold md:leading-tight">Create <span className="bg-emerald-100 md:px-4 md:py-2">landing pages</span><br /> your audience will love</h1>
          <div className="text-slate-700 text-lg md:text-xl mt-5 font-normal">
            Effortlessly create, pitch, and validate your early-stage business with our no-code landing page builder.
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
            <a href="https://www.producthunt.com/posts/earlybird-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-earlybird&#0045;2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=371908&theme=light" alt="EarlyBird - Build&#0032;a&#0032;landing&#0032;page&#0032;and&#0032;validate&#0032;your&#0032;new&#0032;idea&#0032;in&#0032;10&#0032;mins&#0046; | Product Hunt" width="250" height="54" className="inline-block w-full md:w-auto"/></a>
          </div>
          <p className="text-sm text-slate-700 mt-4">Actions speak louder than words, capture your first lead by <span className="font-bold">{dayjs().add(10, 'm').format('h:mm A')}</span> with no waiting.</p>
        </div>
      </div>
    </section>
  )
}
