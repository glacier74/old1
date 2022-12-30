import { Button, Form, Input, Portal, Tooltip } from '@heyforms/ui'
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconItalic,
  IconLink,
  IconLinkOff,
  IconStrikethrough,
  IconUnderline
} from '@tabler/icons'
import clsx from 'clsx'
import {
  CSSProperties,
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useClickAway } from 'react-use'

import { useBuilderContext } from '../context'

interface ActiveState {
  isBold: boolean
  isItalic: boolean
  isStrikethrough: boolean
  isUnderline: boolean
  align: 'justifyLeft' | 'justifyCenter' | 'justifyRight'
  foreColor?: string
  backColor?: string
  link?: string
}

function getActiveState() {
  const state: ActiveState = {
    isBold: document.queryCommandState('bold'),
    isItalic: document.queryCommandState('italic'),
    isStrikethrough: document.queryCommandState('strikethrough'),
    isUnderline: document.queryCommandState('underline'),
    align: 'justifyLeft',
    foreColor: undefined,
    backColor: undefined,
    link: undefined
  }

  if (document.queryCommandState('justifyCenter')) {
    state.align = 'justifyCenter'
  } else if (document.queryCommandState('justifyRight')) {
    state.align = 'justifyRight'
  }

  if (document.queryCommandValue) {
    state.foreColor = document.queryCommandValue('foreColor')
    state.backColor = document.queryCommandValue('backColor')
  }

  const sel = window.getSelection()

  if (sel) {
    state.link = sel.anchorNode?.parentElement?.closest('a')?.href
  }

  return state
}

function getPortalStyle(ref: MutableRefObject<HTMLDivElement | null>, range?: Range) {
  if (!ref.current || !range) {
    return
  }

  const padding = 8
  const bubbleRect = ref.current.getBoundingClientRect()
  let rangeRect: DOMRect | undefined = range.getBoundingClientRect()

  // Handle state.bubbleMenuRange zero rect
  if (rangeRect.top < 1 || rangeRect.width < 1 || rangeRect.height < 1) {
    rangeRect = window.getSelection()?.getRangeAt(0)?.getBoundingClientRect()
  }

  if (rangeRect) {
    const style: CSSProperties = {
      position: 'fixed',
      left: rangeRect.left + rangeRect.width / 2 - bubbleRect.width / 2,
      top: rangeRect.top - bubbleRect.height - padding
    }

    // Display BubbleMenu below selection
    if (style.top! < 0) {
      style.top = rangeRect.top + rangeRect.height + padding
    }

    return style
  }
}

export const BubbleMenu: FC = () => {
  const { state, dispatch } = useBuilderContext()
  const menuRef = useRef<HTMLDivElement | null>(null)

  const [activeState, setActiveState] = useState({} as ActiveState)
  const [portalStyle, setPortalStyle] = useState<CSSProperties>()
  const [linkBubbleVisible, setLinkBubbleVisible] = useState(false)

  function handleExecCommand(command: string) {
    document.execCommand(command)
    setActiveState(getActiveState())
  }

  function handleBold() {
    handleExecCommand('bold')
  }

  function handleItalic() {
    handleExecCommand('italic')
  }

  function handleStrike() {
    handleExecCommand('strikeThrough')
  }

  function handleUnderline() {
    handleExecCommand('underline')
  }

  const handleAlignLeft = useCallback(() => {
    handleExecCommand('justifyLeft')
    setPortalStyle(getPortalStyle(menuRef, state.bubbleMenuRange))
  }, [menuRef, state.bubbleMenuRange])

  const handleAlignCenter = useCallback(() => {
    handleExecCommand('justifyCenter')
    setPortalStyle(getPortalStyle(menuRef, state.bubbleMenuRange))
  }, [menuRef, state.bubbleMenuRange])

  const handleAlignRight = useCallback(() => {
    handleExecCommand('justifyRight')
    setPortalStyle(getPortalStyle(menuRef, state.bubbleMenuRange))
  }, [menuRef, state.bubbleMenuRange])

  function handleLinkOpen() {
    setLinkBubbleVisible(true)
  }

  async function handleLink({ url }: any) {
    handleSelectRange()
    document.execCommand('createlink', false, url)

    handleClose()
  }

  function handleUnlink() {
    handleExecCommand('unlink')
  }

  function handleSelectRange() {
    const sel = window.getSelection()
    sel!.removeAllRanges()
    sel!.addRange(state.bubbleMenuRange!)

    return sel
  }

  function handleClose() {
    setLinkBubbleVisible(false)
    dispatch({
      type: 'update',
      payload: {
        isBubbleMenuOpen: false,
        bubbleMenuRange: undefined,
        enableFormats: undefined
      }
    })
  }

  useClickAway(menuRef, () => {
    handleClose()
  })

  useEffect(() => {
    if (state.isBubbleMenuOpen && menuRef) {
      setActiveState(getActiveState())
      setPortalStyle(getPortalStyle(menuRef, state.bubbleMenuRange))
    }

    return () => {
      setActiveState({} as ActiveState)
    }
  }, [state.bubbleMenuRange, menuRef, state.isBubbleMenuOpen])

  return (
    <Portal visible={state.isBubbleMenuOpen}>
      <div ref={menuRef} className="bubble-menu" style={portalStyle}>
        <div className="bg-white shadow py-1.5 px-2 rounded">
          {linkBubbleVisible ? (
            <Form.Custom
              inline
              initialValues={{
                url: activeState.link
              }}
              submitText="Apply"
              submitOptions={{
                className: 'ml-1',
                type: 'success'
              }}
              onlySubmitOnValueChange={true}
              request={handleLink}
            >
              <Form.Item name="url" rules={[{ required: true }]}>
                <Input placeholder="Paste or enter link here" />
              </Form.Item>
            </Form.Custom>
          ) : (
            <div className="bubble-menu-container">
              {state.enableFormats?.includes('basic') && (
                <div className="flex items-center space-x-1.5">
                  <Tooltip ariaLabel="Bold">
                    <Button.Link
                      className={clsx({
                        'bubble-menu-active': activeState.isBold
                      })}
                      leading={<IconBold />}
                      onClick={handleBold}
                    />
                  </Tooltip>
                  <Tooltip ariaLabel="Italic">
                    <Button.Link
                      className={clsx({
                        'bubble-menu-active': activeState.isItalic
                      })}
                      leading={<IconItalic />}
                      onClick={handleItalic}
                    />
                  </Tooltip>
                  <Tooltip ariaLabel="Strikethrough">
                    <Button.Link
                      className={clsx({
                        'bubble-menu-active': activeState.isStrikethrough
                      })}
                      leading={<IconStrikethrough />}
                      onClick={handleStrike}
                    />
                  </Tooltip>
                  <Tooltip ariaLabel="Underline">
                    <Button.Link
                      className={clsx({
                        'bubble-menu-active': activeState.isUnderline
                      })}
                      leading={<IconUnderline />}
                      onClick={handleUnderline}
                    />
                  </Tooltip>
                  <Tooltip ariaLabel="Link">
                    <Button.Link
                      className={clsx({
                        'bubble-menu-active': !!activeState.link
                      })}
                      leading={<IconLink />}
                      onClick={handleLinkOpen}
                    />
                  </Tooltip>
                  {activeState.link && (
                    <Tooltip ariaLabel="Link off">
                      <Button.Link leading={<IconLinkOff />} onClick={handleUnlink} />
                    </Tooltip>
                  )}
                </div>
              )}

              {state.enableFormats?.includes('align') && (
                <div className="flex items-center pl-1.5 space-x-1.5">
                  <Tooltip ariaLabel="Align left">
                    <Button.Link
                      className={clsx({
                        'bubble-menu-active': activeState.align === 'justifyLeft'
                      })}
                      leading={<IconAlignLeft />}
                      onClick={handleAlignLeft}
                    />
                  </Tooltip>
                  <Tooltip ariaLabel="Align center">
                    <Button.Link
                      className={clsx({
                        'bubble-menu-active': activeState.align === 'justifyCenter'
                      })}
                      leading={<IconAlignCenter />}
                      onClick={handleAlignCenter}
                    />
                  </Tooltip>
                  <Tooltip ariaLabel="Align right">
                    <Button.Link
                      className={clsx({
                        'bubble-menu-active': activeState.align === 'justifyRight'
                      })}
                      leading={<IconAlignRight />}
                      onClick={handleAlignRight}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Portal>
  )
}
