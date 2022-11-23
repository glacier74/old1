import { Button, Checkbox, Input, Modal, Tooltip } from '@heyforms/ui'
import { deepClone } from '@nily/utils'
import { IconDotsVertical } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, startTransition, useCallback, useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { v4 as uuidv4 } from 'uuid'

import { useBuilderContext } from '~/layout/builder/context'

interface NavigationLinkProps {
  link: NavigationLink
  deletable?: boolean
  onChange: (id: string, updates: AnyMap<string>) => void
  onDelete: (id: string) => void
}

const NavigationLink: FC<NavigationLinkProps> = ({ link, deletable, onChange, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false)

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
    <div className="relative block bg-white border rounded-md px-4 py-2 border-gray-300">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-700">{link.title}</span>
        <div className="flex items-center space-x-4">
          {deletable && (
            <Button.Link type="danger" onClick={handleDelete}>
              Delete
            </Button.Link>
          )}
          <Button.Link onClick={handleEdit}>Edit</Button.Link>
          <Tooltip ariaLabel="Drag to reorder links">
            <Button.Link
              className="navigation-drag-handle w-6 h-6 cursor-drag"
              leading={<IconDotsVertical />}
            />
          </Tooltip>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
          <div>
            <div className="form-item-label">Navigation label</div>
            <div className="form-item-content">
              <Input value={link.title} onChange={handleTitleChange} />
            </div>
          </div>

          <div>
            <div className="form-item-label">Navigation url</div>
            <div className="form-item-content">
              <Input type="url" value={link.url} onChange={handleUrlChange} />
            </div>
          </div>

          <div className="pb-2">
            <Checkbox value={link.openInNewTab} onChange={handleCheckboxChange}>
              Open in new tab
            </Checkbox>
          </div>
        </div>
      )}
    </div>
  )
}

export const NavigationModal: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useBuilderContext()
  const [links, setLinks] = useState<NavigationLink[]>([])

  const handleFinish = useCallback(async () => {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: state.selectBlockId!,
        updates: {
          links
        }
      }
    })
    handleClose()
  }, [state.selectBlockId, links])

  function handleClose() {
    setLinks([])
    dispatch({
      type: 'update',
      payload: {
        isNavigationOpen: false
      }
    })
  }

  const handleAddLink = useCallback(() => {
    setLinks([
      ...links,
      {
        id: uuidv4(),
        title: 'Link' + (links.length + 1),
        url: ''
      }
    ])
  }, [links])

  const handleChange = useCallback(
    (id: string, updates: AnyMap<string>) => {
      setLinks(links.map(l => (l.id === id ? { ...l, ...updates } : l)))
    },
    [links]
  )

  const handleDelete = useCallback(
    (id: string) => {
      setLinks(links.filter(l => l.id !== id))
    },
    [links]
  )

  useEffect(() => {
    if (state.isNavigationOpen) {
      const block = state.blocks.find(b => b.id === state.selectBlockId) as NavigationBlock
      setLinks(deepClone(block?.links || []))
    }

    return () => {
      setLinks([])
    }
  }, [state.blocks, state.selectBlockId, state.isNavigationOpen])

  return (
    <Modal
      contentClassName="navigation-modal"
      visible={state.isNavigationOpen}
      showCloseIcon
      onClose={handleClose}
    >
      <div className="p-8">
        <h1 className="text-2xl leading-6 font-bold text-slate-900">
          {t('builder.navigation.settings')}
        </h1>
      </div>

      <ReactSortable
        className="flex-1 px-8 pb-3 space-y-3 scrollbar"
        list={links}
        setList={setLinks}
        handle=".navigation-drag-handle"
        delay={10}
        animation={150}
      >
        {links.map(link => (
          <NavigationLink
            key={link.id}
            link={link}
            deletable={links.length > 1}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        ))}
      </ReactSortable>

      <div className="flex items-center justify-between border-t border-slate-100 px-8 py-4">
        <Button onClick={handleAddLink}>Add link</Button>
        <Button type="success" onClick={handleFinish}>
          Save changes
        </Button>
      </div>
    </Modal>
  )
}
