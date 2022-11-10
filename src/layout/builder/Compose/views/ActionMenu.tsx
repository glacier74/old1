import { Button, Dropdown, Menus, Portal, Tooltip } from '@heyforms/ui'
import { IconCopy, IconGripVertical, IconPlus, IconTrash } from '@tabler/icons'
import clsx from 'clsx'
import { CSSProperties, FC, MouseEvent, useRef, useState } from 'react'
import { ConnectDragSource } from 'react-dnd'
import { useClickAway } from 'react-use'

import { useVisible } from '~/utils'

import { BlockProps } from '../blocks/Block'
import { FeatureSettings } from '../blocks/Feature'
import { useComposeStore } from '../store'
import { blockByType, getStyleFromRect } from '../utils'

interface ActionMenuProps extends Pick<BlockProps, 'block'> {
  connectDrag: ConnectDragSource
}

export const ActionMenu: FC<ActionMenuProps> = ({ block, connectDrag }) => {
  const { state, dispatch } = useComposeStore()
  const [visible, open, close] = useVisible()

  const ref = useRef<HTMLDivElement | null>(null)
  const settingsRef = useRef<HTMLDivElement | null>(null)
  const [portalStyle, setPortalStyle] = useState<CSSProperties>()

  function handleDelete() {
    dispatch({
      type: 'deleteBlock',
      payload: {
        blockId: block.id
      }
    })
  }

  function handleButtonClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    const rect = ref.current!.getBoundingClientRect()

    open()
    setPortalStyle(getStyleFromRect(rect))

    // Focus current block
    dispatch({
      type: 'focusBlock',
      payload: {
        blockId: block.id
      }
    })
  }

  function handleMenuClick(type: BlockType) {
    dispatch({
      type: 'addBlock',
      payload: {
        block: blockByType(type),
        afterId: block.id
      }
    })
  }

  const InsertOverlay = (
    <Menus onClick={handleMenuClick}>
      <Menus.Item value="feature" label="Feature" />
      <Menus.Item value="payment" label="Payment" />
      <Menus.Item value="slide-gallery" label="Slide gallery" />
    </Menus>
  )

  const CommonMenus = (
    <>
      <Menus.Item
        value="duplicate"
        label={
          <div className="flex items-center">
            <IconCopy />
            <span>Duplicate</span>
          </div>
        }
      />
      <Menus.Item
        value="delete"
        label={
          <div className="flex items-center">
            <IconTrash />
            <span>Delete</span>
          </div>
        }
      />
    </>
  )

  const SettingsOverlay = (
    <Menus className="block-settings">
      <Menus.Label className="uppercase" label="Options" />
      <FeatureSettings block={block as any} />
      <Menus.Divider />
      {CommonMenus}
    </Menus>
  )

  connectDrag(ref)
  useClickAway(settingsRef, close)

  return (
    <>
      <div
        className={clsx('block-actions', {
          'block-actions-active': state.selectedBlockId === block.id
        })}
      >
        <Tooltip ariaLabel="Delete this block">
          <Button.Link className="block-delete" leading={<IconTrash />} onClick={handleDelete} />
        </Tooltip>
        <Tooltip ariaLabel="Insert block below">
          <Dropdown className="block-create" overlay={InsertOverlay}>
            <Button.Link leading={<IconPlus />} />
          </Dropdown>
        </Tooltip>
        <div ref={ref} className="flex items-center justify-center">
          <Tooltip
            ariaLabel={
              <>
                <p>
                  <strong>Drag</strong> to reorder blocks
                </p>
                <p>
                  <strong>Click</strong> to open block options
                </p>
              </>
            }
          >
            <Button.Link
              className="!cursor-grab"
              leading={<IconGripVertical />}
              onClick={handleButtonClick}
            />
          </Tooltip>
        </div>
      </div>

      <Portal visible={visible}>
        <div ref={settingsRef} className="block-settings" style={portalStyle}>
          {SettingsOverlay}
        </div>
      </Portal>
    </>
  )
}
