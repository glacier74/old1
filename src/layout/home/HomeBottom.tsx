import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const HomeBottom: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative pb-0 bg-emerald-100">
      <div className="max-w-5xl mx-auto px-5">
        <div className="py-32 text-slate-900">
          <h2 className="w-full max-w-2xl mx-auto text-4xl md:text-5xl text-center font-extrabold">
            The place for early stage entrepreneurs to bootstrap
          </h2>
          <div className="max-w-3xl mx-auto mt-8 text-lg md:text-2xl text-center leading-snug text-slate-700">
            EarlyBird is the perfect platform for launching a new product, building a newsletter, or
            creating a business profile.
          </div>
          <div className="flex justify-center mt-10">
            <Link
              href="/sign-up"
              className="text-base font-medium px-6 py-2 md:px-8 md:py-3 rounded-md bg-slate-900 text-white shadow-lg"
            >
              Sign up as an early bird
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
