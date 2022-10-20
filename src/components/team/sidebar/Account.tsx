import { Avatar, Dropdown, Menus } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useStoreContext } from '@/store'

export const Account: FC = () => {
  const { t } = useTranslation()
  const { state } = useStoreContext()

  function handleMenuClick(name?: any) {
    switch (name) {
      case 'accountSettings':
        break

      case 'logout':
        window.location.href = '/logout'
        break
    }
  }

  const Overlay = (
    <Menus className="bottom-12" onClick={handleMenuClick}>
      <Menus.Item value="accountSettings" label={t('sidebar.accountSettings')} />
      <Menus.Item value="logout" label={t('sidebar.logout')} />
      <Menus.Divider />
      <Menus.Item
        className="text-slate-400 hover:bg-transparent cursor-default"
        label={`${t('sidebar.version')} v1.0.0`}
      />
    </Menus>
  )

  return (
    <div className="flex-shrink-0 flex px-4 py-2 bg-slate-100 border-t border-gray-200">
      <Dropdown
        className="flex-shrink-0 group block w-full"
        placement="top-start"
        overlay={Overlay}
      >
        <div className="flex items-center cursor-pointer">
          <div>
            <Avatar className="inline-block h-8 w-8" src={state.user?.avatar} circular rounded />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-slate-700 truncate group-hover:text-slate-900">
              {state.user?.name}
            </p>
            <p className="text-xs text-slate-500 group-hover:text-slate-700">
              {t('sidebar.viewProfile')}
            </p>
          </div>
        </div>
      </Dropdown>
    </div>
  )
}
