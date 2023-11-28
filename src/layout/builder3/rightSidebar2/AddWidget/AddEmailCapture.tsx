import { Form, Input } from '@heyforms/ui'
import { nanoid } from 'nanoid'
import { FC } from 'react'

import { OptionsContainer } from '../OptionsContainer'
import { AddLinkProps } from './AddLink'
import { AddWidgetForm } from './AddWidgetForm'

export const AddEmailCapture: FC<AddLinkProps> = ({ onCreate, onGoBack, ...restProps }) => {
  function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      type: 'email_capture',
      size: '1x1',
      data: {
        emailPlaceholder: 'Enter email address',
        buttonText: 'Subscribe',
        successMessage: 'Thank you for subscribing!'
      },
      overrides: {
        title: values.title
      }
    })
  }

  return (
    <OptionsContainer title="Add an email capture card" onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        <AddWidgetForm requiredNames={['title']} onFinish={handleFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'The title should not be empty' }]}
          >
            <Input />
          </Form.Item>
        </AddWidgetForm>
      </div>
    </OptionsContainer>
  )
}
