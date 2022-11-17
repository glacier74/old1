import { Menus, Portal } from '@heyforms/ui'
import { IComponentProps } from '@heyforms/ui/types/typing'
import { isEmpty, isValidArray } from '@nily/utils'
import { IconBox, IconCreditCard, IconSlideshow, IconTypography } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

import { useComposeStore } from '../store'
import { blockByType } from '../utils'
import emitter from '../utils/emitter'

export interface SubMenuOption {
  type: BlockType
  icon?: ReactNode
  label: string
}

interface MenuOption {
  name: string
  children: SubMenuOption[]
}

const blockOptions: MenuOption[] = [
  {
    name: 'Basic',
    children: [
      {
        type: 'paragraph',
        label: 'builder.paragraph.name',
        icon: <IconTypography />
      }
    ]
  },
  {
    name: 'Fieldset',
    children: [
      {
        type: 'feature',
        label: 'builder.feature',
        icon: <IconBox />
      },
      {
        type: 'payment',
        label: 'builder.payment.name',
        icon: <IconCreditCard />
      },
      {
        type: 'slideGallery',
        label: 'builder.slideGallery.name',
        icon: <IconSlideshow />
      }
    ]
  }
]

export const CommandMenu: FC<IComponentProps> = ({ style, ...restProps }) => {
  const { t } = useTranslation()
  const { state, dispatch } = useComposeStore()

  const ref = useRef<HTMLDivElement | null>(null)
  const [focused, setFocused] = useState<BlockType | null>(null)

  const options = useMemo(() => {
    if (isEmpty(state.searchKeyword)) {
      return blockOptions
    }

    return blockOptions
      .map(option => {
        const children = option.children.filter(row => {
          return row.label.toLowerCase().includes(state.searchKeyword!.toLowerCase())
        })

        if (isValidArray(children)) {
          return {
            name: option.name,
            children
          }
        }
      })
      .filter(Boolean) as MenuOption[]
  }, [state.searchKeyword])

  const flatOptions = useMemo(
    () => options.reduce<SubMenuOption[]>((prev, row) => [...prev, ...row!.children], []),
    [options]
  )

  function handleClose() {
    setFocused(null)

    dispatch({
      type: 'update',
      payload: {
        isCommandMenuOpen: false,
        searchKeyword: undefined
      }
    })
  }

  function selectOption(type?: BlockType) {
    const _type = type || focused
    const option = flatOptions.find(row => row.type === _type)

    if (option) {
      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: state.selectedBlockId,
          updates: blockByType(_type!, state.selectedBlockId)
        } as any
      })
    }

    handleClose()
  }

  function focusOption(direction: 'up' | 'down' | 'first' | 'last') {
    if (isEmpty(flatOptions)) {
      return
    }

    let index = flatOptions.findIndex(row => row.type === focused)

    switch (direction) {
      case 'first':
        index = 0
        break

      case 'last':
        index = -1
        break

      case 'up':
        index = index >= 0 ? index - 1 : 0
        break

      case 'down':
        index = index < flatOptions.length - 1 ? index + 1 : 0
        break
    }

    setFocused(flatOptions.at(index)!.type)
  }

  useEffect(() => {
    if (isValidArray(flatOptions)) {
      const index = flatOptions.findIndex(o => o.type === focused)

      if (index < 0) {
        setFocused(flatOptions.at(0)!.type)
      }
    }
  }, [flatOptions])

  useEffect(() => {
    emitter.on('selectOption', selectOption)

    return () => {
      emitter.off('selectOption')
    }
  }, [flatOptions, focused, state.selectedBlockId])

  useEffect(() => {
    emitter.on('focusOption', focusOption)

    return () => {
      emitter.off('focusOption')
    }
  }, [flatOptions, focused])

  useClickAway(ref, () => {
    handleClose()
  })

  return (
    <Portal visible={state.isCommandMenuOpen}>
      <div
        ref={ref}
        className="command-menu"
        style={{
          ...style,
          ...state.textSelection?.rect
        }}
        {...restProps}
      >
        <Menus onClick={selectOption}>
          {options.length > 0 ? (
            options.map(option => (
              <div key={option.name}>
                <Menus.Label label={t(option.name)} />
                {option.children.map(row => (
                  <Menus.Item value={row.type} icon={row.icon} label={t(row.label)} />
                ))}
              </div>
            ))
          ) : (
            <span>No search results</span>
          )}
        </Menus>
      </div>
    </Portal>
  )
}
