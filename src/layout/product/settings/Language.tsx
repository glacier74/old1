import { useTranslation } from 'next-i18next'
import { Select } from '@heyforms/ui'
import { useRequest } from '@/utils'

const options = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: '简体中文',
    value: 'zh-cn'
  }
]

export const Language = () => {
  const { t } = useTranslation()
  const { loading, error, request } = useRequest(async () => {})

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="text-sm leading-6 font-medium text-slate-900">
          {t('productSettings.language.heading')}
        </div>
        <p className="mt-1 text-sm text-slate-500">{t('productSettings.language.description')}</p>
      </div>
      <div className="form-item ml-4 mb-0">
        <Select options={options} loading={loading} onChange={request} />
      </div>
    </div>
  )
}
