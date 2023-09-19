import clsx from 'clsx'
import { ChangeEvent, FC, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { TextareaAutosizeProps } from 'react-textarea-autosize/dist/declarations/src'

interface AutoSizeTextareaProps extends Omit<TextareaAutosizeProps, 'onChange'> {
  value?: string
  onChange: (value: string) => void
}

export const AutoSizeTextarea: FC<AutoSizeTextareaProps> = ({
  className,
  minRows = 1,
  value: rawValue,
  onChange,
  ...restProps
}) => {
  const lock = useRef(false)
  const [value, setValue] = useState(rawValue)

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newValue = event.currentTarget.value
    setValue(newValue)

    if (event.type === 'compositionstart') {
      lock.current = true
      return
    }

    if (event.type === 'compositionend') {
      lock.current = false
    }

    if (!lock.current) {
      onChange?.(newValue)
    }
  }

  return (
    <TextareaAutosize
      className={clsx(
        'input w-full !px-2 !py-[0.34rem] focus:ring-emerald-600 resize-none',
        className
      )}
      minRows={minRows}
      value={value}
      onChange={handleChange}
      {...restProps}
    />
  )
}
