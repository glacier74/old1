import { Form, Input } from '@heyforms/ui'
import { nanoid } from 'nanoid'
import { FC } from 'react'

import { OptionsContainer } from '../OptionsContainer'
import { AddLinkProps } from './AddLink'
import { AddWidgetForm } from './AddWidgetForm'

export const AddPhone: FC<AddLinkProps> = ({ onCreate, onGoBack, ...restProps }) => {
  async function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      type: 'phone',
      size: '1x1',
      data: {
        ...values,
        buttonText: 'Contact'
      },
      overrides: {
        title: ''
      }
    })
  }

  return (
    <OptionsContainer title="Add a phone number" onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        <AddWidgetForm requiredNames={['phoneNumber']} onFinish={handleFinish}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: 'The phone number should not be empty' }]}
          >
            <Input />
          </Form.Item>
        </AddWidgetForm>
      </div>
    </OptionsContainer>
  )
}
