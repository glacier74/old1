import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const IntegrationsDetailJourney: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-[#FEFFF1]">
      <div className="relative max-w-7xl mx-auto px-6 sm:py-20 py-10 z-10">
        <div className="flex flex-col justify-center items-center text-center gap-5">
          <div className="sm:text-3xl text-2xl font-semibold">
            Don't just build a page, build a Business
          </div>
          <div className="text-sm font-semibold w-full md:max-w-lg md:mx-auto">
            With EarlyBird, create landing pages that help you understand your market, validate your
            ideas, and kickstart your business journey.
          </div>
          <div className="flex justify-center items-center sm:h-10 h-8 sm:w-48 w-40 bg-[#060716] rounded cursor-pointer">
            <span className="text-white sm:text-sm text-xs">Start your journey now</span>
          </div>
        </div>
      </div>
    </section>
  )
}
