import { FC } from 'react'

import { AutomatedEmailOption } from './AutomatedEmailOption'
import { Option, OptionProps } from './OptionGroup'
import { TextOption } from './TextOption'

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

export const EmailCaptureOption: FC<OptionProps> = ({ parentName, schema }) => {
  const name = [parentName, schema.name].filter(Boolean).join('.')

  return (
    <div className="builder-option builder-option__object builder-option__payment">
      <div className="builder-option__title">{schema.title}</div>
      <div className="builder-option__content">
        <div className="builder-option__list-item">
          {schema.fields.map((f: any) => (
            <Option key={f.name} parentName={name} schema={f} />
          ))}

          {/* Submit success tips */}
          <TextOption
            parentName={name}
            schema={{
              name: 'successMessage',
              title: 'Success message'
            }}
          />

          {/* Automated email */}
          <AutomatedEmailOption
            parentName={name}
            schema={{
              title: 'Automated email'
            }}
            heading="Automated email"
            description="Send a personalized email to your audience to congratulate them on successfully signing up for your email list!"
            defaultSubject={defaultSubject}
            defaultMessage={defaultMessage}
            variables={variables}
          />
        </div>
      </div>
    </div>
  )
}
