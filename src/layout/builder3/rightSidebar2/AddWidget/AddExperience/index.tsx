import { Form, Input, Select, useForm } from '@heyforms/ui'
import { nanoid } from 'nanoid'
import { FC, useMemo, useState } from 'react'

import { ImagePickField2 } from '~/components'

import { OptionsContainer } from '../../OptionsContainer'
import { AddLinkProps } from '../AddLink'
import { SkillsIcon } from '../AddSkills/SkillsIcons'
import { AddWidgetForm } from '../AddWidgetForm'
import { DateRangeField } from './DateRangeField'

export const EXPERIENCE_TYPES = [
  {
    value: 'work',
    label: 'Work experience'
  },
  {
    value: 'education',
    label: 'Education experience'
  }
]

export const EXPERIENCE_FIELDS: AnyMap<AnyMap[]> = {
  work: [
    {
      name: 'workName',
      label: 'Where do/did you work?',
      type: 'input'
    },
    {
      name: 'workRole',
      label: 'What is/was your role?',
      type: 'input'
    },
    {
      name: 'workDate',
      label: 'When do/did you work there?',
      type: 'date'
    }
  ],
  education: [
    {
      name: 'educationName',
      label: 'Where do/did you study?',
      type: 'input'
    },
    {
      name: 'educationField',
      label: 'What is/was your major or field of study?',
      type: 'input'
    },
    {
      name: 'educationDate',
      label: 'When do/did you study there?',
      type: 'date'
    }
  ]
}

export const AddExperience: FC<AddLinkProps> = ({ onCreate, onGoBack, ...restProps }) => {
  const [form] = useForm()
  const [formValues, setFormValues] = useState<AnyMap>({
    experienceType: 'work'
  })

  const requiredNames = useMemo(
    () => EXPERIENCE_FIELDS[formValues.experienceType].map((f: AnyMap) => f.name),
    [formValues.experienceType]
  )

  function handleValuesChange(_: AnyMap, values: AnyMap) {
    setFormValues(values)
  }

  function handleFinish(values: any) {
    onCreate({
      id: nanoid(8),
      type: 'experience',
      size: '1x1',
      data: values
    })
  }

  return (
    <OptionsContainer title="Add a experience" onGoBack={onGoBack} {...restProps}>
      <div className="px-5">
        <AddWidgetForm
          form={form}
          initialValues={formValues}
          requiredNames={requiredNames}
          onValuesChange={handleValuesChange}
          onFinish={handleFinish}
        >
          <Form.Item name="experienceType">
            <Select options={EXPERIENCE_TYPES} />
          </Form.Item>

          <Form.Item label="Image" name="imageUrl">
            <ImagePickField2
              placeholder={<SkillsIcon iconType="svg" svgName={formValues.experienceType} />}
              offset={[125, 85]}
            />
          </Form.Item>

          {(EXPERIENCE_FIELDS[formValues.experienceType] as AnyMap[]).map(row => (
            <Form.Item
              key={row.name}
              label={row.label}
              name={row.name}
              rules={[
                {
                  required: true,
                  message: `The ${row.label} is not allowed to be empty`
                }
              ]}
            >
              {row.type === 'date' ? <DateRangeField /> : <Input />}
            </Form.Item>
          ))}
        </AddWidgetForm>
      </div>
    </OptionsContainer>
  )
}
