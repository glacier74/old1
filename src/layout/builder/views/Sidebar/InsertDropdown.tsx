import { Button, Dropdown, Input, Tooltip } from '@heyforms/ui'
import type { InputValue } from '@heyforms/ui/types/input/Input'
import { IComponentProps } from '@heyforms/ui/types/typing'
import { isValid } from '@nily/utils'
import { IconPlus } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { startTransition, useCallback, useMemo, useState } from 'react'

import { BLOCK_GROUP_OPTIONS, BLOCK_OPTIONS } from '~/constants'
import { useProduct } from '~/layout'

import { useBuilderContext } from '../../context'
import { blockByType } from '../../utils'
import { BlockIcon } from './BlockCard'

interface InsertBlockMenuProps extends Omit<IComponentProps, 'onClick'> {
  onClick: (type: BlockType) => void
}

interface InsertBlockItemProps {
  option: BlockOption
  onClick: (type: BlockType) => void
}

const InsertBlockItem: FC<InsertBlockItemProps> = ({ option, onClick }) => {
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

const InsertBlockMenu: FC<InsertBlockMenuProps> = ({ onClick }) => {
  const { t } = useTranslation()
  const [groups, setGroups] = useState<BlockGroupOptions[]>(filterGroups())

  function handleKeywordChange(value?: InputValue) {
    startTransition(() => {
      const result = filterGroups(value as string)
      setGroups(result)
    })
  }

  // useLayoutEffect(() => {
  //   const container = document.querySelector('.insert-field-groups')
  //   const elements: HTMLDivElement[] = Array.from(
  //     container!.querySelectorAll('.insert-field-group')
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
    <div className="flex flex-col ml-1 rounded-md shadow-lg bg-white">
      <Input.Search
        className="insert-field-search px-4 border-gray-200 outline-none focus:!outline-none focus:!shadow-none rounded-none border-t-0 border-r-0 border-l-0"
        placeholder={t('builder.searchBlockType')}
        onChange={handleKeywordChangeCallback}
      />
      <div className="w-[22rem] h-[32rem] pb-4 scrollbar">
        {groups.map(group => (
          <div key={group.label} className="pt-4">
            <div className="uppercase mb-0.5 pl-4 text-xs font-medium text-slate-500">
              {t(group.label)}
            </div>
            {BLOCK_OPTIONS.filter(option => group.types.includes(option.type)).map(option => (
              <InsertBlockItem key={option.type} option={option} onClick={onClick} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export const InsertDropdown = () => {
  const { state, dispatch } = useBuilderContext()
  const { t } = useTranslation()
  const product = useProduct()
  const [visible, setVisible] = useState(false)

  const handleCreateField = useCallback(
    (type: BlockType) => {
      setVisible(false)
      dispatch({
        type: 'addBlock',
        payload: {
          block: blockByType(type, undefined, product),
          afterId: state.selectBlockId
        }
      })
    },
    [state.selectBlockId, product]
  )

  const dropdownTrigger = useMemo(
    () => (
      <Tooltip ariaLabel={t('builder.addNewBlock')}>
        <Button.Link className="builder-create-button w-6 h-6" leading={<IconPlus />} />
      </Tooltip>
    ),
    []
  )
  const dropdownOverlay = useMemo(
    () => (visible ? <InsertBlockMenu onClick={handleCreateField} /> : <></>),
    [visible]
  )

  return (
    <Dropdown
      className="insert-field-dropdown w-6 h-6 -mr-2 rounded-md text-slate-500 hover:bg-slate-50 cursor-pointer"
      popupClassName="insert-field-popup"
      visible={visible}
      placement="right-start"
      dismissOnClickInside={false}
      overlay={dropdownOverlay}
      onDropdownVisibleChange={setVisible}
    >
      {dropdownTrigger}
    </Dropdown>
  )
}
