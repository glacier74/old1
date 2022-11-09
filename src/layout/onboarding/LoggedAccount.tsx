import { Dropdown, Menus } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import { AuthService } from '~/service'
import { useStore } from '~/store'

export const LoggedAccount: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { user } = useStore()

  async function handleMenuClick(name?: any) {
    switch (name) {
      case 'logout':
        await AuthService.logout()
        router.replace('/login')
        break
    }
  }

  const Overlay = (
    <Menus className="bottom-12" onClick={handleMenuClick}>
      <Menus.Item value="logout" label={t('sidebar.logout')} />
    </Menus>
  )

  return (
    <div className="fixed top-5 right-5 px-2 py-1 rounded cursor-pointer hover:bg-slate-200">
      <Dropdown
        className="flex-shrink-0 group block w-full"
        placement="top-start"
        overlay={Overlay}
      >
        <div>
          <div className="text-xs text-slate-500 text-right">{t('onboarding.loggedAs')}</div>
          <div className="text-sm text-slate-900">{user?.email}</div>
        </div>
      </Dropdown>
    </div>
  )
}
