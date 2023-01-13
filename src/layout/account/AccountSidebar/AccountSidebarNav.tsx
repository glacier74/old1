import { IconChevronLeft, IconCreditCard, TablerIconProps } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import type { FC } from 'react'

import { IconPlan, IconUser } from '~/components'

interface SidebarNavProps {
  isMobile?: boolean
}

interface ExternalLinkProps {
  icon: FC<TablerIconProps>
  href: string
  title: string
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

export const AccountSidebarNav: FC<SidebarNavProps> = ({ isMobile = false }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col flex-1">
      <div className="pl-5">
        <Link
          className="flex items-center text-base -ml-2 pl-1 pr-3 py-1.5 hover:text-slate-900"
          href="/"
        >
          <IconChevronLeft className="w-5 h-5 text-slate-500" />
          <span className="ml-1">Dashboard</span>
        </Link>
      </div>

      <nav className="sidebar-nav scrollbar flex-1 mt-5 px-2 pb-4 space-y-1">
        <NavLink href="/account" icon={IconUser} title={t('account.heading')} />
        <NavLink href="/account/plan" icon={IconPlan} title={t('plan.heading')} />
        <NavLink href="/account/billing" icon={IconCreditCard} title={t('billing.heading')} />
        {/*<NavLink*/}
        {/*  href="/account/apps/connected"*/}
        {/*  icon={IconApiApp}*/}
        {/*  title={t('connectedApps.heading')}*/}
        {/*/>*/}
      </nav>
    </div>
  )
}
