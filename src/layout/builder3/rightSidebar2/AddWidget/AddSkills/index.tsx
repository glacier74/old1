import { Form, Input, useForm } from '@heyforms/ui'
import { nanoid } from 'nanoid'
import { FC, useState } from 'react'

import { Rating } from '~/components'

import { OptionsContainer } from '../../OptionsContainer'
import { AddLinkProps } from '../AddLink'
import { AddWidgetForm } from '../AddWidgetForm'
import { SkillsIconPicker } from './SkillsIconPicker'

export const AddSkills: FC<AddLinkProps> = ({ onCreate, onGoBack, ...restProps }) => {
  const [form] = useForm()
  const [initialValues, setInitialValues] = useState<AnyMap>()

  function handleValuesChange(changed: AnyMap, values: AnyMap) {
    if (changed.icon?.title) {
      const newValues = {
        ...values,
        title: changed.icon.title
      }

      setInitialValues(newValues)

      setTimeout(() => {
        form.resetFields()
      }, 0)
    }
  }

  function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      type: 'skills',
      size: '1x1',
      data: {
        title: values.title,
        icon: {
          type: values.icon.type,
          svgName: values.icon.type === 'svg' ? values.icon.value : undefined,
          imageUrl: values.icon.type === 'image' ? values.icon.value : undefined
        },
        rating: values.rating
      }
    })
  }

  return (
    <OptionsContainer title="Add a skill" onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        <AddWidgetForm
          form={form}
          initialValues={initialValues}
          requiredNames={['icon', 'title', 'rating']}
          onValuesChange={handleValuesChange}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Name"
            name="title"
            rules={[
              { type: 'string', required: true, message: 'The name is not allowed to be empty' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Icon"
            name="icon"
            rules={[
              { type: 'object', required: true, message: 'The icon is not allowed to be empty' }
            ]}
          >
            <SkillsIconPicker />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              { type: 'number', required: true, message: 'The rating is not allowed to be empty' }
            ]}
          >
            <Rating />
          </Form.Item>
        </AddWidgetForm>
      </div>
    </OptionsContainer>
  )
}
