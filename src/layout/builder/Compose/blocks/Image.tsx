import { Button } from '@heyforms/ui'
import { IconPhotoEdit } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { PhotoPicker } from '~/components'
import { Upload } from '~/layout/builder/Compose/views'
import { useVisible } from '~/utils'

import { useComposeStore } from '../store'
import { Block, BlockProps } from './Block'

interface ImageProps extends BlockProps {
  block: ImageBlock
}

const ImageComponent: FC<ImageProps> = ({ block, ...resetProps }) => {
  const { t } = useTranslation()
  const { dispatch } = useComposeStore()
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
      <Block className={`block-align-${block.align}`} block={block} {...resetProps}>
        {block.source ? (
          <div className="block-image-container group/item relative w-full h-full">
            <img src={block.source} alt={block.caption} width={block.width} height={block.height} />
            <div className="block-image-toolbar">
              <Button className="!px-3 !py-2" leading={<IconPhotoEdit />} onClick={open}>
                {t('common.change')}
              </Button>
            </div>
          </div>
        ) : (
          <Upload
            description1={t(block.placeholder!)}
            description2={t(block.subPlaceholder!)}
            onClick={open}
          />
        )}
      </Block>

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
