import { IconChevronLeft } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

import { useProductId } from '~/layout'

import { BlockCardList } from './BlockCardList'
import { InsertDropdown } from './InsertDropdown'

export const Sidebar: FC = () => {
  const { t } = useTranslation()
  const productId = useProductId()

  return (
    <div className="builder-sidebar fixed inset-0 flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-between p-4">
        <Link
          className="group flex items-center text-sm hover:text-green-500"
          href={`/product/${productId}`}
        >
          <IconChevronLeft className="w-5 h-5 text-slate-500 -ml-1 group-hover:text-green-500" />
          <span className="ml-1">{t('sidebar.dashboard')}</span>
        </Link>

        <InsertDropdown />
      </div>

      <BlockCardList />
    </div>
  )
}
