import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'
import dayjs from 'dayjs'

export const HomeHeroSection: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="relative text-slate-900 max-w-7xl mx-auto px-12 z-10">
        <div className="pt-40 text-center">
          <div className="inline-block rounded-full bg-emerald-50 px-4 py-2 mb-8 text-base text-emerald-600">Acquire your first customer by <span className="font-bold text-emerald-700">{dayjs().add(10, 'm').format('h:mm A')}</span> with no waiting.</div>
          <h1 className="text-4xl leading-tight md:text-6xl font-extrabold md:leading-none">Create landing pages<br /> your audience will love</h1>
          <div className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl mt-8 font-normal">
            Effortlessly create, pitch, and validate your early-stage business with our no-code landing page builder.
          </div>
        </div>

        <div className="mt-10 pb-36">
          <div className="flex justify-center flex-col md:flex-row items-center space-y-5 space-x-0 md:space-y-0 md:space-x-5">
            <Link
              href="/sign-up"
              className="w-full md:w-auto px-4 py-3 md:px-6 md:py-3 text-lg text-center font-medium border border-emerald-500 bg-emerald-500 rounded-md text-white"
              title={t('home.signUp')}
            >
              Sign up free
            </Link>
            <a href="https://www.producthunt.com/posts/earlybird-2?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-earlybird&#0045;2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=371908&theme=light&period=daily" alt="EarlyBird - Build&#0032;a&#0032;landing&#0032;page&#0032;and&#0032;validate&#0032;your&#0032;new&#0032;idea&#0032;in&#0032;10&#0032;mins | Product Hunt" className="inline-block w-full md:w-auto" width="250" height="54" /></a>
          </div>
        </div>
      </div>
    </section>
  )
}
