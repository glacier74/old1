import { Switch } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC, useCallback } from 'react'

import { useBuilderContext } from '~/layout/builder/context'

import { EmailNotification } from './EmailNotification'

export const EmailCaptureSettings: FC<{ block: EmailCaptureBlock }> = ({ block }) => {
  const { dispatch } = useBuilderContext()
  const { t } = useTranslation()

  const defaultSubject = 'You got {product.name}'
  const defaultMessage = `
    <div>Dear {contact.name},</div>
    <div><br /></div>
    <div>Thank you for joining {product.name}. I appreciate your support.</div>
    <div><br /></div>
    <div>Sincerely,</div>
    <div>{product.owner.name}</div>
  `
  const variables = [
    {
      variable: 'contact.name',
      description: (
        <span>
          Email capture respondent's name{' '}
          <span className="text-slate-500">(could be empty if name is not required)</span>
        </span>
      )
    },
    {
      variable: 'contact.email',
      description: "Email capture respondent's email address"
    },
    {
      variable: 'product.name',
      description: 'Product name'
    },
    {
      variable: 'product.url',
      description: 'The landing page URL'
    },
    {
      variable: 'product.owner.name',
      description: "Product owner's name"
    },
    {
      variable: 'product.owner.email',
      description: "Product owner's email address"
    }
  ]

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
    <div className="px-4 space-y-1">
      <div className="flex items-center justify-between text-sm text-slate-700">
        <span>{t('builder.emailCapture.nameRequired')}</span>
        <Switch value={block.isNameRequired} onChange={handleChange} />
      </div>

      <EmailNotification
        block={block}
        heading="Automated Email"
        description="Send a personalized email to your audience to congratulate them on successfully signing up for your email list!"
        defaultSubject={defaultSubject}
        defaultMessage={defaultMessage}
        variables={variables}
      />
    </div>
  )
}
