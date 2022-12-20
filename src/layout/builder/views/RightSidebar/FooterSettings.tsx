import { Button, Checkbox, Input, Select, Tooltip } from '@heyforms/ui'
import { isEmpty } from '@nily/utils'
import { IconChevronDown, IconChevronUp, IconGripVertical, IconTrash } from '@tabler/icons'
import { FC, startTransition, useCallback, useMemo, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { v4 as uuidv4 } from 'uuid'

import { SocialMediaIcon } from '~/components'
import { SOCIAL_MEDIA_SETTINGS } from '~/constants'
import { useBuilderContext } from '~/layout/builder/context'
import { removeBlocksProperties } from '~/layout/builder/utils'

interface SocialMediaProps {
  socialMedia: SocialMedia
  onChange: (id: string, updates: AnyMap<string>) => void
  onDelete: (id: string) => void
}

const SocialMedia: FC<SocialMediaProps> = ({ socialMedia, onChange, onDelete }) => {
  const [isOpen, setIsOpen] = useState(socialMedia.isOpen)
  const setting = useMemo(
    () => SOCIAL_MEDIA_SETTINGS.find(s => s.value === socialMedia.type),
    [socialMedia.type]
  )

  function handleDelete() {
    onDelete(socialMedia.id)
  }

  function handleEdit() {
    setIsOpen(isOpen => !isOpen)
  }

  function handleChange(updates: AnyMap<string>) {
    startTransition(() => {
      onChange(socialMedia.id, updates)
    })
  }

  function handleTypeChange(type: any) {
    handleChange({ type })
  }

  function handleValueChange(value: any) {
    handleChange({ value })
  }

  function handleCheckboxChange(openInNewTab: any) {
    handleChange({ openInNewTab })
  }

  return (
    <div className="relative block bg-white border rounded-md px-3 py-1.5 border-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-slate-700 space-x-2">
          <SocialMediaIcon className="w-5 h-5 text-slate-500" type={socialMedia.type} />
          <div>{socialMedia.value}</div>
        </div>
        <div className="flex items-center space-x-1">
          <Tooltip ariaLabel="Delete social media">
            <Button.Link
              className="w-6 h-6 cursor-drag"
              leading={<IconTrash />}
              onClick={handleDelete}
            />
          </Tooltip>
          <Tooltip ariaLabel="Drag to reorder social medias">
            <Button.Link
              className="header-drag-handle w-6 h-6 cursor-drag"
              leading={<IconGripVertical />}
            />
          </Tooltip>
          <Tooltip ariaLabel="Collapse or expand the social media form">
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
          <div className="flex items-center space-x-4">
            <Select
              className="w-28"
              options={SOCIAL_MEDIA_SETTINGS}
              value={socialMedia.type}
              popupClassName="!w-36"
              onChange={handleTypeChange}
            />

            <Input
              className="flex-1"
              placeholder={setting?.placeholder}
              value={socialMedia.value}
              onChange={handleValueChange}
            />
          </div>

          <div className="pb-2">
            <Checkbox value={socialMedia.openInNewTab} onChange={handleCheckboxChange}>
              Open in new tab
            </Checkbox>
          </div>
        </div>
      )}
    </div>
  )
}

export const FooterSettings: FC<{ block: FooterBlock }> = ({ block }) => {
  const { dispatch } = useBuilderContext()

  const handleSetSocialMedias = useCallback(
    (socialMedias: SocialMedia[]) => {
      removeBlocksProperties(socialMedias)
      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: block.id,
          updates: {
            socialMedias
          }
        }
      })
    },
    [block.id]
  )

  const handleAdd = useCallback(() => {
    handleSetSocialMedias([
      ...(block.socialMedias || []),
      {
        id: uuidv4(),
        type: 'twitter',
        value: '',
        isOpen: true
      }
    ])
  }, [block.socialMedias])

  const handleChange = useCallback(
    (id: string, updates: AnyMap<string>) => {
      handleSetSocialMedias(
        (block.socialMedias || []).map(l => (l.id === id ? { ...l, ...updates } : l))
      )
    },
    [block.socialMedias]
  )

  const handleDelete = useCallback(
    (id: string) => {
      handleSetSocialMedias((block.socialMedias || []).filter(l => l.id !== id))
    },
    [block.socialMedias]
  )

  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Social medias</div>
        <Button className="!px-2 !py-1" onClick={handleAdd}>
          Add
        </Button>
      </div>

      <div className="mt-3">
        {isEmpty(block.socialMedias) ? (
          <div className="text-sm p-4 text-slate-600 bg-slate-50 rounded space-y-2">
            <p>Click on the "Add" button, a new social media will be added to the footer.</p>
            <p>
              You can edit or delete social media after added, you can also arrange their order by
              dragging and dropping them into the desired position.
            </p>
          </div>
        ) : (
          <ReactSortable
            className="space-y-2"
            list={block.socialMedias}
            setList={handleSetSocialMedias}
            handle=".header-drag-handle"
            delay={10}
            animation={150}
          >
            {block.socialMedias.map(socialMedia => (
              <SocialMedia
                key={socialMedia.id}
                socialMedia={socialMedia}
                onChange={handleChange}
                onDelete={handleDelete}
              />
            ))}
          </ReactSortable>
        )}
      </div>
    </div>
  )
}
