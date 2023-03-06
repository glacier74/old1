import { Input, Switch } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { FC } from 'react'

import { useBlockSetting } from '~/layout/builder2/context'

import { AutomatedEmail } from './AutomatedEmail'
import { SettingFieldProps } from './SettingField'

const defaultSubject = 'You got {product.name}'
const defaultMessage = `
    <p>Dear {contact.name},</p>
    <p></p>
    <p>Thank you for joining {product.name}. I appreciate your support.</p>
    <p></p>
    <p>Sincerely,</p>
    <p>{product.owner.name}</p>
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

export const EmailCaptureSettingField: FC<SettingFieldProps> = ({ schema }) => {
  const { setting, updateSetting } = useBlockSetting<any>(schema.name)

  function handleEnableFullName(value: boolean) {
    if (value) {
      updateSetting(
        {
          ...setting.email,
          placeholder: 'Your name'
        },
        'fullName'
      )
    } else {
      updateSetting(undefined, 'fullName')
    }
  }

  function handleFullNameChange(value: any) {
    updateSetting(value, 'fullName.placeholder')
  }

  function handleEmailAddressChange(value: any) {
    updateSetting(value, 'email.placeholder')
  }

  function handleChange(value: any) {
    updateSetting(value, 'button.text')
  }

  function handleMessageChange(value: any) {
    updateSetting(value, 'message')
  }

  return (
    <div className="builder-setting-text space-y-2">
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="mb-1 text-sm text-slate-700">Capture name</div>
          <Switch value={isValid(setting?.fullName)} onChange={handleEnableFullName} />
        </div>
        {isValid(setting?.fullName) && (
          <Input
            value={setting?.fullName?.placeholder || 'Your name'}
            onChange={handleFullNameChange}
          />
        )}
      </div>

      <div>
        <div className="mb-1 text-sm text-slate-700">Email address</div>
        <Input
          value={setting?.email.placeholder || 'Enter email address'}
          onChange={handleEmailAddressChange}
        />
      </div>

      <div>
        <div className="mb-1 text-sm text-slate-700">Button Text</div>
        <Input value={setting?.button.text} onChange={handleChange} />
      </div>

      <div>
        <div className="mb-1 text-sm text-slate-700">Success message</div>
        <Input value={setting?.message} onChange={handleMessageChange} />
      </div>

      <div>
        <AutomatedEmail
          setting={setting}
          updateSetting={updateSetting}
          heading="Automated email"
          description="Send a personalized email to your audience to congratulate them on successfully signing up for your email list!"
          defaultSubject={defaultSubject}
          defaultMessage={defaultMessage}
          variables={variables}
        />
      </div>
    </div>
  )
}
