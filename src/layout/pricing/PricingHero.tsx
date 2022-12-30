import { IconSpeakerphone } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export const PricingHero: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="relative max-w-7xl mx-auto px-5 z-10 pt-36 md:pt-48 md:pb-16">
        <div className="max-w-3xl mx-auto rounded-md bg-blue-50 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <IconSpeakerphone className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-slate-900">
                EarlyBird is in public beta until{' '}
                <span className="font-bold text-slate-900">December 31st, 2022</span>. During this
                period, the product will be totally free to use.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 ">
            Affordable pricing for startups
          </h1>
          <div className="text-slate-700 text-lg md:text-xl w-full md:max-w-3xl md:mx-auto mt-5 font-medium">
            We understand that startups often have limited budgets and to be mindful of their
            spending. Get started for free and consider upgrading when you want to.
          </div>
        </div>
      </div>
    </section>
  )
}
