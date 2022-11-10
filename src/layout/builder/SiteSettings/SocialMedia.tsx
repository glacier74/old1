import { Input, Switch } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC, startTransition } from 'react'

import { useSiteSettings } from '~/layout'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'

const socialMedias = [
  {
    valueKey: 'twitter',
    enabledKey: 'enableTwitter'
  },
  {
    valueKey: 'facebook',
    enabledKey: 'enableFacebook'
  },
  {
    valueKey: 'instagram',
    enabledKey: 'enableInstagram'
  },
  {
    valueKey: 'linkedin',
    enabledKey: 'enableLinkedin'
  },
  {
    valueKey: 'youtube',
    enabledKey: 'enableYoutube'
  },
  {
    valueKey: 'telegram',
    enabledKey: 'enableTelegram'
  },
  {
    valueKey: 'github',
    enabledKey: 'enableGithub'
  }
] as const

interface SocialMediaItemProps {
  valueKey: typeof socialMedias[number]['valueKey']
  enabledKey: typeof socialMedias[number]['enabledKey']
}

const SocialMediaItem: FC<SocialMediaItemProps> = ({ valueKey, enabledKey }) => {
  const { t } = useTranslation()
  const settings = useSiteSettings()
  const { updateSiteSettings } = useStore()

  function handleSwitchChange(enabled: boolean) {
    startTransition(() => {
      const updates = {
        [enabledKey]: enabled
      }

      updateSiteSettings(updates)
      SiteSettingsService.update(settings.productId, updates)
    })
  }

  function handleInputChange(value: any) {
    startTransition(() => {
      const updates = {
        [valueKey]: value
      }

      updateSiteSettings(updates)
      SiteSettingsService.update(settings.productId, updates)
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-slate-700">{t(`editor.${valueKey}`)}</span>
        <Switch value={settings[enabledKey]} onChange={handleSwitchChange} />
      </div>
      {settings[enabledKey] && <Input value={settings[valueKey]} onChange={handleInputChange} />}
    </div>
  )
}

export const SocialMedia = () => {
  return (
    <div className="px-4 pt-1 pb-5 space-y-3">
      {socialMedias.map(row => (
        <SocialMediaItem key={row.valueKey} {...row} />
      ))}
    </div>
  )
}
