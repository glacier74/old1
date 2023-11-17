import { Form } from '@heyforms/ui'
import { CustomFormProps } from '@heyforms/ui/types/form/CustomForm'
import { isEmpty } from '@nily/utils'
import { FC, useState } from 'react'

interface AddWidgetFormProps extends Omit<CustomFormProps, 'request'> {
  requiredNames: string[]
  onFinish: (values: AnyMap) => void
}

export const AddWidgetForm: FC<AddWidgetFormProps> = ({
  requiredNames = [],
  children,
  onFinish
}) => {
  const [isSubmitDisabled, setSubmitDisabled] = useState(true)

  function handleValuesChange(_changed: any, allValues: AnyMap) {
    setSubmitDisabled(requiredNames.some(n => isEmpty(allValues[n])))
  }

  return (
    <Form.Custom
      submitText="Add Widget"
      submitOptions={{
        type: 'success',
        block: true,
        disabled: isSubmitDisabled
      }}
      onValuesChange={handleValuesChange}
      request={onFinish as any}
    >
      {children}
    </Form.Custom>
  )
}
