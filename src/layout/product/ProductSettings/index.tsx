import { useTranslation } from 'next-i18next'

import { MetaData } from '~/layout/product/ProductSettings/MetaData'

import { DeleteProduct } from './DeleteProduct'
import { Domain } from './Domain'
import { Language } from './Language'
import { SitePrivate } from './SitePrivate'

export const ProductSettings = () => {
  const { t } = useTranslation()

  return (
    <div className="mt-6 space-y-12">
      {/* Meta data */}
      <div className="space-y-3">
        <div>
          <div className="text-lg font-extrabold text-slate-900">
            {t('productSettings.metaData.heading')}
          </div>
          <p className="mt-1 text-sm text-slate-500">{t('productSettings.metaData.description')}</p>
        </div>

        <MetaData />
      </div>

      {/* General */}
      <div className="space-y-3">
        <div className="text-lg font-extrabold text-slate-900">
          {t('productSettings.general.heading')}
        </div>

        <div className="space-y-4 divide-y">
          <Language />
          <Domain />
          <SitePrivate />
          {/*<RemoveBranding />*/}
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
