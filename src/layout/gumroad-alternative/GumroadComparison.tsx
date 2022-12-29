import { IconCheck, IconMinus } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { Fragment } from 'react'

const brands = [
  {
    name: 'EarlyBird'
  },
  {
    name: 'Gumroad'
  }
]

const comparisonTable = [
  {
    features: [
      {
        name: 'Pricing and transaction fees',
        brands: {
          EarlyBird:
            'Starter subscription at $0 /mo platform fee and 5% commission rate (plus stripe fees)',
          Gumroad: '10% for all creators who use Gumroad and payment processing fees'
        }
      },
      { name: 'UI Blocks', brands: { EarlyBird: '✅ Yes', Gumroad: '❌ No' } },
      { name: 'Rich text editor', brands: { EarlyBird: '✅ Yes', Gumroad: '✅ Yes' } },
      {
        name: 'Custom Design',
        brands: { EarlyBird: '✅ Yes', Gumroad: '❌ No' }
      },
      { name: 'Custom Domain', brands: { EarlyBird: '✅ Yes', Gumroad: '❌ No' } },
      { name: 'Send files', brands: { EarlyBird: '✅ Yes', Gumroad: '✅ Yes' } },
      { name: 'Collect feedback', brands: { EarlyBird: '✅ Yes', Gumroad: '✅ Yes' } },
      { name: 'Quick Polls', brands: { EarlyBird: '✅ Yes', Gumroad: '❌ No' } },
      {
        name: 'Comprehensive Analytics',
        brands: { EarlyBird: '✅ Yes, muchos data', Gumroad: '❌ No, only sales analytics' }
      },
      { name: 'SEO control', brands: { EarlyBird: '✅ Yes', Gumroad: '❌ No' } },
      { name: 'Open Graph control', brands: { EarlyBird: '✅ Yes', Gumroad: '❌ No' } },
      { name: 'Private mode', brands: { EarlyBird: '✅ Yes', Gumroad: '❌ No' } },
      {
        name: 'Team collaboration',
        brands: {
          EarlyBird: '✅ Yes, as a team member. Available in Shipper tier.',
          Gumroad: '❌ No'
        }
      },
      {
        name: 'Payout Time',
        brands: { EarlyBird: '⌛  According to Stripe settings', Gumroad: '⌛  Weekly' }
      }
    ]
  }
]

export const GumroadComparison: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-emerald-100 py-24 lg:py-32 px-8 md:px-0">
      <div className="max-w-7xl mx-auto">
        <h2 className="mb-6 text-4xl font-bold">Why use EarlyBird?</h2>
        <div className="text text-xl mt-4 max-w-screen-lg leading-relaxed">
          <p>
            EarlyBird offers more advanced features and customization options, making it easier for
            you to sell your products and stand out from the competition. With competitive pricing
            and no hidden fees, EarlyBird is a great value for digital product creators. Here's a
            no-BS overview.
          </p>
        </div>

        <div className="mt-24">
          <table className="w-full h-px table-fixed">
            <caption className="sr-only">EarlyBird vs Gumroad</caption>
            <thead>
              <tr>
                <th className="pb-4 px-6 text-sm font-medium text-slate-700 text-left" scope="col">
                  <span className="sr-only">Feature by</span>
                </th>

                {brands.map(brand => (
                  <th
                    key={brand.name}
                    className="w-1/3 pb-4 px-6 text-lg leading-6 font-bold text-slate-900 text-left"
                    scope="col"
                  >
                    {brand.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-t border-slate-700 divide-y divide-slate-700">
              {comparisonTable.map(section => (
                <Fragment>
                  {section.features.map((feature: any) => (
                    <tr key={feature.name}>
                      <th
                        className="py-5 px-6 text-base font-normal text-slate-900 text-left"
                        scope="row"
                      >
                        {feature.name}
                      </th>
                      {brands.map(brand => (
                        <td key={brand.name} className="py-5 px-6">
                          {typeof feature.brands[brand.name] === 'string' ? (
                            <span className="block text-base text-slate-900">
                              {feature.brands[brand.name]}
                            </span>
                          ) : (
                            <>
                              {feature.brands[brand.name] === true ? (
                                <IconCheck className="h-5 w-5 text-green-500" aria-hidden="true" />
                              ) : (
                                <IconMinus className="h-5 w-5 text-slate-400" aria-hidden="true" />
                              )}

                              <span className="sr-only">
                                {feature.brands[brand.name] === true ? 'Included' : 'Not included'}{' '}
                                in {brand.name}
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
          </table>
        </div>
      </div>
    </section>
  )
}
