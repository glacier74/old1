import { Button } from '@heyforms/ui'
import { IconChevronLeft } from '@tabler/icons'
import { useTranslation } from 'next-i18next'

export const SiteSettings = () => {
  const { t } = useTranslation()

  return (
    <div className="sidebar fixed inset-0 hidden md:flex md:flex-shrink-0">
      <div className="relative w-64 h-full bg-slate-100">
        <div className="flex flex-1 flex-col h-0 pt-5">
          <div className="px-4">
            <Button.Link leading={<IconChevronLeft />}>{t('sidebar.dashboard')}</Button.Link>
          </div>
          <div className="scrollbar flex-1 mt-5 px-2 pb-4 space-y-8"></div>
        </div>
      </div>
    </div>
  )
}
