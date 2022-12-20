import { Button, Dropdown, Menus, stopPropagation } from '@heyforms/ui'
import { IComponentProps } from '@heyforms/ui/types/typing'
import { IconDotsVertical } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, useMemo, useState } from 'react'

import { BLOCK_OPTIONS } from '~/constants'
import { useBuilderContext } from '~/layout/builder/context'

interface BlockCardProps {
  block: Block
  selectedId?: string
}

interface BlockIconProps extends IComponentProps {
  options?: BlockOption[]
  type: BlockType
}

export const BlockIcon: FC<BlockIconProps> = ({
  options = BLOCK_OPTIONS,
  type,
  className,
  style,
  ...restProps
}) => {
  const option = useMemo(() => {
    return options.find(c => c.type === type)
  }, [type])

  return (
    <div
      className={clsx('flex items-center justify-center rounded w-6 h-6 px-0.5', className)}
      style={style}
      {...restProps}
    >
      {option?.icon && <option.icon className="p-0 m-0" />}
    </div>
  )
}

export const BlockIconName: FC<Partial<BlockIconProps>> = ({ type, className, ...restProps }) => {
  const { t } = useTranslation()
  const label = useMemo(() => BLOCK_OPTIONS.find(o => o.type === type)?.label, [type])

  return (
    <div className={clsx('flex items-center', className)} {...restProps}>
      <BlockIcon className="ml-1 text-slate-700" type={type!} />
      <div className="flex-1 ml-2 text-sm">{t(label!)}</div>
    </div>
  )
}

export const BlockCard: FC<BlockCardProps> = ({ block, selectedId }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()
  const [isOpen, setIsOpen] = useState(false)

  const isSelected = useMemo(() => selectedId === block.id, [selectedId, block.id])
  const label = useMemo(() => BLOCK_OPTIONS.find(o => o.type === block.type)?.label, [block.type])

  function handleSelectBlock() {
    dispatch({
      type: 'selectBlock',
      payload: {
        blockId: block.id
      }
    })
  }

  function handleClick() {
    handleSelectBlock()
    document.getElementById(`block-${block.id}`)?.scrollIntoView()
  }

  function handleVisibleChange(visible: boolean) {
    setIsOpen(visible)

    if (visible) {
      handleSelectBlock()
    }
  }

  function handleMenuClick(name?: any) {
    switch (name) {
      case 'duplicate':
        dispatch({
          type: 'duplicateBlock',
          payload: {
            blockId: block.id
          }
        })
        break

      case 'delete':
        dispatch({
          type: 'deleteBlock',
          payload: {
            blockId: block.id
          }
        })
        break
    }
  }

  const DropdownTrigger = useMemo(
    () => (
      <Button.Link
        className="block-card-action w-6 h-6"
        leading={<IconDotsVertical />}
        onMouseDown={stopPropagation}
      />
    ),
    []
  )

  const DropdownOverlay = useMemo(
    () => (
      <Menus className="text-sm" onClick={handleMenuClick}>
        <Menus.Item value="duplicate" label={t('common.duplicate')} />
        <Menus.Item value="delete" className="text-red-700" label={t('common.delete')} />
      </Menus>
    ),
    [block]
  )

  return (
    <div
      className={clsx('block-card', {
        'block-card-selected': isSelected
      })}
      onClick={handleClick}
    >
      <BlockIconName className="flex-1" type={block.type} />
      <Dropdown
        className={clsx('block-card-menu', {
          'block-card-menu-open': isOpen || isSelected
        })}
        placement="bottom-start"
        overlay={DropdownOverlay}
        onDropdownVisibleChange={handleVisibleChange}
      >
        {DropdownTrigger}
      </Dropdown>
    </div>
  )
}
