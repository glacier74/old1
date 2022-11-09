import { Editor, Range } from '@tiptap/core'
import clsx from 'clsx'
import { FC } from 'react'

export type CommandProps = {
  editor: Editor
  range: Range
}

export interface CommandItem {
  title: string
  command: (props: CommandProps) => void
}

export interface CommandsListProps {
  items: CommandItem[]
  selectedIndex: number
  selectItem: (index: number) => void
}

export const CommandsList: FC<CommandsListProps> = ({ items, selectedIndex, selectItem }) => {
  return (
    <ul className="bg-white shadow p-2 space-y-2 rounded">
      {items.map(({ title }, index) => (
        <li
          className={clsx({ 'bg-gray-200': index === selectedIndex })}
          key={index}
          onClick={() => selectItem(index)}
        >
          {title}
        </li>
      ))}
    </ul>
  )
}
