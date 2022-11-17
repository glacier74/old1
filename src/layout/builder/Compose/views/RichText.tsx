import { IComponentProps } from '@heyforms/ui/types/typing'
import { isEmpty, isValid } from '@nily/utils'
import clsx from 'clsx'
import throttle from 'lodash/throttle'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import { useComposeStore } from '../store'
import {
  blockByType,
  getRichTextSelection,
  getTextPrecedingAtTrigger,
  insertClipboardText,
  placeCaretAtEnd
} from '../utils'
import emitter from '../utils/emitter'

export interface RichTextProps extends Omit<IComponentProps, 'onChange'> {
  as?: string
  blockId: string
  multiple?: boolean
  value?: string
  enableCommand?: boolean
  enableTextFormat?: boolean
  enterBehavior?: 'createBlock' | 'focusNextBlock'
  onFocus?: () => void
  onUp?: () => void
  onDown?: () => void
  onEnter?: () => void
  onDelete?: () => void
  onChange?: (value: string) => void
}

const COMMAND_TRIGGER = '/'

const RichTextComponent: FC<RichTextProps> = ({
  className,
  as: CustomTag = 'div' as any,
  blockId,
  multiple = false,
  value,
  placeholder,
  enableCommand = true,
  enableTextFormat = true,
  enterBehavior,
  style,
  onChange
}) => {
  const { state, dispatch } = useComposeStore()

  const ref = useRef<HTMLElement | null>(null)
  const [isCompositing, setIsCompositing] = useState(false)
  const [isCanDelete, setIsCanDelete] = useState(false)
  const [triggerKey, setTriggerKey] = useState<string>()

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
        if (state.isCommandMenuOpen || state.isBubbleMenuOpen) {
          state.isCommandMenuOpen && emitter.emit('focusOption', 'up')
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
        if (state.isCommandMenuOpen || state.isBubbleMenuOpen) {
          state.isCommandMenuOpen && emitter.emit('focusOption', 'down')
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
        if (state.isCommandMenuOpen || state.isBubbleMenuOpen) {
          state.isCommandMenuOpen && emitter.emit('selectOption')
          event.preventDefault()
        } else if (!multiple) {
          if (enterBehavior === 'createBlock') {
            dispatch({
              type: 'addBlock',
              payload: {
                block: {
                  ...blockByType('paragraph'),
                  placeholder
                },
                afterId: blockId
              }
            })
          } else if (enterBehavior === 'focusNextBlock') {
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
        if (!(state.isCommandMenuOpen || state.isBubbleMenuOpen) && _isCanDelete) {
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
        if (state.isCommandMenuOpen || state.isBubbleMenuOpen) {
          if (state.isCommandMenuOpen) {
            dispatch({
              type: 'update',
              payload: {
                isCommandMenuOpen: false
              }
            })
          }
          event.preventDefault()
        }
        break
    }
  }

  function handleKeyUp() {
    if (isCompositing) {
      return
    }

    if (!(state.isCommandMenuOpen || state.isBubbleMenuOpen)) {
      if (enableCommand && triggerKey === COMMAND_TRIGGER) {
        dispatch({
          type: 'update',
          payload: {
            isCommandMenuOpen: true,
            textSelection: getRichTextSelection()
          }
        })
      }

      handleMouseUp()
    }
  }

  function handleInput() {
    if (isCompositing) {
      return
    }

    if (state.isCommandMenuOpen) {
      const { startOffset } = state.textSelection!
      const preceding = getTextPrecedingAtTrigger(COMMAND_TRIGGER, startOffset)

      if (preceding.isTriggering) {
        dispatch({
          type: 'update',
          payload: {
            searchKeyword: preceding.text
          }
        })
      } else {
        hideCommandMenu()
      }
    } else if (state.isBubbleMenuOpen) {
      if (isEmpty(ref.current!.innerHTML)) {
        hideBubbleMenu()
      }
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
            bubbleMenuRange: sel!.getRangeAt(0).cloneRange()
          }
        })
      }
    }
  }

  function hideCommandMenu() {
    dispatch({
      type: 'update',
      payload: {
        isCommandMenuOpen: false,
        textSelection: undefined
      }
    })
  }

  function hideBubbleMenu() {
    dispatch({
      type: 'update',
      payload: {
        isBubbleMenuOpen: false,
        bubbleMenuRange: undefined,
        textSelection: undefined
      }
    })
  }

  function handlePaste(event: any) {
    event.preventDefault()

    if (!state.isBubbleMenuOpen) {
      if (!enableTextFormat) {
        insertClipboardText(event)
      } else {
        // TODO - paste html
        insertClipboardText(event)
      }
    }
  }

  function handleFocus() {
    dispatch({
      type: 'focusBlock',
      payload: {
        blockId
      }
    })
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
    const html = enableTextFormat ? ref.current!.innerHTML : ref.current!.innerText

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
    state.isCommandMenuOpen,
    state.isBubbleMenuOpen
  ])
  const handleKeyUpCallback = useCallback(handleKeyUp, [
    isCompositing,
    triggerKey,
    state.isCommandMenuOpen,
    state.isBubbleMenuOpen
  ])
  const handleInputCallback = useCallback(handleInput, [
    isCompositing,
    triggerKey,
    state.textSelection,
    state.isCommandMenuOpen,
    state.isBubbleMenuOpen
  ])
  const handlePasteCallback = useCallback(handlePaste, [])
  const handleFocusCallback = useCallback(handleFocus, [])
  const handleMouseUpCallback = useCallback(handleMouseUp, [ref.current])
  const throttledUpdate = useCallback(throttle(handleUpdate, 200), [ref.current])

  // Focus when selected
  useEffect(() => {
    // Don't change cart if BubbleMenu is open
    if (ref.current && !state.isBubbleMenuOpen && state.selectedBlockId === blockId) {
      placeCaretAtEnd(ref.current)
    }
  }, [ref, state.isBubbleMenuOpen, state.selectedBlockId])

  // Setup initial html
  useEffect(() => {
    if (ref.current && isValid(value)) {
      if (enableTextFormat) {
        ref.current.innerHTML = value!
      } else {
        ref.current.innerText = value!
      }
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
