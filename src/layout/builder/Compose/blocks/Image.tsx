import { Button } from '@heyforms/ui'
import { IconPhotoEdit } from '@tabler/icons'
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
  const { dispatch } = useComposeStore()
  const [visible, open, close] = useVisible()

  // TODO - align image BubbleMenu
  function handleChange(source: string) {
    console.log('source', source)
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
          <div className="group relative w-full h-full">
            <img src={block.source} alt={block.caption} width={block.width} height={block.height} />
            <div className="block-image-toolbar">
              <Button className="!px-3 !py-2" leading={<IconPhotoEdit />} onClick={open}>
                Change
              </Button>
            </div>
          </div>
        ) : (
          <Upload
            description1="Recommended size: 1100x480 | JPG, PNG, BMP."
            description2="Max size: 2MB"
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
