import { SwitchField } from '@/components'
import { useTranslation } from 'next-i18next'
import { useRequest } from '@/utils'

export const SitePrivate = () => {
  const { t } = useTranslation()
  const { loading, error, request } = useRequest(async () => {})

  return (
    <SwitchField
      className="pt-4"
      label={t('productSettings.sitePrivate.heading')}
      description={t('productSettings.sitePrivate.description')}
      loading={loading}
      onChange={request}
    />
  )
}
