import { useTranslation } from 'next-i18next'
import { FC } from 'react'

const JINGLEBIO_REF = 'jinglebio'

interface JingleBioTipProps {
  referer: string
}

export const JingleBioTip: FC<JingleBioTipProps> = ({ referer }) => {
  const { t } = useTranslation('dashboard')

  if (referer !== 'jinglebio') {
    return null
  }

  return (
    <div className="p-4 mt-8 mx-5 md:mx-0 rounded-lg bg-yellow-50 text-sm text-slate-700 text-center">
      {t('login.jingleBioTip')}
    </div>
  )
}
