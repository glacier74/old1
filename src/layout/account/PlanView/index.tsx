import { usePlans } from '~/layout'
import { PricingComparisonSections } from '~/layout/pricing'

import { PlanHeader } from './PlanHeader'

export const PlanView = () => {
  const plans = usePlans()

  return (
    <table className="w-full mt-12 lg:table-fixed">
      <thead>
        <tr>
          <th className="pb-4 px-6 text-sm font-medium text-slate-700 text-left" scope="col">
            <span className="sr-only">Feature by</span>
            <span>Plans</span>
          </th>
          {plans.map(tier => (
            <th
              key={tier.name}
              className="w-1/5 pb-4 px-6 text-lg leading-6 font-bold text-slate-700 text-left"
              scope="col"
            >
              {tier.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="border-t border-slate-200 divide-y divide-slate-200">
        <PlanHeader />
        <PricingComparisonSections />
      </tbody>
    </table>
  )
}
