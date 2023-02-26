import { Button, Dropdown, Menus, stopPropagation } from '@heyforms/ui'
import { IconDotsVertical } from '@tabler/icons'
import clsx from 'clsx'
import { FC, useMemo, useState } from 'react'

import {
  IconEmailCapture,
  IconFaq,
  IconFeature,
  IconFooter,
  IconHeader,
  IconHero,
  IconTestimonial
} from '~/components'
import { BLOCKS } from '~/layout/builder2/constants'
import { useBuilderContext } from '~/layout/builder2/context'

interface BlockTypeProps extends ComponentProps {
  type: string
}

interface BlockItemProps extends ComponentProps {
  block: any
  selectedId?: string
}

const Icon: FC<BlockTypeProps> = ({ type, ...restProps }) => {
  switch (type) {
    case 'header':
      return <IconHeader {...restProps} />

    case 'hero':
      return <IconHero {...restProps} />

    case 'feature':
      return <IconFeature {...restProps} />

    case 'email_capture':
      return <IconEmailCapture {...restProps} />

    case 'testimonial':
      return <IconTestimonial {...restProps} />

    case 'faq':
      return <IconFaq {...restProps} />

    case 'footer':
      return <IconFooter {...restProps} />

    default:
      return null
  }
}

export const BlockIconText: FC<BlockTypeProps> = ({ type, className, ...restProps }) => {
  const label = useMemo(() => BLOCKS.find(b => b.type === type)?.label, [type])

  return (
    <div className={clsx('flex items-center space-x-2', className)} {...restProps}>
      <Icon className="w-5 h-5 text-slate-700" type={type} />
      <div className="flex-1 text-sm">{label}</div>
    </div>
  )
}

export const BlockItem: FC<BlockItemProps> = ({ className, block, selectedId, ...restProps }) => {
  const { dispatch } = useBuilderContext()
  const [isOpen, setIsOpen] = useState(false)
  const isSelected = useMemo(() => selectedId === block.id, [selectedId, block.id])

  function handleClick() {
    dispatch({
      type: 'selectBlock',
      payload: {
        blockId: block.id
      }
    })
  }

  function handleVisibleChange(visible: boolean) {
    setIsOpen(visible)
  }

  function handleMenuClick(name?: any) {
    switch (name) {
      case 'duplicate':
        break

      case 'delete':
        break
    }
  }

  const DropdownTrigger = useMemo(
    () => (
      <Button.Link
        className="block-item-action w-6 h-6"
        leading={<IconDotsVertical />}
        onMouseDown={stopPropagation}
      />
    ),
    []
  )

  const DropdownOverlay = useMemo(
    () => (
      <Menus className="text-sm" onClick={handleMenuClick}>
        <Menus.Item value="duplicate" label="Duplicate" />
        <Menus.Item value="delete" className="text-red-700" label="Delete" />
      </Menus>
    ),
    [block]
  )

  return (
    <div
      className={clsx('block-item', {
        'block-item-selected': isSelected
      })}
      onClick={handleClick}
      {...restProps}
    >
      <BlockIconText className="flex-1" type={block.type} />
      <Dropdown
        className={clsx('block-item-menu', {
          'block-item-menu-open': isOpen
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
