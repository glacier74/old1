import { Dropdown, Menus, Tooltip } from '@heyforms/ui'
import {
  IconBrandTwitter,
  IconHelp,
  IconMail,
  IconMessageDots,
  TablerIconProps
} from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

interface LinkButtonProps {
  icon: FC<TablerIconProps>
  href: string
  title: string
}

const LinkButton = ({ icon: Icon, href, title }: LinkButtonProps) => {
  function handleClick() {
    window.open(href)
  }

  return (
    <button
      type="button"
      className="w-full text-slate-800 hover:bg-slate-100 hover:text-slate-900 group flex items-center px-2 py-1 text-sm rounded-md"
      onClick={handleClick}
    >
      <Icon className="text-slate-800 mr-3 flex-shrink-0 h-5 w-5" />
      <span className="truncate">{title}</span>
    </button>
  )
}

export const HelpFloatButton: FC<ComponentProps> = ({ className, ...restProps }) => {
  const { t } = useTranslation()

  const Overlay = (
    <Menus className="w-[13rem] space-y-1 px-2 py-4">
      <LinkButton
        href="https://help.earlybird.im/?ref=floatButton"
        icon={IconHelp}
        title={t('sidebar.helpCenter')}
      />
      <LinkButton
        href="https://discord.gg/S6sbYd5h8G"
        icon={IconMessageDots}
        title={t('sidebar.joinCommunity')}
      />
      <LinkButton
        href="mailto:support@earlybird.im"
        icon={IconMail}
        title={t('sidebar.sendEmail')}
      />
      <LinkButton
        href="https://twitter.com/earlybirdim"
        icon={IconBrandTwitter}
        title={t('sidebar.twitter')}
      />
    </Menus>
  )

  return (
    <Tooltip ariaLabel="Help">
      <div className={clsx('fixed bottom-8 right-8 z-20', className)}>
        <Dropdown placement="top-end" overlay={Overlay} {...restProps}>
          <button
            className="p-1.5 md:p-1 rounded-full bg-white hover:bg-slate-100 hover:text-slate-900 shadow-[rgba(0,0,0,0.08)_0px_2px_4px,rgba(0,0,0,0.06)_0px_2px_12px,rgba(0,0,0,0.04)_0px_8px_14px,rgba(0,0,0,0.02)_0px_12px_16px]"
            role="button"
            aria-label="Help Button"
          >
            <IconHelp className="w-6 h-6 text-slate-600" />
          </button>
        </Dropdown>
      </div>
    </Tooltip>
  )
}
