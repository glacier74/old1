import { useTranslation } from 'next-i18next'
import { Language } from './Language'
import { SitePrivate } from './SitePrivate'
import { RemoveBranding } from './RemoveBranding'
import { DeleteProduct } from './DeleteProduct'

export const Settings = () => {
  const { t } = useTranslation()

  return (
    <div className="mt-6 space-y-12">
      {/* General */}
      <div className="space-y-3">
        <div className="text-lg font-extrabold text-slate-900">
          {t('productSettings.general.heading')}
        </div>

        <div className="space-y-4 divide-y">
          <Language />
          <SitePrivate />
          <RemoveBranding />
        </div>
      </div>

      {/* Danger zone */}
      <div className="space-y-3">
        <div className="text-lg font-extrabold text-slate-900">
          {t('productSettings.dangerZone.heading')}
        </div>
        <DeleteProduct />
      </div>
    </div>
  )
}
