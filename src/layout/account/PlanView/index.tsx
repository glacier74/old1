import { PLAN_TIERS, PricingComparisonSections } from '~/layout/pricing'

import { PlanHeader } from './PlanHeader'

export const PlanView = () => {
  return (
    <table className="w-full mt-12 table-fixed">
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
        <PlanHeader />
        <PricingComparisonSections />
      </tbody>
    </table>
  )
}
