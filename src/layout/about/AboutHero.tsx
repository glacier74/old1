import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const AboutHero: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-lime-50">
      <div className="relative max-w-7xl mx-auto px-6 md:py-32 py-20 z-10 text-center">
        <h2 className="max-w-4xl mx-auto text-2xl leading-8 font-bold md:text-5xl md:leading-tight">
          The early bird gets the worm
        </h2>
        <p className="mt-4 sm:text-xl text-base text-slate-700">
          We want to help you hunt your early adopters effortlessly.
        </p>
      </div>
    </section>
  )
}
