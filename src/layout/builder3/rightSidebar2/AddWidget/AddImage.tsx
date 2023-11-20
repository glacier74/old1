import { Form } from '@heyforms/ui'
import { nanoid } from 'nanoid'
import { FC } from 'react'

import { AutoSizeTextarea, ImagePickField2 } from '~/components'

import { OptionsContainer } from '../OptionsContainer'
import { AddLinkProps } from './AddLink'
import { AddWidgetForm } from './AddWidgetForm'

export const AddImage: FC<AddLinkProps> = ({ onCreate, onGoBack, ...restProps }) => {
  async function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      type: 'image',
      size: '1x1',
      overrides: {
        imageUrl: values.imageUrl,
        title: values.caption
      }
    })
  }

  return (
    <OptionsContainer title="Add Image" onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        <AddWidgetForm requiredNames={['imageUrl']} onFinish={handleFinish}>
          <Form.Item
            label="Image"
            name="imageUrl"
            rules={[{ required: true, message: 'The image should not be empty' }]}
          >
            <ImagePickField2 />
          </Form.Item>
          <Form.Item label="Caption" name="caption">
            <AutoSizeTextarea />
          </Form.Item>
        </AddWidgetForm>
      </div>
    </OptionsContainer>
  )
}
