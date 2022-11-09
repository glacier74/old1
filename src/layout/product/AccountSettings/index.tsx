import { Modal } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import { useStore } from '~/store'

import { AvatarSettings } from './AvatarSettings'
import { DeleteAccount } from './DeleteAccount'
import { EmailAddress } from './EmailAddress'
import { Password } from './Password'
import { UserName } from './UserName'

export const AccountSettingsModal: FC<IModalProps> = ({ visible }) => {
  const { t } = useTranslation()
  const { closeAccountSettings } = useStore()

  return (
    <Modal visible={visible} onClose={closeAccountSettings} showCloseIcon>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl leading-6 font-bold text-slate-900">{t('account.heading')}</h1>
          <p className="mt-2 text-sm text-slate-500">{t('account.description')}</p>
        </div>

        {/* User avatar */}
        <AvatarSettings />

        {/* User name */}
        <UserName />

        {/* Email address */}
        <EmailAddress />

        {/* Password */}
        <Password />

        {/* Delete account */}
        <DeleteAccount />
      </div>
    </Modal>
  )
}
