import { Button, Dropdown, Menus, stopPropagation } from '@heyforms/ui'
import { IComponentProps } from '@heyforms/ui/types/typing'
import { IconDotsVertical } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, useMemo, useState } from 'react'

import { BLOCK_OPTIONS, BLOCK_WITH_SETTINGS } from '~/constants'
import { FeatureSettings } from '~/layout/builder/blocks/Feature'
import { FooterSettings } from '~/layout/builder/blocks/Footer'
import { HeroSectionSettings } from '~/layout/builder/blocks/HeroSection'
import { NavigationSettings } from '~/layout/builder/blocks/Navigation'
import { PaymentSettings } from '~/layout/builder/blocks/Payment'
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
        className="block-card-action w-8 h-8"
        leading={<IconDotsVertical />}
        onMouseDown={stopPropagation}
      />
    ),
    []
  )

  const SettingsMenuItem = useMemo(() => {
    if (!BLOCK_WITH_SETTINGS.includes(block.type)) {
      return null
    }

    return (
      <>
        <Menus.Label className="text-xs uppercase" label="Options" />
        {(() => {
          switch (block.type) {
            case 'feature':
              return <FeatureSettings block={block as FeatureBlock} />

            case 'payment':
              return <PaymentSettings block={block as PaymentBlock} />

            case 'navigation':
              return <NavigationSettings block={block as NavigationBlock} />

            case 'heroSection1':
              return <HeroSectionSettings block={block as HeroSectionBlock} />

            case 'footer':
              return <FooterSettings />
          }
        })()}
        <Menus.Divider />
      </>
    )
  }, [block])

  const DropdownOverlay = useMemo(
    () => (
      <Menus className="text-sm" onClick={handleMenuClick}>
        {SettingsMenuItem}
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
      <BlockIcon className="ml-4" type={block.type} />
      <div className="flex-1 ml-3 text-xs">{t(label!)}</div>
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
