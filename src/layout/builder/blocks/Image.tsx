import { Button } from '@heyforms/ui'
import { IconPhotoEdit } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { ImagePickerButton, PhotoPicker } from '~/components'
import { cropImage, useVisible } from '~/utils'

import { useBuilderContext } from '../context'
import { BlockComponent, BlockPreview, BlockProps } from './Block'

export interface ImageProps extends BlockProps {
  block: ImageBlock
  uploadDesc1: string
  uploadDesc2: string
}

export const ImagePreview: FC<Omit<ImageProps, 'uploadDesc1' | 'uploadDesc2'>> = ({
  block,
  ...restProps
}) => {
  return (
    <BlockPreview block={block} {...restProps}>
      <div className="block-image-container max-w-full">
        <img
          src={cropImage(block.source, block.width, block.height)}
          alt={block.caption}
          width={block.width}
          height={block.height}
        />
      </div>
    </BlockPreview>
  )
}

const ImageComponent: FC<ImageProps> = ({ block, uploadDesc1, uploadDesc2, ...resetProps }) => {
  const { t } = useTranslation()
  const { dispatch } = useBuilderContext()
  const [visible, open, close] = useVisible()

  // TODO - align image BubbleMenu
  function handleChange(source: string) {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates: {
          source
        }
      }
    })
  }

  return (
    <>
      <BlockComponent className={`block-image-align-${block.align}`} block={block} {...resetProps}>
        {block.source ? (
          <div className="block-image-container">
            <img
              src={cropImage(block.source, block.width, block.height)}
              alt={block.caption}
              width={block.width}
              height={block.height}
            />
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
        enableUnsplash={false}
        onClose={close}
        onChange={handleChange}
      />
    </>
  )
}
export const Image = ImageComponent
