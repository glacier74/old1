import { isValid } from '@nily/utils'
import clsx from 'clsx'
import { FC, startTransition, useCallback, useEffect, useRef, useState } from 'react'

import { insertClipboardText } from './clipboard'

export interface PlainTextEditorProps extends Omit<ComponentProps, 'onChange'> {
  as?: string
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export const PlainTextEditor: FC<PlainTextEditorProps> = ({
  className,
  as: CustomTag = 'span' as any,
  placeholder,
  value,
  style,
  onChange
}) => {
  const ref = useRef<HTMLElement | null>(null)
  const [isCompositing, setIsCompositing] = useState(false)

  function handleKeyDown(event: any) {
    if (isCompositing) {
      return
    }

    switch (event.code) {
      case 'Enter':
        event.preventDefault()
        break
    }
  }

  function handleInput() {
    if (isCompositing) {
      return
    }

    handleUpdate()
  }

  function handlePaste(event: any) {
    event.preventDefault()
    insertClipboardText(event)
  }

  function handleComposition(event: any) {
    switch (event.type) {
      case 'compositionstart':
        setIsCompositing(true)
        break

      case 'compositionend':
        setIsCompositing(false)
        handleUpdate()
        break
    }
  }

  function handleUpdate() {
    startTransition(() => {
      const newValue = ref.current!.innerText

      if (newValue.length < 1) {
        ref.current!.innerText = value!
        onChange?.(value!)
      } else {
        onChange?.(newValue)
      }
    })
  }

  const handleCompositionCallback = useCallback(handleComposition, [ref.current])
  const handleKeyDownCallback = useCallback(handleKeyDown, [ref.current, isCompositing])
  const handleInputCallback = useCallback(handleInput, [isCompositing])
  const handlePasteCallback = useCallback(handlePaste, [])

  // Setup initial html
  useEffect(() => {
    if (ref.current && isValid(value)) {
      ref.current.innerText = value!
    }
  }, [ref])

  return (
    <CustomTag
      ref={ref}
      className={clsx('plain-text-editor', className)}
      placeholder={placeholder}
      contentEditable={true}
      onCompositionStart={handleCompositionCallback}
      onCompositionEnd={handleCompositionCallback}
      onKeyDown={handleKeyDownCallback}
      onInput={handleInputCallback}
      onPaste={handlePasteCallback}
      suppressContentEditableWarning={true}
      tabIndex={0}
      spellCheck={true}
      style={style}
    />
  )
}
