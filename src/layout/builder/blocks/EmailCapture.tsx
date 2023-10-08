import { Form, Input, notification } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { Heading } from '~/layout/builder/blocks/Heading'
import { Text } from '~/layout/builder/blocks/Text'
import { PublicApiService } from '~/service/public-api'

import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface EmailCaptureProps extends BlockProps {
  block: EmailCaptureBlock
}

export const EmailCapturePreview: FC<EmailCaptureProps & { product: Product }> = ({
  block,
  product
}) => {
  const { t } = useTranslation(['publicSite'])

  async function handleFinish(values: AnyMap<string>) {
    await PublicApiService.createEmailCapture(product.id!, {
      blockId: block.id,
      name: values.name,
      email: values.email
    })

    notification.success({
      title: t('successfullySubmitted')
    })
  }

  return (
    <BlockPreview block={block}>
      <div className="block-emailcapture-container">
        <div className="block-emailcapture-heading">
          <h3 className="rich-text" placeholder=" ">
            {block.heading.html}
          </h3>
        </div>

        <div className="block-emailcapture-description">
          <div
            className="rich-text"
            placeholder=" "
            dangerouslySetInnerHTML={{
              __html: block.description.html
            }}
          />
        </div>

        <Form.Custom
          inline
          submitText={block.button.html}
          submitOptions={{
            className: 'w-full ml-1 !text-base md:w-auto md:ml-0',
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

export const EmailCapture: FC<EmailCaptureProps> = ({ block }) => {
  const { t } = useTranslation()

  return (
    <BlockComponent block={block}>
      <div className="block-emailcapture-container">
        {/* Heading */}
        <Heading
          className="block-emailcapture-heading"
          block={block.heading}
          placeholder={t('builder.emailCapture.heading')}
          enableFormats={null}
        />

        {/* Description */}
        <div className="block-emailcapture-description">
          <Text
            block={block.description}
            placeholder={t('builder.emailCapture.description')}
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
            placeholder={t('builder.emailCapture.button')}
            enableFormats={null}
          />
        </div>
      </div>
    </BlockComponent>
  )
}
