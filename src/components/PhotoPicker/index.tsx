import { Modal, Tabs } from '@heyforms/ui'
import { IconVideo } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import { Embed } from '~/components'

import { FileUploader } from '../FileUploader'
import { Unsplash } from './Unsplash'

interface PhotoPickerProps extends Omit<ComponentProps, 'onChange'>, IModalProps {
  namespace: string
  enableUnsplash?: boolean
  enableVideo?: boolean
  acceptedMimes?: string[]
  value?: string
  onChange?: (value: string, mediaType: 'image' | 'video') => void
}

export const PhotoPicker: FC<PhotoPickerProps> = ({
  className,
  visible,
  namespace,
  enableUnsplash = false,
  enableVideo = false,
  acceptedMimes = ['image/jpeg', 'image/png', 'image/bmp'],
  value,
  onClose,
  onChange,
  ...restProps
}) => {
  const { t } = useTranslation()

  function handleImageChange(src: string) {
    onChange?.(src, 'image')
    onClose?.()
  }

  function handleVideoChange(src: string) {
    onChange?.(src, 'video')
    onClose?.()
  }

  return (
    <Modal
      className="photo-picker"
      visible={visible}
      onClose={onClose}
      showCloseIcon
      {...restProps}
    >
      <Tabs>
        <Tabs.Pane name="upload" title={t('common.uploadImage')}>
          <FileUploader namespace={namespace} accept={acceptedMimes} onChange={handleImageChange} />
        </Tabs.Pane>
        {enableUnsplash && (
          <Tabs.Pane name="unsplash" title="Unsplash">
            <Unsplash onChange={handleImageChange} />
          </Tabs.Pane>
        )}
        {enableVideo && (
          <Tabs.Pane name="embed_video" title={t('common.embedVideo')}>
            <div className="pt-20">
              <div className="mb-4">
                <IconVideo className="mx-auto h-12 w-12 text-slate-400 non-scaling-stroke" />
                <div className="mt-1 text-sm text-slate-600 text-center">
                  Works with YouTube, Vimeo, and more
                </div>
              </div>

              <Embed
                submitText={t('common.embed')}
                placeholder="Paste the video link..."
                onChange={handleVideoChange}
              />
            </div>
          </Tabs.Pane>
        )}
      </Tabs>
    </Modal>
  )
}
