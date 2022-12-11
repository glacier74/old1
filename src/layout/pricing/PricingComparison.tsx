import { useTranslation } from 'next-i18next'
import { Fragment } from 'react'
import { IconCheck, IconMinus } from '@tabler/icons'
import Link from 'next/link'
import { FC } from 'react'

const tiers = [
    { name: 'Basic', href: '#', priceMonthly: 9, description: 'Quis suspendisse ut fermentum neque vivamus non tellus.' },
    {
        name: 'Essential',
        href: '#',
        priceMonthly: 29,
        description: 'Quis eleifend a tincidunt pellentesque. A tempor in sed.',
    },
    {
        name: 'Premium',
        href: '#',
        priceMonthly: 59,
        description: 'Orci volutpat ut sed sed neque, dui eget. Quis tristique non.',
    },
]

const sections = [
    {
      name: 'Features',
      features: [
        { name: 'Molestie lobortis massa.', tiers: { Basic: true, Essential: true, Premium: true } },
        { name: 'Urna purus felis.', tiers: { Basic: true, Essential: true, Premium: true } },
        { name: 'Tellus pulvinar sit dictum.', tiers: { Essential: true, Premium: true } },
        { name: 'Convallis.', tiers: { Essential: 'Up to 20 users', Premium: 'Up to 50 users' } },
      ],
    },
    {
      name: 'Reporting',
      features: [
        { name: 'Adipiscing.', tiers: { Basic: true, Essential: true, Premium: true } },
        { name: 'Eget risus integer.', tiers: { Essential: true, Premium: true } },
        { name: 'Gravida leo urna velit.', tiers: { Premium: true } },
        { name: 'Elementum ut dapibus mi feugiat cras nisl.', tiers: { Premium: true } },
      ],
    },
    {
      name: 'Support',
      features: [
        { name: 'Sit dignissim.', tiers: { Basic: true, Essential: true, Premium: true } },
        { name: 'Congue at nibh et.', tiers: { Essential: true, Premium: true } },
        { name: 'Volutpat feugiat mattis.', tiers: { Essential: true, Premium: true } },
        { name: 'Tristique pellentesque ornare diam sapien.', tiers: { Premium: true } },
      ],
    },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }  

export const PricingComparison: FC = () => {
  const { t } = useTranslation()

  return (
    <section>
      <div className="max-w-7xl mx-auto py-16 sm:py-48 sm:px-6 lg:px-8">

        <h2 className="max-w-3xl mx-auto text-white font-extrabold text-5xl text-center">Compare Plans</h2>
        <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-slate-400">Whether you're building a tiny project or managing multiple products, we have an affordable plan that meets your needs.</p>

        {/* lg+ only */}
        <div className="mt-24 hidden lg:block">
          <table className="w-full h-px table-fixed">
            <caption className="sr-only">Pricing plan comparison</caption>
            <thead>
              <tr>
                <th className="pb-4 px-6 text-sm font-medium text-white text-left" scope="col">
                  <span className="sr-only">Feature by</span>
                  <span>Plans</span>
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.name}
                    className="w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-white text-left"
                    scope="col"
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-t border-slate-700 divide-y divide-slate-700">
              <tr>
                <th className="py-8 px-6 text-sm font-medium text-white text-left align-top" scope="row">
                  Pricing
                </th>
                {tiers.map((tier) => (
                  <td key={tier.name} className="h-full py-8 px-6 align-top">
                    <div className="relative h-full table">
                      <p>
                        <span className="text-4xl font-extrabold text-white">${tier.priceMonthly}</span>{' '}
                        <span className="text-base font-medium text-slate-400">/mo</span>
                      </p>
                      <p className="mt-4 mb-16 text-sm text-slate-400">{tier.description}</p>
                      <a
                        href={tier.href}
                        className="absolute bottom-0 flex-grow block w-full bg-green-500 border border-green-500 rounded-md 5 py-2 text-sm font-semibold text-white text-center hover:bg-green-600"
                      >
                        Buy {tier.name}
                      </a>
                    </div>
                  </td>
                ))}
              </tr>
              {sections.map((section) => (
                <Fragment key={section.name}>
                  <tr>
                    <th
                      className="bg-slate-700 py-3 pl-6 text-sm font-medium text-white text-left"
                      colSpan={4}
                      scope="colgroup"
                    >
                      {section.name}
                    </th>
                  </tr>
                  {section.features.map((feature) => (
                    <tr key={feature.name}>
                      <th className="py-5 px-6 text-sm font-normal text-slate-400 text-left" scope="row">
                        {feature.name}
                      </th>
                      {tiers.map((tier) => (
                        <td key={tier.name} className="py-5 px-6">
                          {typeof feature.tiers[tier.name] === 'string' ? (
                            <span className="block text-sm text-slate-400">{feature.tiers[tier.name]}</span>
                          ) : (
                            <>
                              {feature.tiers[tier.name] === true ? (
                                <IconCheck className="h-5 w-5 text-green-500" aria-hidden="true" />
                              ) : (
                                <IconMinus className="h-5 w-5 text-slate-400" aria-hidden="true" />
                              )}

                              <span className="sr-only">
                                {feature.tiers[tier.name] === true ? 'Included' : 'Not included'} in {tier.name}
                              </span>
                            </>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-700">
                <th className="sr-only" scope="row">
                  Choose your plan
                </th>
                {tiers.map((tier) => (
                  <td key={tier.name} className="pt-5 px-6">
                    <a
                      href={tier.href}
                      className="block w-full bg-green-500 border border-green-500 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-green-600"
                    >
                      Buy {tier.name}
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
