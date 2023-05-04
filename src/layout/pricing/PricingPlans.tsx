import { IconCheck } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC, useState } from 'react'

const tiers = [
  {
    name: 'Starter',
    href: '/sign-up',
    priceMonthly: 5,
    priceAnnually: 4,
    description: 'For new makers who want to fine-tune and test an idea.',
    includedFeatures: [
      '1 landing page',
      '1,000 visits/mo',
      'Up to 100 conversions/mo',
      '5% payment commission',
      'Custom domain',
      'Real-time analytics'
    ]
  },
  {
    name: 'Superior',
    href: '/sign-up',
    priceMonthly: 15,
    priceAnnually: 12,
    description: 'For creators who want to efficiently test and refine multiple ideas.',
    includedFeatures: [
      'Up to 5 landing pages',
      '50,000 visits/mo',
      'Up to 1,000 conversions/mo',
      '1% payment commission',
      'Access to all templates',
      'Private mode',
      'Remove EarlyBird branding'
    ]
  },
  {
    name: 'Shipper',
    href: '/sign-up',
    priceMonthly: 39,
    priceAnnually: 32,
    description: 'For productive shippers who want to work more efficiently.',
    includedFeatures: [
      'Up to 20 landing pages',
      '200,000 visits/mo',
      'Up to 5,000 conversions/mo',
      'No payment commission',
      'Embed custom code',
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
          <div className="relative self-center bg-slate-200 rounded-full p-0.5 flex">
            <button
              type="button"
              className={clsx(
                'relative w-1/2 rounded-full py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8',
                billingCycle === 'monthly'
                  ? 'bg-slate-50 border-slate-50 text-slate-900 shadow-sm'
                  : 'border-transparent text-slate-900'
              )}
              onClick={switchToMonthly}
            >
              Monthly
            </button>
            <button
              type="button"
              className={clsx(
                'ml-0.5 relative w-1/2 border rounded-full py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8',
                billingCycle === 'yearly'
                  ? 'bg-slate-50 border-slate-50 text-slate-900 shadow-sm'
                  : 'border-transparent text-slate-900'
              )}
              onClick={switchToYearly}
            >
              Annually
            </button>
          </div>

          <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 w-full xl:grid-cols-3">
            {tiers.map(tier => (
              <div
                key={tier.name}
                className={clsx('border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200', {'bgSuperior border-cyan-400': tier.name === 'Superior'})}                
              >
                <div className="px-8 py-16">
                  <h2 className="text-2xl leading-6 font-bold text-slate-900">{tier.name}</h2>
                  <p className="mt-4 text-base text-slate-700 leading-tight">{tier.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                      ${billingCycle === 'monthly' ? tier.priceMonthly : tier.priceAnnually}
                    </span>{' '}
                    <span className="text-base font-medium text-slate-500">/mo</span>

                    {tier.name === 'Superior' && billingCycle === 'monthly' && (
                      <span className="ml-2 text-sky-700 text-sm font-medium">(roughly $3/mo/page)</span>
                    )}
                    {tier.name === 'Shipper' && billingCycle === 'monthly' &&(
                      <span className="ml-2 text-sky-700 text-sm font-medium">(roughly $1.95/mo/page)</span>
                    )}
                    {tier.name === 'Superior' && billingCycle === 'yearly' &&(
                      <span className="ml-2 text-sky-700 text-sm font-medium">(roughly $2.4/mo/page)</span>
                    )}
                    {tier.name === 'Shipper' && billingCycle === 'yearly' && (
                      <span className="ml-2 text-sky-700 text-sm font-medium">(roughly $1.6/mo/page)</span>
                    )}
                  </p>
                  <a
                    href={tier.href}
                    className="mt-8 block w-full bg-slate-900 rounded-full py-2 text-sm font-semibold text-white text-center"
                  >
                    Join as a {tier.name}
                  </a>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                    What's included
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {tier.includedFeatures.map(feature => (
                      <li key={feature} className="flex space-x-3">
                        <IconCheck
                          className="flex-shrink-0 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        <span className="text-base text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16 text-xl font-medium">Just getting started? <a href="/sign-up" className="underline">Try EarlyBird out for free</a>, forever (yes really)!</div>

          <div className="mt-16 sm:flex sm:justify-between bg-lime-50 rounded-lg shadow-sm px-4 sm:px-16 py-16">
            <div className="px-4">
              <h3 className="text-4xl font-bold mb-4">Looking for custom plans?</h3>
              <div className="max-w-xl text-lg text-slate-700">If you require higher limits on landing pages, traffic and conversions or need a customized landing page design, feel free to get in touch with us for custom pricing.</div>
            </div>
            <div className="px-4 self-center mt-8 sm:mt-0">
              <a href="mailto:support@earlybird.im" className="px-6 py-4 bg-slate-900 text-slate-50 font-bold rounded-full">Contact us</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
