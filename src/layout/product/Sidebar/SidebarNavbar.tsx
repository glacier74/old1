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
  IconMessageDots,
  IconNotes,
  IconSettings,
  IconUsers,
  TablerIconProps
} from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import type { FC } from 'react'
import { useMemo } from 'react'

import { useProductId } from '~/layout'
import { useStore } from '~/store'
import { urlBuilder } from '~/utils'

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
      rel="noreferrer"
    >
      <Icon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
      <span className="truncate">{title}</span>
    </a>
  )
}

const NavLink = ({ icon: Icon, href, title }: ExternalLinkProps) => {
  return (
    <Link
      href={href}
      className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md"
    >
      <Icon className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
      <span className="truncate">{title}</span>
    </Link>
  )
}

export const SidebarNavbar: FC<SidebarNavProps> = ({ isMobile = false }) => {
  const { t } = useTranslation()
  const productId = useProductId()
  const { user, openMemberList } = useStore()

  const crispLink = useMemo(() => {
    return urlBuilder('https://go.crisp.chat/chat/embed/', {
      website_id: 'd57ec6f7-1ed8-4b02-bd44-add83a2eff72',
      user_email: user?.email,
      user_nickname: user?.name
    })
  }, [user?.email, user?.name])

  function handleCloseSidebar() {
    //
  }

  return (
    <nav className="sidebar-nav scrollbar flex-1 mt-5 px-2 pb-4 space-y-8">
      {/* Product links */}
      <div className="space-y-1">
        <NavLink href={`/product/${productId}`} icon={IconHome2} title={t('sidebar.dashboard')} />
        <NavLink
          href={`/product/${productId}/engagements`}
          icon={IconDatabase}
          title={t('sidebar.engagements')}
        />
        <NavLink
          href={`/product/${productId}/integrations`}
          icon={IconBolt}
          title={t('sidebar.integrate')}
        />
        <div
          className="text-slate-700 hover:bg-slate-200 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md cursor-pointer"
          onClick={openMemberList}
        >
          <IconUsers className="text-slate-700 mr-3 flex-shrink-0 h-5 w-5" />
          <span className="truncate">{t('sidebar.members')}</span>
        </div>
        <NavLink
          href={`/product/${productId}/settings`}
          icon={IconSettings}
          title={t('sidebar.productSettings')}
        />
        {/*<NavLink href={`/product/${productId}`} icon={IconBolt} title={t('sidebar.pro')} />*/}
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
            href="https://help.earlybird.im/create-a-landing-page/"
            icon={IconLocation}
            title={t('sidebar.gettingStarted')}
          />
          <ExternalLink
            href="https://earlybird.im/blog/tag/changelog/"
            icon={IconGift}
            title={t('sidebar.whatsNew')}
          />
          <ExternalLink
            href="https://help.earlybird.im/roadmap/"
            icon={IconMap}
            title={t('sidebar.roadmap')}
          />
          <ExternalLink
            href="https://earlybird.im/blog"
            icon={IconNotes}
            title={t('sidebar.blog')}
          />
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
            href="https://help.earlybird.im"
            icon={IconHelp}
            title={t('sidebar.helpCenter')}
          />
          <ExternalLink href={crispLink} icon={IconMessageDots} title={t('sidebar.chatWithUs')} />
          <ExternalLink
            href="mailto:support@earlybird.im"
            icon={IconMail}
            title={t('sidebar.sendEmail')}
          />
          <ExternalLink
            href="https://twitter.com/earlybirdim"
            icon={IconBrandTwitter}
            title={t('sidebar.twitter')}
          />
        </div>
      </div>
    </nav>
  )
}
