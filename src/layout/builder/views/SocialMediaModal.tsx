import { Button, Checkbox, EmptyStates, Input, Modal, Select, Tooltip } from '@heyforms/ui'
import { deepClone, isEmpty } from '@nily/utils'
import { IconDotsVertical, IconShare } from '@tabler/icons'
import { deepEqual } from 'fast-equals'
import { useTranslation } from 'next-i18next'
import { FC, startTransition, useCallback, useEffect, useMemo, useState } from 'react'
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
    <div className="relative block bg-white border rounded-md px-4 py-2 border-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-slate-700 space-x-2">
          <div className="flex items-center">
            <SocialMediaIcon type={socialMedia.type} />
            <span className="ml-2">{setting?.label}</span>
          </div>
          <div>{socialMedia.value}</div>
        </div>
        <div className="flex items-center space-x-4">
          <Button.Link type="danger" onClick={handleDelete}>
            Delete
          </Button.Link>
          <Button.Link onClick={handleEdit}>Edit</Button.Link>
          <Tooltip ariaLabel="Drag to reorder socialMedias">
            <Button.Link
              className="header-drag-handle w-6 h-6 cursor-drag"
              leading={<IconDotsVertical />}
            />
          </Tooltip>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center space-x-4">
            <Select
              className="w-36"
              options={SOCIAL_MEDIA_SETTINGS}
              value={socialMedia.type}
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

export const SocialMediaModal: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useBuilderContext()
  const [socialMedias, setSocialMedias] = useState<SocialMedia[]>([])

  const isDisabled = useMemo(() => {
    const block = state.blocks.find(b => b.id === state.selectBlockId) as FooterBlock
    return deepEqual(block?.socialMedias, socialMedias)
  }, [state.blocks, state.selectBlockId, socialMedias])

  const handleFinish = useCallback(async () => {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: state.selectBlockId!,
        updates: {
          socialMedias
        }
      }
    })
    handleClose()
  }, [state.selectBlockId, socialMedias])

  function handleSetSocialMedias(socialMedias: SocialMedia[]) {
    removeBlocksProperties(socialMedias)
    setSocialMedias(socialMedias)
  }

  function handleClose() {
    setSocialMedias([])
    dispatch({
      type: 'update',
      payload: {
        isSocialMediaOpen: false
      }
    })
  }

  const handleAddLink = useCallback(() => {
    setSocialMedias([
      ...socialMedias,
      {
        id: uuidv4(),
        type: 'twitter',
        value: '',
        isOpen: true
      }
    ])
  }, [socialMedias])

  const handleChange = useCallback(
    (id: string, updates: AnyMap<string>) => {
      setSocialMedias(socialMedias.map(l => (l.id === id ? { ...l, ...updates } : l)))
    },
    [socialMedias]
  )

  const handleDelete = useCallback(
    (id: string) => {
      setSocialMedias(socialMedias.filter(l => l.id !== id))
    },
    [socialMedias]
  )

  useEffect(() => {
    if (state.isSocialMediaOpen) {
      const block = state.blocks.find(b => b.id === state.selectBlockId) as FooterBlock
      setSocialMedias(deepClone(block?.socialMedias || []))
    }

    return () => {
      setSocialMedias([])
    }
  }, [state.blocks, state.selectBlockId, state.isSocialMediaOpen])

  return (
    <Modal
      contentClassName="social-media-modal"
      visible={state.isSocialMediaOpen}
      showCloseIcon
      onClose={handleClose}
    >
      <div className="p-8">
        <h1 className="text-2xl leading-6 font-bold text-slate-900">
          {t('builder.footer.settings')}
        </h1>
      </div>

      {isEmpty(socialMedias) ? (
        <EmptyStates
          className="flex flex-col justify-center flex-1 px-8 pb-3"
          icon={<IconShare className="non-scaling-stroke" />}
          title="To add social medias to the footer, follow these steps:"
          description={
            <ol className="text-left list-decimal space-y-2 mt-4">
              <li>
                Click on the "Add social media" button on the bottom, a new social media will be
                added to the footer.
              </li>
              <li>
                Clicking on the "Edit" button will open the social media form again, where you can
                change the type or value of the social media.
              </li>
              <li>
                Repeat the process for each additional social media that you want to add to the
                footer.
              </li>
              <li>
                Once all of your social medias have been added, you can arrange their order by
                dragging and dropping them into the desired position.
              </li>
              <li>
                Save your changes and the updated footer with the added social medias will be
                visible to users on your website.
              </li>
            </ol>
          }
        />
      ) : (
        <ReactSortable
          className="flex-1 px-8 pb-3 space-y-3 scrollbar"
          list={socialMedias}
          setList={handleSetSocialMedias}
          handle=".header-drag-handle"
          delay={10}
          animation={150}
        >
          {socialMedias.map(socialMedia => (
            <SocialMedia
              key={socialMedia.id}
              socialMedia={socialMedia}
              onChange={handleChange}
              onDelete={handleDelete}
            />
          ))}
        </ReactSortable>
      )}

      <div className="flex items-center justify-between border-t border-slate-100 px-8 py-4">
        <Button onClick={handleAddLink}>Add social media</Button>
        <Button type="success" disabled={isDisabled} onClick={handleFinish}>
          Save changes
        </Button>
      </div>
    </Modal>
  )
}
