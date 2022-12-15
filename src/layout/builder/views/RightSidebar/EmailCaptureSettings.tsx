import { Switch } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC, useCallback } from 'react'

import { useBuilderContext } from '~/layout/builder/context'

export const EmailCaptureSettings: FC<{ block: EmailCaptureBlock }> = ({ block }) => {
  const { dispatch } = useBuilderContext()
  const { t } = useTranslation()

  const handleChange = useCallback(
    (isNameRequired: any) => {
      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: block.id,
          updates: {
            isNameRequired
          }
        }
      })
    },
    [block.id]
  )

  return (
    <div className="px-4">
      <div className="flex items-center justify-between text-sm text-slate-700">
        <span>{t('builder.emailCapture.nameRequired')}</span>
        <Switch value={block.isNameRequired} onChange={handleChange} />
      </div>
    </div>
  )
}
