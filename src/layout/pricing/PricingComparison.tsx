import { IconCheck, IconMinus } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, Fragment } from 'react'

export const PLAN_TIERS = [
  {
    id: 'plan_free',
    name: 'Starter',
    href: '/sign-up',
    priceMonthly: 5,
    priceAnnually: 4,
    description: 'For new makers who want to fine-tune and test an idea.'
  },
  {
    id: 'plan_superior',
    name: 'Superior',
    href: '/sign-up',
    priceMonthly: 15,
    priceAnnually: 12,
    description: 'For creators with multiple ideas who want to efficiently test and refine them.'
  },
  {
    id: 'plan_shipper',
    name: 'Shipper',
    href: '/sign-up',
    priceMonthly: 39,
    priceAnnually: 32,
    description: 'For productive shippers who want to work more efficiently.'
  }
]

const sections = [
  {
    name: 'Build',
    features: [
      { name: 'Landing page(s)', tiers: { Starter: '1', Superior: '5', Shipper: '20' } },
      {
        name: 'Monthly visits',
        tiers: { Starter: '1,000', Superior: '50,000', Shipper: '200,000' }
      },
      { name: 'Access to all UI blocks', tiers: { Starter: true, Superior: true, Shipper: true } },
      { name: 'Unlimited blocks', tiers: { Starter: true, Superior: true, Shipper: true } },
      { name: 'Text formatting', tiers: { Starter: true, Superior: true, Shipper: true } },
      { name: 'Responsive layout', tiers: { Starter: true, Superior: true, Shipper: true } },
      { name: 'Full SEO control', tiers: { Starter: false, Superior: true, Shipper: true } },
      { name: 'Private mode', tiers: { Starter: false, Superior: true, Shipper: true } }
    ]
  },
  {
    name: 'Market',
    features: [
      { name: 'Custom branding', tiers: { Starter: true, Superior: true, Shipper: true } },
      { name: 'Custom Open Graph', tiers: { Starter: true, Superior: true, Shipper: true } },
      { name: 'Collect social proof', tiers: { Starter: true, Superior: true, Shipper: true } },
      {
        name: 'Remove EarlyBird branding',
        tiers: { Starter: false, Superior: true, Shipper: true }
      },
      { name: 'Custom domain', tiers: { Starter: false, Superior: true, Shipper: true } },
      { name: 'Embed Custom CSS', tiers: { Starter: false, Superior: false, Shipper: true } }
    ]
  },
  {
    name: 'Validate',
    features: [
      { name: 'Conversion action', tiers: { Starter: '100', Superior: '1,000', Shipper: '5,000' } },
      {
        name: 'Accept payments',
        tiers: {
          Starter: '5% commission + Stripe fee',
          Superior: '1% commission + Stripe fee',
          Shipper: 'Stripe fee only'
        }
      },
      { name: 'Real-time analytics', tiers: { Starter: true, Superior: true, Shipper: true } },
      { name: 'Understand interests', tiers: { Starter: true, Superior: true, Shipper: true } },
      { name: 'Collect feedback', tiers: { Starter: true, Superior: true, Shipper: true } },
      { name: 'Quick polls', tiers: { Starter: true, Superior: true, Shipper: true } }
    ]
  },
  {
    name: 'Other',
    features: [
      { name: 'Web hosting', tiers: { Starter: true, Superior: true, Shipper: true } },
      { name: 'Automatic SSL', tiers: { Starter: true, Superior: true, Shipper: true } },
      { name: 'Priority support', tiers: { Starter: false, Superior: true, Shipper: true } },
      { name: 'Team collaboration', tiers: { Starter: false, Superior: false, Shipper: true } }
    ]
  }
]

export const PricingComparisonSections: FC = () => {
  return (
    <>
      {sections.map(section => (
        <Fragment key={section.name}>
          <tr>
            <th
              className="bg-slate-100 py-4 pl-6 text-base font-medium text-slate-900 text-left"
              colSpan={4}
              scope="colgroup"
            >
              {section.name}
            </th>
          </tr>
          {section.features.map((feature: any) => (
            <tr key={feature.name}>
              <th className="py-4 px-6 text-sm font-normal text-slate-700 text-left" scope="row">
                {feature.name}
              </th>
              {PLAN_TIERS.map(tier => (
                <td key={tier.name} className="py-4 px-6">
                  {typeof feature.tiers[tier.name] === 'string' ? (
                    <span className="block text-sm text-slate-500">{feature.tiers[tier.name]}</span>
                  ) : (
                    <>
                      {feature.tiers[tier.name] === true ? (
                        <IconCheck className="h-5 w-5 text-green-500" aria-hidden="true" />
                      ) : (
                        <IconMinus className="h-5 w-5 text-slate-400" aria-hidden="true" />
                      )}

                      <span className="sr-only">
                        {feature.tiers[tier.name] === true ? 'Included' : 'Not included'} in{' '}
                        {tier.name}
                      </span>
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </Fragment>
      ))}
    </>
  )
}

export const PricingComparison: FC<{
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
    <section className="hidden lg:block">
      <div className="max-w-7xl mx-auto py-16 sm:py-48 sm:px-6 lg:px-8">
        <h2 className="max-w-3xl mx-auto text-slate-900 font-bold text-5xl text-center">
          Compare Plans
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-center text-slate-700 text-xl">
          Whether you're building a tiny project or managing multiple products, we have an
          affordable plan that meets your needs.
        </p>

        {/* lg+ only */}
        <div className="mt-24">
          <table className="w-full h-px table-fixed">
            <caption className="sr-only">Pricing plan comparison</caption>
            <thead>
              <tr>
                <th className="pb-4 px-6 text-sm font-medium text-slate-700 text-left" scope="col">
                  <span className="sr-only">Feature by</span>
                  <span>Plans</span>
                </th>
                {PLAN_TIERS.map(tier => (
                  <th
                    key={tier.name}
                    className="w-1/4 pb-4 px-6 text-lg leading-6 font-bold text-slate-700 text-left"
                    scope="col"
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-t border-slate-200 divide-y divide-slate-200">
              <tr>
                <th
                  className="py-4 px-6 text-sm font-medium text-slate-700 text-left align-top"
                  scope="row"
                >
                  <div>Pricing</div>
                  <div className="mt-4 relative self-center bg-slate-200 rounded-full p-0.5 flex">
                    <button
                      type="button"
                      className={clsx(
                        'relative w-1/2 rounded-full py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-4',
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
                        'ml-0.5 relative w-1/2 border rounded-full py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-4',
                        billingCycle === 'yearly'
                          ? 'bg-slate-50 border-slate-50 text-slate-900 shadow-sm'
                          : 'border-transparent text-slate-900'
                      )}
                      onClick={switchToYearly}
                    >
                      Annually
                    </button>
                  </div>
                </th>
                {PLAN_TIERS.map(tier => (
                  <td key={tier.name} className="h-full py-4 px-6 align-top">
                    <div className="relative h-full table">
                      <p>
                        <span className="text-4xl font-extrabold text-slate-900">
                          ${billingCycle === 'monthly' ? tier.priceMonthly : tier.priceAnnually}
                        </span>{' '}
                        <span className="text-base font-medium text-slate-500">/mo</span>
                      </p>
                      <p className="mt-4 mb-16 text-base text-slate-500 leading-tight">
                        {tier.description}
                      </p>
                      <a
                        href={tier.href}
                        className="absolute bottom-0 flex-grow block w-full bg-slate-900 rounded-full 5 py-2 text-sm font-semibold text-white text-center"
                      >
                        Join as a {tier.name}
                      </a>
                    </div>
                  </td>
                ))}
              </tr>
              <PricingComparisonSections />
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-200">
                <th className="sr-only" scope="row">
                  Choose your plan
                </th>
                {PLAN_TIERS.map(tier => (
                  <td key={tier.name} className="pt-5 px-6">
                    <a
                      href={tier.href}
                      className="block w-full bg-slate-900 rounded-full py-2 text-sm font-semibold text-white text-center"
                    >
                      Join as a {tier.name}
                    </a>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  )
}
