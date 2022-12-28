import { Button } from '@heyforms/ui'
import { IconPhotoEdit } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { ImagePickerButton, PhotoPicker } from '~/components'
import { cropImage, useVisible } from '~/utils'

import { useBuilderContext } from '../context'
import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface ImageProps extends BlockProps {
  namespace: string
  block: ImageBlock
  uploadDesc1: string
  uploadDesc2: string
}

export const ImagePreview: FC<Omit<ImageProps, 'namespace' | 'uploadDesc1' | 'uploadDesc2'>> = ({
  block,
  ...restProps
}) => {
  return (
    <BlockPreview block={block} {...restProps}>
      <div
        className="block-image-container max-w-full"
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
            width={block.width}
            height={block.height}
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

const ImageComponent: FC<ImageProps> = ({
  block,
  namespace,
  uploadDesc1,
  uploadDesc2,
  ...resetProps
}) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()
  const [visible, open, close] = useVisible()

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

  return (
    <>
      <BlockComponent className={`block-image-align-${block.align}`} block={block} {...resetProps}>
        {block.source ? (
          <div
            className="block-image-container"
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
                width={block.width}
                height={block.height}
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
            <div className="block-image-toolbar">
              <Button className="!px-3 !py-2" leading={<IconPhotoEdit />} onClick={open}>
                {t('common.change')}
              </Button>
            </div>
          </div>
        ) : (
          <ImagePickerButton
            className="block-upload"
            tip1={t(uploadDesc1!)}
            tip2={t(uploadDesc2!)}
            onClick={open}
          />
        )}
      </BlockComponent>

      {/* Photo picker modal */}
      <PhotoPicker
        visible={visible}
        namespace={namespace}
        enableUnsplash={false}
        enableVideo={true}
        onClose={close}
        onChange={handleChange}
      />
    </>
  )
}
export const Image = ImageComponent
