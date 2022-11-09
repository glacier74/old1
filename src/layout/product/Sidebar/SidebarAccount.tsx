import { Dropdown, Menus } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import { RoundImage } from '~/components'
import { AuthService } from '~/service'
import { useStore } from '~/store'

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

export const SidebarAccount: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isReady, user, openAccountSettings } = useStore()

  async function handleMenuClick(name?: any) {
    switch (name) {
      case 'accountSettings':
        openAccountSettings()
        break

      case 'logout':
        await AuthService.logout()
        router.replace('/login')
        break
    }
  }

  const Overlay = (
    <Menus className="bottom-12" onClick={handleMenuClick}>
      <Menus.Item value="accountSettings" label={t('account.heading')} />
      <Menus.Item value="logout" label={t('sidebar.logout')} />
      <Menus.Divider />
      <Menus.Item
        className="text-slate-400 hover:bg-transparent cursor-default"
        label={`${t('sidebar.version')} v1.0.0`}
      />
    </Menus>
  )

  return (
    <div className="flex-shrink-0 flex px-4 py-2 bg-slate-100 border-t border-slate-200">
      {isReady ? (
        <Dropdown
          className="flex-shrink-0 group block w-full"
          placement="top-start"
          overlay={Overlay}
        >
          <div className="flex items-center cursor-pointer">
            <div>
              <RoundImage className="inline-block h-8 w-8" src={user?.avatar} size={32} />
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
