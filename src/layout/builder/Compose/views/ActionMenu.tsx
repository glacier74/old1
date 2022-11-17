import { Button, Dropdown, Menus, Portal, Tooltip } from '@heyforms/ui'
import { deepClone } from '@nily/utils'
import {
  IconBox,
  IconCopy,
  IconCreditCard,
  IconGripVertical,
  IconPlus,
  IconSlideshow,
  IconTrash,
  IconTypography
} from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { CSSProperties, FC, MouseEvent, useRef, useState } from 'react'
import { ConnectDragSource } from 'react-dnd'
import { useClickAway } from 'react-use'

import { useVisible } from '~/utils'

import { BlockProps } from '../blocks/Block'
import { FeatureSettings } from '../blocks/Feature'
import { PaymentSettings } from '../blocks/Payment'
import { useComposeStore } from '../store'
import { blockByType, duplicateBlock, getStyleFromRect } from '../utils'

interface ActionMenuProps extends Pick<BlockProps, 'block'> {
  connectDrag: ConnectDragSource
}

export const ActionMenu: FC<ActionMenuProps> = ({ block, connectDrag }) => {
  const { t } = useTranslation()
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

  function handleDuplicate() {
    dispatch({
      type: 'addBlock',
      payload: {
        block: duplicateBlock(deepClone(block)),
        afterId: block.id
      }
    })
  }

  const InsertOverlay = (
    <Menus onClick={handleMenuClick}>
      <Menus.Item value="paragraph" icon={<IconTypography />} label={t('builder.paragraph.name')} />
      <Menus.Item value="feature" icon={<IconBox />} label={t('builder.feature.name')} />
      <Menus.Item value="payment" icon={<IconCreditCard />} label={t('builder.payment.name')} />
      <Menus.Item
        value="slideGallery"
        icon={<IconSlideshow />}
        label={t('builder.slideGallery.name')}
      />
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
        onClick={handleDuplicate}
      />
      <Menus.Item
        value="delete"
        label={
          <div className="flex items-center">
            <IconTrash />
            <span>Delete</span>
          </div>
        }
        onClick={handleDelete}
      />
    </>
  )

  const SettingsOverlay = (
    <Menus className="block-settings">
      {(() => {
        switch (block.type) {
          case 'feature':
            return <FeatureSettings block={block as any} />

          case 'payment':
            return <PaymentSettings block={block as any} />
        }
      })()}

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
          <Dropdown className="block-create" placement="bottom-start" overlay={InsertOverlay}>
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
