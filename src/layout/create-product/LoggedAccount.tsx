import { Dropdown, Menus } from '@heyforms/ui'
import JsCookie from 'js-cookie'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import { AuthService } from '~/service'
import { useStore } from '~/store'
import { deleteRedirectURL } from '~/utils'

export const LoggedAccount: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { user } = useStore()

  async function handleMenuClick(name?: any) {
    switch (name) {
      case 'logout':
        await AuthService.logout()
        deleteRedirectURL(JsCookie)
        router.replace('/')
        break
    }
  }

  const Overlay = (
    <Menus className="bottom-12" onClick={handleMenuClick}>
      <Menus.Item value="logout" label={t('sidebar.logout')} />
    </Menus>
  )

  return (
    <div className="px-2 py-1 rounded cursor-pointer hover:bg-slate-100">
      <Dropdown
        className="flex-shrink-0 group block w-full"
        placement="top-start"
        overlay={Overlay}
      >
        <div>
          <div className="text-xs text-slate-500 text-right">{t('createProduct.loggedAs')}</div>
          <div className="text-sm text-slate-900">{user?.email}</div>
        </div>
      </Dropdown>
    </div>
  )
}
