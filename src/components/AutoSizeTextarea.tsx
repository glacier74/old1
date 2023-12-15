import clsx from 'clsx'
import { ChangeEvent, FC, startTransition, useCallback, useEffect, useRef, useState } from 'react'

interface AutoSizeTextareaProps extends ComponentProps {
  placeholder?: string
  minRows?: number
  value?: string
  callbackAfterBlur?: boolean
  onChange?: (value: string) => void
}

export const AutoSizeTextarea: FC<AutoSizeTextareaProps> = ({
  className,
  placeholder,
  minRows = 1,
  callbackAfterBlur = false,
  value: rawValue,
  onChange,
  ...restProps
}) => {
  const lock = useRef(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const [value, setValue] = useState(rawValue)

  function adjustTextareaHeight() {
    const textarea = textareaRef.current

    if (textarea) {
      textarea.style.height = 'auto'

      startTransition(() => {
        const rect = textarea.getBoundingClientRect()

        if (rect.height > 30 && textarea.scrollHeight >= rect.height) {
          textarea.style.height = `${textarea.scrollHeight + 2}px`
        }
      })
    }
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newValue = event.currentTarget.value

    setValue(newValue)
    adjustTextareaHeight()

    if (event.type === 'compositionstart') {
      lock.current = true
      return
    }

    if (event.type === 'compositionend') {
      lock.current = false
    }

    if (!lock.current && !callbackAfterBlur) {
      onChange?.(newValue)
    }
  }

  const handleBlur = useCallback(() => {
    if (callbackAfterBlur) {
      onChange?.(value || '')
    }
  }, [callbackAfterBlur, value])

  useEffect(() => {
    const textarea = textareaRef.current

    if (textarea) {
      adjustTextareaHeight()
      window.addEventListener('resize', adjustTextareaHeight)

      return () => {
        window.removeEventListener('resize', adjustTextareaHeight)
      }
    }
  }, [])

  return (
    <textarea
      ref={textareaRef}
      className={clsx(
        'input w-full !px-2 !py-[0.34rem] focus:border-emerald-500 focus:ring-emerald-600 resize-none overflow-y-hidden',
        className
      )}
      placeholder={placeholder}
      rows={minRows}
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      {...restProps}
    />
  )
}
