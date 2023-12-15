import { Form } from '@heyforms/ui'
import { nanoid } from 'nanoid'
import { FC } from 'react'

import { AutoSizeTextarea } from '~/components'

import { OptionsContainer } from '../OptionsContainer'
import { AddLinkProps } from './AddLink'
import { AddWidgetForm } from './AddWidgetForm'

export const AddVideo: FC<AddLinkProps> = ({ onCreate, onGoBack, ...restProps }) => {
  function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      type: 'video',
      size: '1x1',
      url: values.url,
      overrides: {
        title: values.caption
      }
    })
  }

  return (
    <OptionsContainer title="Add Video" onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        <AddWidgetForm requiredNames={['url']} onFinish={handleFinish}>
          <Form.Item
            label="URL"
            name="url"
            rules={[{ type: 'url', required: true, message: 'The spotify URL is not valid' }]}
          >
            <AutoSizeTextarea minRows={2} placeholder="Paste a YouYube or Vimeo URL here" />
          </Form.Item>
          <Form.Item label="Caption" name="caption">
            <AutoSizeTextarea />
          </Form.Item>
        </AddWidgetForm>
      </div>
    </OptionsContainer>
  )
}
