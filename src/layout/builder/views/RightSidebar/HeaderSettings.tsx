import { Button, Checkbox, Input, Tooltip } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { IconChevronDown, IconChevronUp, IconGripVertical, IconTrash } from '@tabler/icons'
import { FC, startTransition, useCallback, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { v4 as uuidv4 } from 'uuid'

import { useBuilderContext } from '~/layout/builder/context'

interface LinkItemProps {
  link: NavigationLink
  onChange: (id: string, updates: AnyMap<string>) => void
  onDelete: (id: string) => void
}

const LinkItem: FC<LinkItemProps> = ({ link, onChange, onDelete }) => {
  const [isOpen, setIsOpen] = useState(link.isOpen)

  function handleDelete() {
    onDelete(link.id)
  }

  function handleEdit() {
    setIsOpen(isOpen => !isOpen)
  }

  function handleChange(updates: AnyMap<string>) {
    startTransition(() => {
      onChange(link.id, updates)
    })
  }

  function handleTitleChange(title: any) {
    handleChange({ title })
  }

  function handleUrlChange(url: any) {
    handleChange({ url })
  }

  function handleCheckboxChange(openInNewTab: any) {
    handleChange({ openInNewTab })
  }

  return (
    <div className="relative block bg-white border rounded-md px-3 py-1.5 border-slate-300">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-700">{link.title}</span>
        <div className="flex items-center space-x-1">
          <Tooltip ariaLabel="Delete link">
            <Button.Link
              className="w-6 h-6 cursor-drag"
              leading={<IconTrash />}
              onClick={handleDelete}
            />
          </Tooltip>
          <Tooltip ariaLabel="Drag to reorder links">
            <Button.Link
              className="header-drag-handle w-6 h-6 cursor-drag"
              leading={<IconGripVertical />}
            />
          </Tooltip>
          <Tooltip ariaLabel="Collapse or expand the link form">
            <Button.Link
              className="w-6 h-6 cursor-drag"
              leading={isOpen ? <IconChevronUp /> : <IconChevronDown />}
              onClick={handleEdit}
            />
          </Tooltip>
        </div>
      </div>

      {isOpen && (
        <div className="mt-2 pt-2 border-t border-slate-100 space-y-4">
          <div>
            <div className="form-item-label">Header label</div>
            <div className="form-item-content">
              <Input value={link.title} onChange={handleTitleChange} />
            </div>
          </div>

          <div>
            <div className="form-item-label">Header url</div>
            <div className="form-item-content">
              <Input type="url" value={link.url} onChange={handleUrlChange} />
            </div>
          </div>

          <div className="pb-2">
            <Checkbox value={true} checked={link.openInNewTab} onChange={handleCheckboxChange}>
              Open in new tab
            </Checkbox>
          </div>
        </div>
      )}
    </div>
  )
}

export const HeaderSettings: FC<{ block: HeaderBlock }> = ({ block }) => {
  const { dispatch } = useBuilderContext()

  const handleSetLinks = useCallback(
    (links: NavigationLink[]) => {
      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: block.id,
          updates: {
            links
          }
        }
      })
    },
    [block.id]
  )

  const handleAdd = useCallback(() => {
    handleSetLinks([
      ...block.links,
      {
        id: uuidv4(),
        title: 'Link' + (block.links.length + 1),
        url: '',
        isOpen: true
      }
    ])
  }, [block.links])

  const handleChange = useCallback(
    (id: string, updates: AnyMap<string>) => {
      handleSetLinks(block.links.map(l => (l.id === id ? { ...l, ...updates } : l)))
    },
    [block.links]
  )

  const handleDelete = useCallback(
    (id: string) => {
      handleSetLinks(block.links.filter(l => l.id !== id))
    },
    [block.links]
  )

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Links</div>
        <Button className="!px-2 !py-1" onClick={handleAdd}>
          Add
        </Button>
      </div>

      <div className="mt-3">
        {isEmpty(block.links) ? (
          <div className="text-sm p-4 text-slate-600 bg-slate-50 rounded space-y-2">
            <p>Click on the "Add" button, a new link called "LinkX" will be added to header.</p>
            <p>
              You can edit or delete link after added, you can also arrange their order by dragging
              and dropping them into the desired position.
            </p>
          </div>
        ) : (
          <ReactSortable
            className="space-y-2"
            list={block.links}
            setList={handleSetLinks}
            handle=".header-drag-handle"
            delay={10}
            animation={150}
          >
            {block.links.map(link => (
              <LinkItem key={link.id} link={link} onChange={handleChange} onDelete={handleDelete} />
            ))}
          </ReactSortable>
        )}
      </div>
    </div>
  )
}
