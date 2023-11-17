import { notification } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useEffect } from 'react'

import { AvatarPickerField } from '~/components'
import { UserService } from '~/service'
import { useStore } from '~/store'
import { useRequest } from '~/utils'

export const AvatarSettings: FC = () => {
  const { t } = useTranslation('dashboard')
  const { user, updateUser } = useStore()

  const { error, request } = useRequest(async (avatar: string) => {
    const updates = { avatar }

    await UserService.update(updates)
    updateUser(updates)
  }, [])

  useEffect(() => {
    if (error) {
      notification.error({
        title: t(error.message)
      })
    }
  }, [error])

  return (
    <div>
      <div className="block text-sm font-medium text-slate-700">{t('account.avatar.heading')}</div>
      <p className="mt-1 text-sm text-slate-500">{t('account.avatar.description')}</p>
      <div className="mt-3">
        <AvatarPickerField
          value={user?.avatar}
          text=""
          retainLength={2}
          enableUnsplash={false}
          onChange={request}
        />
      </div>
      {error && <div className="form-item-error">{error.message}</div>}
    </div>
  )
}
