import { Input } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC, startTransition } from 'react'

import { useSiteSettings } from '~/layout'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'

const SOCIAL_MEDIAS = [
  'twitter',
  'facebook',
  'instagram',
  'linkedin',
  'youtube',
  'telegram',
  'github'
] as const

const SocialMediaItem: FC<{ name: typeof SOCIAL_MEDIAS[number] }> = ({ name }) => {
  const { t } = useTranslation()
  const settings = useSiteSettings()
  const { updateSiteSettings } = useStore()

  function handleInputChange(value: any) {
    startTransition(() => {
      const updates = {
        [name]: value
      }

      updateSiteSettings(updates)
      SiteSettingsService.update(settings.productId, updates)
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-slate-700">{t(`builder.${name}`)}</span>
      </div>
      <Input value={settings[name]} onChange={handleInputChange} />
    </div>
  )
}

export const SocialMedia = () => {
  return (
    <div className="px-4 pt-1 pb-5 space-y-3">
      {SOCIAL_MEDIAS.map(name => (
        <SocialMediaItem key={name} name={name} />
      ))}
    </div>
  )
}
