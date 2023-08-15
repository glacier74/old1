import { FC } from 'react'

import { IntegrationsCat_Data } from './IntegrationsCat_Data'
import { IntegrationsCat_Items } from './IntegrationsCat_Items'

interface Props {
  categories: string[]
  category?: string
  groups: Array<{
    category: string
    records: IntegrationRecord[]
  }>
}

export const IntegrationsCat: FC<Props> = ({ categories, category, groups }) => {
  return (
    <section className="max-w-7xl mx-auto flex sm:flex-row flex-col xl:px-24 sm:px-12 px-6 md:py-14 py-12 gap-2">
      <IntegrationsCat_Items categories={categories} category={category} />
      <IntegrationsCat_Data groups={groups} />
    </section>
  )
}
