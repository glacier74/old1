import { notification } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useEffect } from 'react'

import { PhotoPickerField } from '~/components'
import { UserService } from '~/service'
import { useStore } from '~/store'
import { useRequest } from '~/utils'

export const AvatarSettings: FC = () => {
  const { t } = useTranslation()
  const { user, updateUser } = useStore()

  const { loading, error, request } = useRequest(async (avatar: string) => {
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
      <PhotoPickerField
        value={user?.avatar}
        label={t('account.avatar.heading')}
        description={t('account.avatar.description')}
        enableUnsplash={false}
        changeLoading={loading}
        onChange={request}
      />

      {error && <div className="form-item-error">{error.message}</div>}
    </div>
  )
}
