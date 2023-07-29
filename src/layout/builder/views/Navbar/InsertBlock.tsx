import { Dropdown, Input } from '@heyforms/ui'
import { IComponentProps } from '@heyforms/ui/types/typing'
import { isValid } from '@nily/utils'
import { IconPlus } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { startTransition, useCallback, useMemo, useState } from 'react'

import { BLOCK_GROUP_OPTIONS, BLOCK_OPTIONS } from '~/constants'
import { BlockIcon } from '~/layout/builder/views/LeftSidebar/BlockCard'

import { useBuilderContext } from '../../context'
import { blockByType } from '../../utils'

interface MenuProps extends Omit<IComponentProps, 'onClick'> {
  onClick: (type: BlockType) => void
}

interface ItemProps {
  option: BlockOption
  onClick: (type: BlockType) => void
}

const Item: FC<ItemProps> = ({ option, onClick }) => {
  const { t } = useTranslation()

  function handleClick() {
    onClick(option.type)
  }

  return (
    <div
      className="group flex items-center mx-2 p-2 text-sm font-normal rounded-md cursor-pointer hover:bg-slate-100"
      onClick={handleClick}
    >
      <BlockIcon className="mr-3 flex-shrink-0" type={option.type} />
      {t(option.label)}
    </div>
  )
}

function filterGroups(keyword?: string): BlockGroupOptions[] {
  let options: BlockOption[] = BLOCK_OPTIONS

  if (isValid(keyword)) {
    options = BLOCK_OPTIONS.filter(option =>
      option.label.toLowerCase().includes(keyword!.toLowerCase())
    )
  }

  return BLOCK_GROUP_OPTIONS.map(group => ({
    ...group,
    options: options.filter(option => group.types.includes(option.type))
  })).filter(group => group.options.length > 0)
}

const Menu: FC<MenuProps> = ({ onClick }) => {
  const { t } = useTranslation()
  const [groups, setGroups] = useState<BlockGroupOptions[]>(filterGroups())

  function handleKeywordChange(value?: any) {
    startTransition(() => {
      const result = filterGroups(value as string)
      setGroups(result)
    })
  }

  // useLayoutEffect(() => {
  //   const container = document.querySelector('.insert-block-groups')
  //   const elements: HTMLDivElement[] = Array.from(
  //     container!.querySelectorAll('.insert-block-group')
  //   )
  //   const columns = Array.from({ length: 4 }).fill(0) as number[]
  //   const gap = 36
  //
  //   for (const element of elements) {
  //     const rect = element.getBoundingClientRect()
  //     const min = Math.min(...columns)
  //     const idx = columns.indexOf(min)
  //
  //     columns[idx] = columns[idx] + rect.height + gap
  //     element.style.top = `${min}px`
  //     element.style.left = `${25 * idx}%`
  //   }
  // }, [groups])

  const handleKeywordChangeCallback = useCallback(handleKeywordChange, [])

  return (
    <div className="flex flex-col rounded-md shadow-lg bg-white">
      <Input.Search
        className="insert-block-search px-4 !border-x-0 !border-t-0 border-slate-100 outline-none shadow-none rounded-none"
        placeholder={t('builder.searchBlockType')}
        onChange={handleKeywordChangeCallback}
      />
      <div className="w-[22rem] h-[30rem] pb-4 scrollbar">
        {groups.map(group => (
          <div key={group.label} className="pt-4">
            <div className="uppercase mb-0.5 pl-4 text-xs font-medium text-slate-500">
              {t(group.label)}
            </div>
            {BLOCK_OPTIONS.filter(option => group.types.includes(option.type)).map(option => (
              <Item key={option.type} option={option} onClick={onClick} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export const InsertBlock = () => {
  const { state, dispatch } = useBuilderContext()
  const [visible, setVisible] = useState(false)

  const handleAddBlock = useCallback(
    (type: BlockType) => {
      setVisible(false)

      const block = blockByType(type)

      dispatch({
        type: 'addBlock',
        payload: {
          block,
          afterId: state.selectBlockId
        }
      })

      setTimeout(() => {
        document.getElementById(`block-${block.id}`)?.scrollIntoView()
      }, 100)
    },
    [state.selectBlockId]
  )

  const dropdownTrigger = useMemo(
    () => (
      <>
        <IconPlus className="w-5 h-5" />
        <span className="text-[0.6875rem]">Add</span>
      </>
    ),
    []
  )
  const dropdownOverlay = useMemo(
    () => (visible ? <Menu onClick={handleAddBlock} /> : <></>),
    [visible]
  )

  return (
    <Dropdown
      className="flex flex-col items-center mx-1.5 px-2 py-1.5 min-w-[2.5rem] rounded cursor-pointer text-slate-700 hover:bg-slate-100 addBlock"
      popupClassName="insert-block-popup"
      visible={visible}
      placement="bottom-start"
      dismissOnClickInside={false}
      overlay={dropdownOverlay}
      onDropdownVisibleChange={setVisible}
    >
      {dropdownTrigger}
    </Dropdown>
  )
}
