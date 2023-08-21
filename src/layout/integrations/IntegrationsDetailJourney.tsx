import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const IntegrationsDetailJourney: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-white">
      <div className="relative max-w-3xl mx-auto px-6 sm:py-24 py-12 z-10">
        <div className="flex flex-col justify-center items-start gap-5">
          <h3 className="sm:text-4xl text-2xl font-bold">Why EarlyBird?</h3>
          <h4 className="text-slate-500 text-xl font-medium">
            With EarlyBird, create landing pages that help you understand your market, validate your
            ideas, and kickstart your business journey.
          </h4>
          <p className="text-lg">
            We enable people to setup working forms faster, reduce code complexity, and save tons of
            time without giving up control of form design or functionality.
          </p>
          <a
            href="/sign-up"
            className="bg-slate-900 px-8 py-3 text-lg font-medium rounded-full text-white"
          >
            Get started for free
          </a>
        </div>
      </div>
    </section>
  )
}
