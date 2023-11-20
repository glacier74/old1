import { Form, Input } from '@heyforms/ui'
import { nanoid } from 'nanoid'
import { FC } from 'react'

import { OptionsContainer } from '../OptionsContainer'
import { PlaceSearch } from '../WidgetOptions/LocationSubOption'
import { AddLinkProps } from './AddLink'
import { AddWidgetForm } from './AddWidgetForm'

export const AddLocation: FC<AddLinkProps> = ({ onCreate, onGoBack, ...restProps }) => {
  async function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      size: '1x1',
      url: `https://www.google.com/maps/@${values.location.latitude},${values.location.longitude},13z`,
      data: {
        location: values.location.placeName,
        title: values.caption
      }
    })
  }

  return (
    <OptionsContainer title="Add a location" onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        <AddWidgetForm requiredNames={['location']} onFinish={handleFinish}>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'The image is not allowed to be empty' }]}
          >
            <PlaceSearch isValueAsPlace={true} />
          </Form.Item>
          <Form.Item label="Caption" name="caption">
            <Input />
          </Form.Item>
        </AddWidgetForm>
      </div>
    </OptionsContainer>
  )
}
