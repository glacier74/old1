import { Input } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { startTransition } from 'react'
import { SiteSettingsService } from '@/service'
import { useSiteSettings } from '@/layout'
import { useStore } from '@/store'

export const SiteMeta = () => {
  const { t } = useTranslation()
  const settings = useSiteSettings()
  const { updateSiteSettings } = useStore()

  function handleInputChange(metaTitle: any) {
    startTransition(() => {
      const updates = {
        metaTitle
      }

      updateSiteSettings(updates)
      SiteSettingsService.update(settings.productId, updates)
    })
  }

  function handleTextareaChange(metaDescription: any) {
    startTransition(() => {
      const updates = {
        metaDescription
      }

      updateSiteSettings(updates)
      SiteSettingsService.update(settings.productId, updates)
    })
  }

  return (
    <div className="px-4 pt-1 pb-5 space-y-2">
      <div className="text-sm">
        <div className="text-slate-700 mb-1">{t('editor.metaTitle')}</div>
        <Input value={settings.metaTitle} onChange={handleInputChange} />
      </div>

      <div className="text-sm">
        <div className="text-slate-700 mb-1">{t('editor.metaDescription')}</div>
        <Input.Textarea value={settings.metaDescription} onChange={handleTextareaChange} />
      </div>
    </div>
  )
}
