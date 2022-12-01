import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { BlockCardList } from './BlockCardList'
import { InsertDropdown } from './InsertDropdown'

export const Sidebar: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="builder-sidebar flex flex-col w-64 h-full bg-white border-r border-gray-200">
      <div className="flex items-center justify-between p-4">
        <div className="text-sm font-medium">{t('builder.blocks')}</div>
        <InsertDropdown />
      </div>

      <BlockCardList />
    </div>
  )
}
