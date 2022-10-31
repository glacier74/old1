import { PhotoPickerField } from '@/components'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useStore } from '@/store'

export const AvatarSettings: FC = () => {
  const { t } = useTranslation()
  const { user } = useStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleChange(avatar: string) {
    setLoading(true)
    setError(null)

    try {
      //
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <div>
      <PhotoPickerField
        value={user?.avatar}
        label={t('account.avatar.heading')}
        description={t('account.avatar.description')}
        changeLoading={loading}
        onChange={handleChange}
      />

      {error && <div className="form-item-error">{error.message}</div>}
    </div>
  )
}
