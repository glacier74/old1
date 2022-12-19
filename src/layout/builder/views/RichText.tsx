import { IComponentProps } from '@heyforms/ui/types/typing'
import { isEmpty, isValid } from '@nily/utils'
import clsx from 'clsx'
import throttle from 'lodash/throttle'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useBuilderContext } from '../context'
import { blockByType, insertClipboardText, placeCaretAtEnd, sanitizeHTML } from '../utils'

export interface RichTextProps extends Omit<IComponentProps, 'onChange'> {
  as?: string
  blockId: string
  multiple?: boolean
  value?: string
  enableFormats?: Array<'basic' | 'align'> | null
  enterBehavior?: BlockEnterBehavior
  onFocus?: () => void
  onUp?: () => void
  onDown?: () => void
  onEnter?: () => void
  onDelete?: () => void
  onChange?: (value: string) => void
}

const RichTextComponent: FC<RichTextProps> = ({
  className,
  as: CustomTag = 'div' as any,
  blockId,
  multiple = false,
  value,
  placeholder,
  enableFormats = ['basic', 'align'],
  enterBehavior,
  style,
  onChange
}) => {
  const { state, dispatch } = useBuilderContext()

  const ref = useRef<HTMLElement | null>(null)
  const [isCompositing, setIsCompositing] = useState(false)
  const [isCanDelete, setIsCanDelete] = useState(false)
  const [triggerKey, setTriggerKey] = useState<string>()

  const enableTextFormat = useMemo(() => isValid(enableFormats), [enableFormats])

  function handleKeyDown(event: any) {
    if (isCompositing) {
      return
    }

    // Add a flag to tell if this block can be deleted or not
    const _isCanDelete = isEmpty(ref.current!.innerText)

    setIsCanDelete(_isCanDelete)
    setTriggerKey(event.key)

    switch (event.code) {
      case 'ArrowUp':
        if (state.isBubbleMenuOpen) {
          event.preventDefault()
        } else {
          dispatch({
            type: 'focusBlock',
            payload: {
              blockId,
              direction: 'up'
            }
          })
        }
        break

      case 'ArrowDown':
        if (state.isBubbleMenuOpen) {
          event.preventDefault()
        } else {
          dispatch({
            type: 'focusBlock',
            payload: {
              blockId,
              direction: 'down'
            }
          })
        }
        break

      case 'Enter':
        if (state.isBubbleMenuOpen) {
          event.preventDefault()
        } else if (!multiple) {
          if (enterBehavior === 'newBlock') {
            dispatch({
              type: 'addBlock',
              payload: {
                block: {
                  ...blockByType('text'),
                  placeholder
                },
                afterId: blockId
              }
            })
          } else if (enterBehavior === 'focusBlock') {
            dispatch({
              type: 'focusBlock',
              payload: {
                blockId,
                direction: 'down'
              }
            })
          }

          event.preventDefault()
        }
        break

      case 'Backspace':
        if (!state.isBubbleMenuOpen && _isCanDelete) {
          dispatch({
            type: 'deleteBlock',
            payload: {
              blockId,
              backspaceEvent: true
            }
          })
          event.preventDefault()
        }
        break

      case 'Escape':
        if (state.isBubbleMenuOpen) {
          event.preventDefault()
        }
        break
    }
  }

  function handleKeyUp() {
    if (isCompositing) {
      return
    }

    if (!state.isBubbleMenuOpen) {
      handleMouseUp()
    }
  }

  function handleInput() {
    if (isCompositing) {
      return
    }

    if (state.isBubbleMenuOpen && isEmpty(ref.current!.innerHTML)) {
      hideBubbleMenu()
    }

    throttledUpdate()
  }

  function handleMouseUp() {
    if (!enableTextFormat) {
      return
    }

    const sel = window.getSelection()

    if (sel) {
      const text = sel.toString()

      if (isValid(text)) {
        dispatch({
          type: 'update',
          payload: {
            isBubbleMenuOpen: true,
            bubbleMenuRange: sel!.getRangeAt(0).cloneRange(),
            enableFormats
          }
        })
      }
    }
  }

  function hideBubbleMenu() {
    dispatch({
      type: 'update',
      payload: {
        isBubbleMenuOpen: false,
        bubbleMenuRange: undefined,
        enableFormats: undefined,
        textSelection: undefined
      }
    })
  }

  function handlePaste(event: any) {
    event.preventDefault()

    if (!state.isBubbleMenuOpen) {
      // TODO - paste html
      insertClipboardText(event)
    }
  }

  function handleFocus() {
    if (state.focusBlockId !== blockId) {
      dispatch({
        type: 'focusBlock',
        payload: {
          blockId
        }
      })
    }
  }

  function handleComposition(event: any) {
    switch (event.type) {
      case 'compositionstart':
        setIsCompositing(true)
        break

      case 'compositionend':
        setIsCompositing(false)
        throttledUpdate()
        break
    }
  }

  function handleUpdate() {
    let html = enableTextFormat ? ref.current!.innerHTML : ref.current!.innerText

    if (html === '<br>') {
      ref.current!.innerHTML = ''
      html = ''
    }

    dispatch({
      type: 'updateBlock',
      payload: {
        blockId,
        updates: {
          html
        }
      }
    })
    onChange?.(html)
  }

  const handleCompositionCallback = useCallback(handleComposition, [ref.current])
  const handleKeyDownCallback = useCallback(handleKeyDown, [
    ref.current,
    isCompositing,
    isCanDelete,
    blockId,
    state.blocks,
    state.isBubbleMenuOpen
  ])
  const handleKeyUpCallback = useCallback(handleKeyUp, [
    isCompositing,
    triggerKey,
    state.isBubbleMenuOpen
  ])
  const handleInputCallback = useCallback(handleInput, [
    isCompositing,
    triggerKey,
    state.textSelection,
    state.isBubbleMenuOpen
  ])
  const handlePasteCallback = useCallback(handlePaste, [])
  const handleFocusCallback = useCallback(handleFocus, [state.focusBlockId, blockId])
  const handleMouseUpCallback = useCallback(handleMouseUp, [ref.current])
  const throttledUpdate = useCallback(throttle(handleUpdate, 200), [ref.current])

  // Focus when selected
  useEffect(() => {
    // Don't change cart if BubbleMenu is open
    if (ref.current && !state.isBubbleMenuOpen && state.focusBlockId === blockId) {
      placeCaretAtEnd(ref.current)
    }
  }, [ref, state.isBubbleMenuOpen, state.focusBlockId])

  // Setup initial html
  useEffect(() => {
    if (ref.current && isValid(value)) {
      // TODO enableTextFormat
      ref.current.innerHTML = sanitizeHTML(value!)
    }
  }, [ref])

  return (
    <CustomTag
      ref={ref}
      className={clsx('rich-text', className)}
      placeholder={placeholder}
      contentEditable={true}
      onCompositionStart={handleCompositionCallback}
      onCompositionEnd={handleCompositionCallback}
      onKeyDown={handleKeyDownCallback}
      onKeyUp={handleKeyUpCallback}
      onInput={handleInputCallback}
      onPaste={handlePasteCallback}
      onFocus={handleFocusCallback}
      onMouseUp={handleMouseUpCallback}
      suppressContentEditableWarning={true}
      tabIndex={0}
      spellCheck={true}
      style={style}
    />
  )
}

export const RichText = RichTextComponent
