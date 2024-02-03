import { Form } from '@heyforms/ui'
import { nanoid } from 'nanoid'
import { FC } from 'react'

import { AutoSizeTextarea } from '~/components'

import { OptionsContainer } from '../OptionsContainer'
import { AddLinkProps } from './AddLink'
import { AddWidgetForm } from './AddWidgetForm'

export const AddText: FC<AddLinkProps> = ({ onCreate, onGoBack, ...restProps }) => {
  async function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      type: 'text',
      size: '2x0.5',
      data: {
        url: values.url
      },
      overrides: {
        title: values.text
      }
    })
  }

  return (
    <OptionsContainer title="Add text" onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        <AddWidgetForm requiredNames={['text']} onFinish={handleFinish}>
          <Form.Item
            label="Text"
            name="text"
            rules={[{ required: true, message: 'The text should not be empty' }]}
          >
            <AutoSizeTextarea />
          </Form.Item>
        </AddWidgetForm>
      </div>
    </OptionsContainer>
  )
}
