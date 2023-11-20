import { Form } from '@heyforms/ui'
import { nanoid } from 'nanoid'
import { FC } from 'react'

import { AutoSizeTextarea } from '~/components'

import { OptionsContainer } from '../OptionsContainer'
import { AddLinkProps } from './AddLink'
import { AddWidgetForm } from './AddWidgetForm'

export const AddMusic: FC<AddLinkProps> = ({ onCreate, onGoBack, ...restProps }) => {
  function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      size: '1x1',
      url: values.url
    })
  }

  return (
    <OptionsContainer title="Add Music" onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        <AddWidgetForm requiredNames={['url']} onFinish={handleFinish}>
          <Form.Item
            label="URL"
            name="url"
            rules={[{ type: 'url', required: true, message: 'The spotify URL is not valid' }]}
          >
            <AutoSizeTextarea placeholder="Paste a Spotify album, artist, playlist or track URL here" />
          </Form.Item>
        </AddWidgetForm>
      </div>
    </OptionsContainer>
  )
}
