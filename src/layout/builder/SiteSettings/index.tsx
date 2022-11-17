import { Accordion } from '@heyforms/ui'
import { IconChevronLeft } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { useProductId } from '~/layout'

import { SiteMeta } from './SiteMeta'
import { SocialMedia } from './SocialMedia'

export const SiteSettings = () => {
  const { t } = useTranslation()
  const productId = useProductId()

  return (
    <div className="site-settings fixed inset-0 w-72 h-full border-r border-slate-200">
      <div className="flex flex-col h-full">
        <div className="mt-5 px-4">
          <Link
            className="group flex items-center text-sm hover:text-blue-700"
            href={`/product/${productId}`}
          >
            <IconChevronLeft className="text-slate-500 -ml-2 group-hover:text-blue-700" />
            <span className="ml-1">{t('sidebar.dashboard')}</span>
          </Link>
        </div>
        <div className="scrollbar flex-1 mt-5 divide-y divide-slate-50 ">
          <Accordion expanded={true} text={t('builder.meta.name')}>
            <SiteMeta />
          </Accordion>
          <Accordion className="pt-2" text={t('builder.socialMedia')}>
            <SocialMedia />
          </Accordion>
        </div>
      </div>
    </div>
  )
}
