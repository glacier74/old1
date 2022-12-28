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
          <h1 className="text-4xl leading-tight md:text-6xl font-extrabold md:leading-none">Create <span className="relative whitespace-nowrap text-emerald-500"><svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-emerald-300/70" preserveAspectRatio="none"><path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path></svg><span className="relative">landing pages</span></span><br /> your audience will love</h1>
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
