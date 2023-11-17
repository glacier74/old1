import { Button, Tooltip } from '@heyforms/ui'
import { IconPhotoEdit, IconTrash } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, useMemo } from 'react'

import { ImagePickerButton, PhotoPicker } from '~/components'
import { cropImage, useVisible } from '~/utils'

import { useBuilderContext } from '../context'
import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface ImageProps extends BlockProps {
  block: ImageBlock
  tip1: string
  tip2: string
}

export const ImagePreview: FC<Omit<ImageProps, 'tip1' | 'tip2'>> = ({ block, ...restProps }) => {
  const isVideo = useMemo(() => block.mediaType === 'video', [block.mediaType])

  return (
    <BlockPreview block={block} {...restProps}>
      <div
        className={clsx('block-image-wrapper', { 'block-video-wrapper': isVideo })}
        style={{
          width: block.width,
          height: block.height
        }}
      >
        {block.mediaType === 'video' ? (
          <iframe
            className="block-embed-iframe"
            src={block.source}
            title={block.caption}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={cropImage(block.source, block.width, block.height)}
            alt={block.caption}
            width={block.width}
            height={block.height}
          />
        )}
      </div>
    </BlockPreview>
  )
}

const ImageComponent: FC<ImageProps> = ({ block, tip1, tip2, ...resetProps }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()
  const [visible, open, close] = useVisible()

  const isVideo = useMemo(() => block.mediaType === 'video', [block.mediaType])

  // TODO - align image BubbleMenu
  function handleChange(source: string, mediaType: 'image' | 'video') {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates: {
          mediaType,
          source
        }
      }
    })
  }

  function handleDelete() {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates: {
          source: undefined
        }
      }
    })
  }

  return (
    <>
      <BlockComponent className={`block-image-align-${block.align}`} block={block} {...resetProps}>
        {block.source ? (
          <div
            className={clsx('block-image-wrapper', { 'block-video-wrapper': isVideo })}
            style={{
              width: block.width,
              height: block.height
            }}
          >
            {block.mediaType === 'video' ? (
              <iframe
                className="block-embed-iframe"
                src={block.source}
                title={block.caption}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={cropImage(block.source, block.width, block.height)}
                alt={block.caption}
                width={block.width}
                height={block.height}
              />
            )}
            <div className="block-image-toolbar space-x-1.5">
              <Tooltip ariaLabel="Change">
                <Button leading={<IconPhotoEdit />} onClick={open} />
              </Tooltip>
              <Tooltip ariaLabel="Delete">
                <Button leading={<IconTrash />} onClick={handleDelete} />
              </Tooltip>
            </div>
          </div>
        ) : (
          <ImagePickerButton className="block-upload" tip1={tip1} tip2={tip2} onClick={open} />
        )}
      </BlockComponent>

      {/* Photo picker modal */}
      <PhotoPicker
        visible={visible}
        enableUnsplash={false}
        enableVideo={true}
        onClose={close}
        onChange={handleChange}
      />
    </>
  )
}

export const Image = ImageComponent
