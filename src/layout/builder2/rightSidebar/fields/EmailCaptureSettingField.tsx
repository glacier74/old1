import { Input, Switch } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { FC } from 'react'

import { StylePicker } from '~/components'
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
      updateSetting(value, 'isNameRequired')

      if (!setting.fullName) {
        updateSetting(
          {
            ...setting.email,
            placeholder: 'Your name'
          },
          'fullName'
        )
      }
    } else {
      updateSetting(value, 'isNameRequired')
    }
  }

  function handleFullNameChange(value: any) {
    updateSetting(value, 'fullName.placeholder')
  }

  function handleFullNameStyleChange(property: string, value: string) {
    updateSetting(value, `fullName.style.${property}`)
  }

  function handleEmailAddressChange(value: any) {
    updateSetting(value, 'email.placeholder')
  }

  function handleEmailAddressStyleChange(property: string, value: string) {
    updateSetting(value, `email.style.${property}`)
  }

  function handleChange(value: any) {
    updateSetting(value, 'button.text')
  }

  function handleButtonStyleChange(property: string, value: string) {
    updateSetting(value, `button.style.${property}`)
  }

  function handleMessageChange(value: any) {
    updateSetting(value, 'message')
  }

  return (
    <div className="builder-setting-text divide-y divide-slate-200 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="mb-1 text-sm text-slate-700">Capture name</div>
          <Switch value={setting?.isNameRequired} onChange={handleEnableFullName} />
        </div>

        {setting?.isNameRequired && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="builder-text-title">Placeholder</div>
              <Input
                className="!px-2 !py-[0.34rem]"
                value={setting?.fullName?.placeholder || 'Your name'}
                onChange={handleFullNameChange}
              />
            </div>

            {isValid(setting?.fullName?.style) && (
              <div className="flex items-center justify-between">
                <div className="text-sm">Style</div>
                <StylePicker
                  properties={Object.keys(setting!.fullName!.style)}
                  value={setting!.fullName!.style}
                  onChange={handleFullNameStyleChange}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pt-4">
        <div className="mb-1 text-sm text-slate-700">Email address</div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="builder-text-title">Placeholder</div>
            <Input
              className="!px-2 !py-[0.34rem]"
              value={setting?.email.placeholder || 'Enter email address'}
              onChange={handleEmailAddressChange}
            />
          </div>

          {isValid(setting?.email?.style) && (
            <div className="flex items-center justify-between">
              <div className="text-sm">Style</div>
              <StylePicker
                properties={Object.keys(setting!.email!.style)}
                value={setting!.email!.style}
                onChange={handleEmailAddressStyleChange}
              />
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">
        <div className="mb-1 text-sm text-slate-700">Submit button</div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="builder-text-title">Text</div>
            <Input
              className="!px-2 !py-[0.34rem]"
              value={setting?.button.text}
              onChange={handleChange}
            />
          </div>

          {isValid(setting?.button?.style) && (
            <div className="flex items-center justify-between">
              <div className="text-sm">Style</div>
              <StylePicker
                properties={Object.keys(setting!.button!.style)}
                value={setting!.button!.style}
                onChange={handleButtonStyleChange}
              />
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">
        <div className="mb-1 text-sm text-slate-700">Success message</div>
        <Input value={setting?.message} onChange={handleMessageChange} />
      </div>

      <div className="pt-4">
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
