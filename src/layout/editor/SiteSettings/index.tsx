import { Accordion, Button } from '@heyforms/ui'
import { IconChevronLeft } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { SiteMeta } from './SiteMeta'
import { SocialMedia } from './SocialMedia'

export const SiteSettings = () => {
  const { t } = useTranslation()

  return (
    <div className="site-settings fixed inset-0 w-72 h-full border-r border-slate-200">
      <div className="flex flex-col h-full">
        <div className="mt-5 px-4">
          <Button.Link leading={<IconChevronLeft />}>{t('sidebar.dashboard')}</Button.Link>
        </div>
        <div className="scrollbar flex-1 mt-5 divide-y divide-slate-50 ">
          <Accordion expanded={true} text={t('editor.meta')}>
            <SiteMeta />
          </Accordion>
          <Accordion className="pt-2" text={t('editor.socialMedia')}>
            <SocialMedia />
          </Accordion>
        </div>
      </div>
    </div>
  )
}
