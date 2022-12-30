import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const GumroadCTA: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative pb-0 bg-emerald-100">
      <div className="max-w-5xl mx-auto px-5">
        <div className="py-32 text-slate-900">
          <h2 className="max-w-3xl mx-auto text-3xl md:text-5xl text-center font-bold">
            See the difference for yourself
          </h2>
          <div className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-center text-slate-700 font-medium">
            Elevate your digital product sales game with EarlyBird – try it out now and see the
            difference for yourself!
          </div>
          <div className="flex justify-center mt-8">
            <Link
              href="/sign-up"
              className="px-6 py-2 md:px-8 md:py-3 bg-emerald-500 border border-emerald-500 rounded-md text-white text-lg font-medium"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
