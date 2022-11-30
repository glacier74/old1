import { Modal, Tabs } from '@heyforms/ui'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import { FileUploader } from '../FileUploader'
import { Unsplash } from './Unsplash'

interface PhotoPickerProps extends Omit<ComponentProps, 'onChange'>, IModalProps {
  namespace: string
  enableUnsplash?: boolean
  acceptedMimes?: string[]
  value?: string
  onChange?: (value: string) => void
}

export const PhotoPicker: FC<PhotoPickerProps> = ({
  className,
  visible,
  namespace,
  enableUnsplash = true,
  acceptedMimes = ['image/jpeg', 'image/png', 'image/bmp'],
  value,
  onClose,
  onChange,
  ...restProps
}) => {
  const { t } = useTranslation()

  function handleChange(src: string) {
    onChange?.(src)
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
        <Tabs.Pane name="upload" title={t('common.upload')}>
          <FileUploader namespace={namespace} accept={acceptedMimes} onChange={handleChange} />
        </Tabs.Pane>
        {enableUnsplash && (
          <Tabs.Pane name="unsplash" title="Unsplash">
            <Unsplash onChange={handleChange} />
          </Tabs.Pane>
        )}
      </Tabs>
    </Modal>
  )
}
