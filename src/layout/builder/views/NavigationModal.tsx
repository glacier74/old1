import { Button, Checkbox, EmptyStates, Input, Modal, Tooltip } from '@heyforms/ui'
import { deepClone, isEmpty } from '@nily/utils'
import { IconBrandSafari, IconDotsVertical } from '@tabler/icons'
import { deepEqual } from 'fast-equals'
import { useTranslation } from 'next-i18next'
import { FC, startTransition, useCallback, useEffect, useMemo, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { v4 as uuidv4 } from 'uuid'

import { useBuilderContext } from '~/layout/builder/context'
import { removeBlocksProperties } from '~/layout/builder/utils'

interface HeaderLinkProps {
  link: NavigationLink
  onChange: (id: string, updates: AnyMap<string>) => void
  onDelete: (id: string) => void
}

const HeaderLink: FC<HeaderLinkProps> = ({ link, onChange, onDelete }) => {
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
    <div className="relative block bg-white border rounded-md px-4 py-2 border-gray-300">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-700">{link.title}</span>
        <div className="flex items-center space-x-4">
          <Button.Link type="danger" onClick={handleDelete}>
            Delete
          </Button.Link>
          <Button.Link onClick={handleEdit}>Edit</Button.Link>
          <Tooltip ariaLabel="Drag to reorder links">
            <Button.Link
              className="header-drag-handle w-6 h-6 cursor-drag"
              leading={<IconDotsVertical />}
            />
          </Tooltip>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
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
            <Checkbox value={link.openInNewTab} onChange={handleCheckboxChange}>
              Open in new tab
            </Checkbox>
          </div>
        </div>
      )}
    </div>
  )
}

export const HeaderModal: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useBuilderContext()
  const [links, setLinks] = useState<NavigationLink[]>([])

  const isDisabled = useMemo(() => {
    const block = state.blocks.find(b => b.id === state.selectBlockId) as HeaderBlock
    return deepEqual(block?.links, links)
  }, [state.blocks, state.selectBlockId, links])

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

  function handleSetLinks(links: NavigationLink[]) {
    removeBlocksProperties(links)
    setLinks(links)
  }

  function handleClose() {
    setLinks([])
    dispatch({
      type: 'update',
      payload: {
        isHeaderOpen: false
      }
    })
  }

  const handleAddLink = useCallback(() => {
    setLinks([
      ...links,
      {
        id: uuidv4(),
        title: 'Link' + (links.length + 1),
        url: '',
        isOpen: true
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
    if (state.isHeaderOpen) {
      const block = state.blocks.find(b => b.id === state.selectBlockId) as HeaderBlock
      setLinks(deepClone(block?.links || []))
    }

    return () => {
      setLinks([])
    }
  }, [state.blocks, state.selectBlockId, state.isHeaderOpen])

  return (
    <Modal
      contentClassName="header-modal"
      visible={state.isHeaderOpen}
      showCloseIcon
      onClose={handleClose}
    >
      <div className="p-8">
        <h1 className="text-2xl leading-6 font-bold text-slate-900">
          {t('builder.header.settings')}
        </h1>
      </div>

      {isEmpty(links) ? (
        <EmptyStates
          className="flex flex-col justify-center flex-1 px-8 pb-3"
          icon={<IconBrandSafari className="non-scaling-stroke" />}
          title="To add links to the header bar, follow these steps:"
          description={
            <ol className="text-left list-decimal space-y-2 mt-4">
              <li>
                Click on the "Add link" button on the bottom, a new link called "LinkX" will be
                added to the header bar. This is the default label for a new link and can be edited.
              </li>
              <li>
                Clicking on the "Edit" button will open the link form again, where you can change
                the label or URL of the link.
              </li>
              <li>
                Repeat the process for each additional link that you want to add to the header bar.
              </li>
              <li>
                Once all of your links have been added, you can arrange their order by dragging and
                dropping them into the desired position.
              </li>
              <li>
                Save your changes and the updated header bar with the added links will be visible to
                users on your website.
              </li>
            </ol>
          }
        />
      ) : (
        <ReactSortable
          className="flex-1 px-8 pb-3 space-y-3 scrollbar"
          list={links}
          setList={handleSetLinks}
          handle=".header-drag-handle"
          delay={10}
          animation={150}
        >
          {links.map(link => (
            <HeaderLink key={link.id} link={link} onChange={handleChange} onDelete={handleDelete} />
          ))}
        </ReactSortable>
      )}

      <div className="flex items-center justify-between border-t border-slate-100 px-8 py-4">
        <Button onClick={handleAddLink}>Add link</Button>
        <Button type="success" disabled={isDisabled} onClick={handleFinish}>
          Save changes
        </Button>
      </div>
    </Modal>
  )
}
