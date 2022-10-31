import { SwitchField } from '@/components'
import { useTranslation } from 'next-i18next'
import { useRequest } from '@/utils'

export const RemoveBranding = () => {
  const { t } = useTranslation()
  const { loading, error, request } = useRequest(async () => {})

  return (
    <SwitchField
      className="pt-4"
      label={t('productSettings.removeBranding.heading')}
      description={t('productSettings.removeBranding.description')}
      loading={loading}
      onChange={request}
    />
  )
}
