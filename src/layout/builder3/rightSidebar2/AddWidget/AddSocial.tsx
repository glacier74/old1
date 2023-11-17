import { Form, Input } from '@heyforms/ui'
import { nanoid } from 'nanoid'
import { FC } from 'react'

import { OptionsContainer } from '../OptionsContainer'
import { AddLinkProps } from './AddLink'
import { AddWidgetForm } from './AddWidgetForm'
import { SOCIAL_MAPS } from './SocialList'

export const AddSocial: FC<AddLinkProps & { type: string }> = ({
  type,
  onCreate,
  onGoBack,
  ...restProps
}) => {
  const social = SOCIAL_MAPS[type]

  async function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      url: social.url.replace('{username}', values.username),
      size: '1x1'
    })
  }

  return (
    <OptionsContainer title={`Add ${social.label}`} onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        <AddWidgetForm requiredNames={['username']} onFinish={handleFinish}>
          <Form.Item
            label={`${social.label} Username`}
            name="username"
            rules={[{ required: true, message: 'The username is not allowed to be empty' }]}
          >
            <Input leading="@" />
          </Form.Item>
        </AddWidgetForm>
      </div>
    </OptionsContainer>
  )
}
