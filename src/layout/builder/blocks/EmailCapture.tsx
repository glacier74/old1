import { Form, Input, Switch, notification } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { Heading } from '~/layout/builder/blocks/Heading'
import { Text } from '~/layout/builder/blocks/Text'
import { useBuilderContext } from '~/layout/builder/context'
import { StripeService } from '~/service'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface EmailCaptureProps extends BlockProps {
  block: EmailCaptureBlock
}

export const EmailCapturePreview: FC<EmailCaptureProps & { product: Product }> = ({
  block,
  product
}) => {
  const { t } = useTranslation()

  async function handleFinish(values: AnyMap<string>) {
    await StripeService.createContact(product.id!, values.name, values.email)

    notification.success({
      title: t('publicSite.successfullySubmitted')
    })
  }

  return (
    <BlockPreview block={block}>
      <div className="block-emailcapture-container">
        <h3
          className="rich-text !text-4xl md:!text-5xl text-slate-900 font-bold text-center"
          placeholder=" "
        >
          {block.heading.html}
        </h3>

        <div
          className="rich-text max-w-3xl mx-auto !text-xl text-slate-500 text-center"
          placeholder=" "
          dangerouslySetInnerHTML={{
            __html: block.description.html
          }}
        />

        <Form.Custom
          inline
          submitText={block.button.html}
          submitOptions={{
            className: 'w-full ml-1 md:w-auto md:ml-0',
            type: 'success'
          }}
          request={handleFinish}
        >
          {block.isNameRequired && (
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'The name is not allowed to be empty' }]}
            >
              <Input placeholder={t('builder.emailCapture.namePlaceholder')} />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email', message: 'The email is not valid' }]}
          >
            <Input type="email" placeholder={t('builder.emailCapture.emailPlaceholder')} />
          </Form.Item>
        </Form.Custom>
      </div>
    </BlockPreview>
  )
}

export const EmailCaptureSettings: FC<Pick<EmailCaptureProps, 'block'>> = ({ block }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()

  function handleChange(isNameRequired: any) {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates: {
          isNameRequired
        }
      }
    })
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 text-slate-700">
      <span>{t('builder.emailCapture.nameRequired')}</span>
      <Switch value={block.isNameRequired} onChange={handleChange} />
    </div>
  )
}

export const EmailCapture: FC<EmailCaptureProps> = ({ block }) => {
  const { t } = useTranslation()

  return (
    <BlockComponent block={block}>
      <div className="block-emailcapture-container">
        {/* Heading */}
        <Heading
          className="block-emailcapture-heading"
          block={block.heading}
          placeholder="builder.emailCapture.heading"
          enableFormats={null}
        />

        {/* Description */}
        <div className="block-emailcapture-description">
          <Text
            block={block.description}
            placeholder="builder.emailCapture.description"
            enableFormats={['basic']}
          />
        </div>

        <div className="block-emailcapture-content">
          {block.isNameRequired && (
            <Input placeholder={t('builder.emailCapture.namePlaceholder')} disabled={true} />
          )}
          <Input placeholder={t('builder.emailCapture.emailPlaceholder')} disabled={true} />
          <Text
            className="block-emailcapture-button"
            block={block.button}
            placeholder="builder.emailCapture.button"
            enableFormats={null}
          />
        </div>
      </div>
    </BlockComponent>
  )
}
