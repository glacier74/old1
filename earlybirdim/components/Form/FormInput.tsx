import { ChangeEvent, FC, useRef } from 'react'

import { FormInputProps } from './FormProps'

const FormInput: FC<FormInputProps> = ({ value, onChange, ...restProps }) => {
  const lock = useRef(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.type === 'compositionstart') {
      lock.current = true
      return
    }

    if (event.type === 'compositionend') {
      lock.current = false
    }

    if (!lock.current) {
      onChange?.(event.target.value)
    }
  }

  return <input value={value} onChange={handleChange} {...restProps} />
}

export default FormInput
