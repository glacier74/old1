import { IconCheck } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC, useState } from 'react'

const tiers = [
  {
    name: 'Starter',
    href: '#',
    priceMonthly: 0,
    priceAnnually: 0,
    description: 'For new makers who want to fine-tune and test an idea.',
    includedFeatures: [
      '1 landing page included',
      '1,000 visits/mo',
      'Access to all UI blocks',
      '50 conversion actions included',
      '5% payment commission',
      'Real-time analytics'
    ]
  },
  {
    name: 'Superior',
    href: '#',
    priceMonthly: 8,
    priceAnnually: 6,
    description: 'For creators with multiple ideas who want to efficiently test and refine them.',
    includedFeatures: [
      'All Free features',
      '5 landing pages included',
      '50,000 visits/mo',
      '1,000 conversion actions included',
      '1% payment commission',
      'Custom domain',
      'Remove EarlyBird branding'
    ]
  },
  {
    name: 'Shipper',
    href: '#',
    priceMonthly: 15,
    priceAnnually: 10,
    description: 'For productive shippers who want to work more efficiently.',
    includedFeatures: [
      'All Standard features',
      '20 landing pages included',
      '200,000 visits/mo',
      '5,000 conversion actions included',
      'No payment commission',
      'Embed custom CSS',
      'Team collaboration'
    ]
  }
]

export const PricingPlans: FC<{
  billingCycle: string
  onChange: (billingCycle: string) => void
}> = ({ billingCycle, onChange }) => {
  const { t } = useTranslation()

  function switchToMonthly() {
    onChange('monthly')
  }

  function switchToYearly() {
    onChange('yearly')
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <div className="relative self-center bg-slate-100 rounded-lg p-0.5 flex">
            <button
              type="button"
              className={clsx(
                'relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8',
                billingCycle === 'monthly'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'border-transparent text-slate-900'
              )}
              onClick={switchToMonthly}
            >
              Monthly billing
            </button>
            <button
              type="button"
              className={clsx(
                'ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8',
                billingCycle === 'yearly'
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'border-transparent text-slate-900'
              )}
              onClick={switchToYearly}
            >
              Yearly billing
            </button>
          </div>

          <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
            {tiers.map(tier => (
              <div
                key={tier.name}
                className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200"
              >
                <div className="p-6">
                  <h2 className="text-lg leading-6 font-medium text-slate-900">{tier.name}</h2>
                  <p className="mt-4 text-sm text-slate-500">{tier.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-slate-900">
                      ${billingCycle === 'monthly' ? tier.priceMonthly : tier.priceAnnually}
                    </span>{' '}
                    <span className="text-base font-medium text-slate-500">/mo</span>
                  </p>
                  <a
                    href={tier.href}
                    className="mt-8 block w-full bg-slate-200 border border-slate-100 rounded-md py-2 text-sm font-semibold text-slate-900 text-center hover:bg-slate-300"
                  >
                    Join as a {tier.name}
                  </a>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-xs font-medium text-slate-700 tracking-wide uppercase">
                    What's included
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {tier.includedFeatures.map(feature => (
                      <li key={feature} className="flex space-x-3">
                        <IconCheck
                          className="flex-shrink-0 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-slate-700">{feature}</span>
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
