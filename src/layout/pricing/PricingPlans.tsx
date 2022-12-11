import { IconCheck } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

const tiers = [
  {
    name: 'Free',
    href: '#',
    priceMonthly: 0,
    priceAnually: 0,
    description: 'All the basics for starting a new business',
    includedFeatures: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.']
  },
  {
    name: 'Standard',
    href: '#',
    priceMonthly: 12,
    priceAnually: 10,
    description: 'All the basics for starting a new business',
    includedFeatures: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.']
  },
  {
    name: 'Pro',
    href: '#',
    priceMonthly: 25,
    priceAnually: 20,
    description: 'All the basics for starting a new business',
    includedFeatures: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.']
  }
]

export const PricingPlans: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:flex-col sm:align-center">
          <div className="relative self-center bg-slate-800 rounded-lg p-0.5 flex">
            <button
              type="button"
              className="relative w-1/2 bg-green-500 border-green-500 rounded-md shadow-sm py-2 text-sm font-medium text-white whitespace-nowrap focus:outline-none sm:w-auto sm:px-8"
            >
              Monthly billing
            </button>
            <button
              type="button"
              className="ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-white whitespace-nowrap focus:outline-none sm:w-auto sm:px-8"
            >
              Yearly billing
            </button>
          </div>

          <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
            {tiers.map(tier => (
              <div
                key={tier.name}
                className="border border-slate-700 rounded-lg shadow-sm divide-y divide-slate-800"
              >
                <div className="p-6">
                  <h2 className="text-lg leading-6 font-medium text-white">{tier.name}</h2>
                  <p className="mt-4 text-sm text-slate-400">{tier.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-white">${tier.priceMonthly}</span>{' '}
                    <span className="text-base font-medium text-slate-400">/mo</span>
                  </p>
                  <a
                    href={tier.href}
                    className="mt-8 block w-full bg-green-500 border border-green-500 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-green-600"
                  >
                    Get started with {tier.name}
                  </a>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-xs font-medium text-white tracking-wide uppercase">
                    What's included
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {tier.includedFeatures.map(feature => (
                      <li key={feature} className="flex space-x-3">
                        <IconCheck
                          className="flex-shrink-0 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-slate-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
