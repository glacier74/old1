import { Dropdown, Menus } from '@heyforms/ui'
import { IconBrandTwitter, IconHelp, IconMail, IconMessageDots } from '@tabler/icons'
import { useTranslation } from 'next-i18next'

import { ExternalLink } from '~/layout/product/Sidebar/SidebarNavbar'

export const HelpFloatButton = () => {
  const { t } = useTranslation()

  const Overlay = (
    <Menus className="w-[13rem] space-y-1 px-2 py-4">
      <ExternalLink
        href="https://help.earlybird.im"
        icon={IconHelp}
        title={t('sidebar.helpCenter')}
      />
      <ExternalLink
        href="https://vue.mx/discord"
        icon={IconMessageDots}
        title={t('sidebar.joinCommunity')}
      />
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
    </Menus>
  )

  return (
    <Dropdown className="fixed bottom-8 right-8" placement="top-end" overlay={Overlay}>
      <button className="p-1 rounded-full bg-white hover:bg-slate-50 hover:text-slate-800 shadow-[rgba(0,0,0,0.08)_0px_2px_4px,rgba(0,0,0,0.06)_0px_2px_12px,rgba(0,0,0,0.04)_0px_8px_14px,rgba(0,0,0,0.02)_0px_12px_16px]">
        <IconHelp className="w-6 h-6 text-slate-500" />
      </button>
    </Dropdown>
  )
}
