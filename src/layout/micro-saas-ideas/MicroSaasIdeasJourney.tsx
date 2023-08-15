import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const MicroSaasIdeasJourney: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-emerald-50">
      <div className="relative max-w-3xl mx-auto sm:px-10 px-6 sm:py-24 py-12 z-10">
        <div className="flex flex-col justify-center items-center text-center lg:gap-6 gap-3">
          <div className="sm:text-3xl text-2xl font-bold">
            Ready to bring your micro SaaS idea to life?
          </div>
          <div className="sm:text-xl text-base w-full">
            Get started with EarlyBird today and begin your journey to creating a successful Micro
            SaaS business.
          </div>
          <a
            className="flex justify-center items-center py-3 px-8 bg-slate-900 rounded-full"
            href="/sign-up"
          >
            <span className="text-white">Start Your Journey</span>
          </a>
        </div>
      </div>
    </section>
  )
}
