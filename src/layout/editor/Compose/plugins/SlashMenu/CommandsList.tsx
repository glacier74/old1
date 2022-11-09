import { TablerIconProps } from '@tabler/icons'
import { Editor, Range } from '@tiptap/core'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

export type CommandProps = {
  editor: Editor
  range: Range
}

export interface CommandItem {
  title: string
  icon: FC<TablerIconProps>
  command: (props: CommandProps) => void
}

export interface CommandsListProps {
  items: CommandItem[]
  selectedIndex: number
  selectItem: (index: number) => void
}

export const CommandsList: FC<CommandsListProps> = ({ items, selectedIndex, selectItem }) => {
  const { t } = useTranslation()

  return (
    <ul className="bg-white shadow py-1 rounded">
      {items.map(({ title, icon: Icon }, index) => (
        <li
          className={clsx('flex items-center p-2 text-sm cursor-pointer hover:bg-gray-100', {
            'bg-gray-200': index === selectedIndex
          })}
          key={index}
          onClick={() => selectItem(index)}
        >
          <Icon className="w-5 h-5 text-slate-500" />
          <span className="ml-2 text-slate-800">{t(title)}</span>
        </li>
      ))}
    </ul>
  )
}
