import { Form, Input } from '@heyforms/ui'
import { nanoid } from 'nanoid'
import { FC } from 'react'

import { AutoSizeTextarea } from '~/components'

import { OptionsContainer } from '../OptionsContainer'
import { AddWidgetForm } from './AddWidgetForm'

export interface AddLinkProps extends ComponentProps {
  onCreate: (widget: AnyMap) => void
  onGoBack: () => void
  onGoNext?: (type: string) => void
}

export const AddLink: FC<AddLinkProps> = ({ onCreate, onGoBack, ...restProps }) => {
  function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      size: '1x1',
      url: values.url,
      overrides: {
        title: values.caption
      }
    })
  }

  return (
    <OptionsContainer title="Add Link" onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        <AddWidgetForm requiredNames={['url']} onFinish={handleFinish}>
          <Form.Item
            label="URL"
            name="url"
            rules={[{ type: 'url', required: true, message: 'The URL is not valid' }]}
          >
            <AutoSizeTextarea placeholder="e.g. https://example.com" />
          </Form.Item>
          <Form.Item label="Caption" name="caption">
            <Input />
          </Form.Item>
        </AddWidgetForm>
      </div>
    </OptionsContainer>
  )
}
