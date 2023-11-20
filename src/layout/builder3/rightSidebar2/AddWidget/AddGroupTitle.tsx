import { Form } from '@heyforms/ui'
import { nanoid } from 'nanoid'
import { FC } from 'react'

import { AutoSizeTextarea } from '~/components'

import { OptionsContainer } from '../OptionsContainer'
import { AddLinkProps } from './AddLink'
import { AddWidgetForm } from './AddWidgetForm'

export const AddGroupTitle: FC<AddLinkProps> = ({ onCreate, onGoBack, ...restProps }) => {
  async function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      type: 'group_title',
      size: '1x1',
      overrides: {
        title: values.title
      }
    })
  }

  return (
    <OptionsContainer title="Add a group title" onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        <AddWidgetForm requiredNames={['title']} onFinish={handleFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'The title should not be empty' }]}
          >
            <AutoSizeTextarea />
          </Form.Item>
        </AddWidgetForm>
      </div>
    </OptionsContainer>
  )
}
