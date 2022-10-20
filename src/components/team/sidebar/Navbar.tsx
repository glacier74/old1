import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IconBolt,
  IconBrandTwitter,
  IconDatabase,
  IconGift,
  IconHelp,
  IconHome2,
  IconLocation,
  IconMail,
  IconMap,
  IconNotes,
  IconPlug,
  IconSettings,
  IconUsers,
  TablerIconProps
} from '@tabler/icons'

interface SidebarNavProps {
  isMobile?: boolean
}

interface ExternalLinkProps {
  icon: FC<TablerIconProps>
  href: string
  title: string
}

const ExternalLink = ({ icon: Icon, href, title }: ExternalLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md"
    >
      <Icon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
      <span className="truncate">{title}</span>
    </a>
  )
}

export const Navbar: FC<SidebarNavProps> = ({ isMobile = false }) => {
  const { t } = useTranslation()

  function handleCloseSidebar() {}

  return (
    <nav className="sidebar-nav scrollbar flex-1 mt-5 px-2 pb-4 space-y-8">
      {/* Product links */}
      <div className="space-y-1">
        <div className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md">
          <IconHome2 className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
          {t('sidebar.dashboard')}
        </div>
        <div className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md">
          <IconDatabase className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
          {t('sidebar.engagements')}
        </div>
        <div className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md">
          <IconPlug className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
          {t('sidebar.integrate')}
        </div>
        <div className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md">
          <IconUsers className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
          {t('sidebar.members')}
        </div>
        <div className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md">
          <IconSettings className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
          {t('sidebar.productSettings')}
        </div>
        <div className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md">
          <IconBolt className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
          {t('sidebar.pro')}
        </div>
      </div>

      {/* Resources links */}
      <div>
        <h3
          className="px-2 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider"
          id="resources-headline"
        >
          {t('sidebar.resources')}
        </h3>
        <div className="mt-1 space-y-1" aria-labelledby="resources-headline">
          <ExternalLink
            href="https://earlybird.im"
            icon={IconLocation}
            title={t('sidebar.gettingStarted')}
          />
          <ExternalLink href="https://earlybird.im" icon={IconGift} title={t('sidebar.whatsNew')} />
          <ExternalLink href="https://earlybird.im" icon={IconMap} title={t('sidebar.roadmap')} />
          <ExternalLink href="https://earlybird.im" icon={IconNotes} title={t('sidebar.blog')} />
        </div>
      </div>

      {/* Help & Support links */}
      <div>
        <h3
          className="px-2 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider"
          id="resources-headline"
        >
          {t('sidebar.helpSupport')}
        </h3>
        <div className="mt-1 space-y-1" aria-labelledby="resources-headline">
          <ExternalLink
            href="https://earlybird.im"
            icon={IconHelp}
            title={t('sidebar.helpCenter')}
          />
          <ExternalLink
            href="https://earlybird.im"
            icon={IconMail}
            title={t('sidebar.sendEmail')}
          />
          <ExternalLink
            href="https://earlybird.im"
            icon={IconBrandTwitter}
            title={t('sidebar.twitter')}
          />
        </div>
      </div>
    </nav>
  )
}
