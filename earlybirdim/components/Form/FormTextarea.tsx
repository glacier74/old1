import { ChangeEvent, FC, useRef } from 'react'

import { FormTextareaProps } from './FormProps'

const FormTextarea: FC<FormTextareaProps> = ({ value, rows = 3, onChange, ...restProps }) => {
  const lock = useRef(false)

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
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

  return <textarea value={value} rows={rows} onChange={handleChange} {...restProps} />
}

export default FormTextarea
