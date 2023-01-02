import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const ShowcaseCTA: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative pb-0 bg-emerald-100">
      <div className="max-w-5xl mx-auto px-5">
        <div className="py-32 text-slate-900">
          <h2 className="w-full max-w-2xl mx-auto text-4xl md:text-5xl text-center font-extrabold">
            Now it's your turn
          </h2>
          <div className="max-w-3xl mx-auto mt-8 text-lg md:text-2xl text-center leading-snug text-slate-700">
            Create a kick-ass landing page without single line of coding.
          </div>
          <div className="flex justify-center mt-10">
            <Link
              href="/sign-up"
              className="text-xl font-medium px-6 py-2 md:px-8 md:py-3 border border-emerald-500 rounded-md bg-emerald-500 text-white"
            >
              Sign up today, it's FREE!
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
