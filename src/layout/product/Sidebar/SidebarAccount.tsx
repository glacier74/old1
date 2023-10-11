import { Dropdown, Menus } from '@heyforms/ui'
import { date } from '@nily/utils'
import { IconChevronRight } from '@tabler/icons'
import JsCookie from 'js-cookie'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import type { FC } from 'react'

import { RoundImage } from '~/components'
import { LANGUAGE_OPTIONS } from '~/constants'
import { useStore } from '~/store'
import { setCookie } from '~/utils'

const Skeleton = () => {
  return (
    <div className="flex items-center">
      <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
      <div className="ml-3">
        <div className="h-4 my-1 rounded-sm skeleton" style={{ width: 100 }}></div>
        <div className="h-2 rounded-sm skeleton" style={{ width: 60 }}></div>
      </div>
    </div>
  )
}

// Locale cookie name
const LOCALE_COOKIE_NAME = process.env.NEXT_PUBLIC_LOCALE_COOKIE_NAME as string

export const SidebarAccount: FC = () => {
  const { t, i18n } = useTranslation('dashboard')
  const { isReady, user } = useStore()

  function handleChangeLocale(locale: string) {
    i18n.changeLanguage(locale)
    setCookie(JsCookie, LOCALE_COOKIE_NAME, locale, date.milliseconds('1year')!)
  }

  const Overlay = (
    <Menus className="bottom-12">
      <Menus.Item
        className="!p-0"
        label={
          <Link className="block px-4 py-2" href="/account">
            {t('account.heading')}
          </Link>
        }
      />
      <Menus.Item
        className="!p-0"
        label={
          <Link className="block px-4 py-2" href="/account/billing">
            {t('billing.heading')}
          </Link>
        }
      />
      <Menus.Item
        className="sidebar-submenu !p-0"
        label={
          <div className="relative group">
            <button className="w-full flex items-center justify-between px-4 py-2">
              <span>{t('sidebar.language')}</span>
              <IconChevronRight />
            </button>
            <Menus className="absolute top-0 left-[220px] w-[140px] !my-0 hidden group-hover:block">
              {LANGUAGE_OPTIONS.map(row => (
                <Menus.Item
                  key={row.value}
                  label={row.label}
                  isChecked={i18n.language === row.value}
                  onClick={() => handleChangeLocale(row.value)}
                />
              ))}
            </Menus>
          </div>
        }
      />
      <Menus.Item
        className="!p-0"
        label={
          <Link className="block px-4 py-2" href="/logout">
            {t('sidebar.logout')}
          </Link>
        }
      />
      <Menus.Divider />
      <Menus.Item
        className="text-slate-400 hover:bg-transparent cursor-default"
        label={`${t('sidebar.version')} v${process.env.NEXT_PUBLIC_APP_VERSION}`}
      />
    </Menus>
  )

  return (
    <div className="flex-shrink-0 flex px-4 py-2 bg-slate-50 border-t border-slate-200">
      {isReady ? (
        <Dropdown
          className="flex-shrink-0 group block w-full"
          placement="top-start"
          overlay={Overlay}
        >
          <div className="flex items-center cursor-pointer">
            <div>
              <RoundImage
                className="inline-block h-8 w-8"
                src={user?.avatar}
                imageSize={32}
                size={32}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-700 truncate group-hover:text-slate-900">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500 group-hover:text-slate-700">
                {t('sidebar.viewProfile')}
              </p>
            </div>
          </div>
        </Dropdown>
      ) : (
        <Skeleton />
      )}
    </div>
  )
}
