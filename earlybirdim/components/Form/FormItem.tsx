import { Field as RcField } from 'rc-field-form'
import { Meta } from 'rc-field-form/es/interface'
import { FC, ReactElement, cloneElement } from 'react'

import { FormItemProps } from './FormProps'

const FormItemError: FC<{ meta: Meta } & Pick<FormItemProps, 'errorRender' | 'errorMessage'>> = ({
  meta,
  errorRender,
  errorMessage
}) => {
  if (meta.errors.length > 0) {
    const error = errorMessage || meta.errors[0]

    if (errorRender) {
      return errorRender(error)
    }

    return <div className="mt-1 text-red-500 text-sm">{error}</div>
  }

  return null
}

const FormItem: FC<FormItemProps> = ({
  name,
  required = true,
  errorRender,
  errorMessage,
  children,
  ...restProps
}) => {
  return (
    <RcField name={name} rules={[{ required }]}>
      {(props, meta) => (
        <div {...restProps}>
          {cloneElement(children as ReactElement, props)}
          <FormItemError meta={meta} errorMessage={errorMessage} errorRender={errorRender} />
        </div>
      )}
    </RcField>
  )
}

export default FormItem
