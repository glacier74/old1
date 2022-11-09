import { Button } from '@heyforms/ui'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import type { FC, ReactNode } from 'react'

import { RoundImage } from '~/components'
import { useVisible } from '~/utils'

import { PhotoPicker } from './PhotoPicker'

interface PhotoPickerFieldProps extends Omit<ComponentProps, 'onChange'> {
  id?: string
  value?: string
  label?: ReactNode
  size?: number
  description?: ReactNode
  defaultIcon?: ReactNode
  changeLoading?: boolean
  removeLoading?: boolean
  enableUnsplash?: boolean
  onVisibilityChange?: (visible: boolean) => void
  onChange?: (value: string) => void
  onRemove?: () => void
}

export const PhotoPickerField: FC<PhotoPickerFieldProps> = ({
  id,
  className,
  label,
  size = 48,
  description,
  defaultIcon,
  changeLoading,
  removeLoading,
  enableUnsplash,
  value,
  onVisibilityChange,
  onChange,
  onRemove,
  ...restProps
}) => {
  const [visible, open, close] = useVisible()
  const { t } = useTranslation()

  function handleClick() {
    open()
    onVisibilityChange?.(true)
  }

  function handleClose() {
    close()
    onVisibilityChange?.(false)
  }

  function handleChange(newVal: string) {
    handleClose()
    onChange?.(newVal)
  }

  return (
    <>
      <div className={clsx('PhotoPicker-field', className)}>
        <label className="form-item-label" htmlFor={id}>
          {label}
        </label>
        <p className="form-item-description">{description}</p>
        <div className="mt-3 flex items-center">
          <RoundImage src={value} size={size} defaultIcon={defaultIcon} />
          <div className="ml-4 flex flex-auto items-center">
            <Button loading={changeLoading} onClick={handleClick}>
              {t('account.avatar.change')}
            </Button>
            {onRemove && (
              <Button.Link loading={removeLoading} className="ml-3 px-4 py-2" onClick={onRemove}>
                {t('account.avatar.remove')}
              </Button.Link>
            )}
          </div>
        </div>
      </div>

      {/* Photo picker modal */}
      <PhotoPicker
        visible={visible}
        enableUnsplash={enableUnsplash}
        onClose={handleClose}
        onChange={handleChange}
        {...restProps}
      />
    </>
  )
}

export const LogoPickerField: FC<PhotoPickerFieldProps> = ({
  id,
  className,
  description,
  size = 64,
  changeLoading,
  removeLoading,
  enableUnsplash,
  value,
  onVisibilityChange,
  onChange,
  onRemove,
  ...restProps
}) => {
  const [visible, open, close] = useVisible()
  const { t } = useTranslation()

  function handleClick() {
    open()
    onVisibilityChange?.(true)
  }

  function handleClose() {
    close()
    onVisibilityChange?.(false)
  }

  function handleChange(newVal: string) {
    handleClose()
    onChange?.(newVal)
  }

  return (
    <>
      <div
        className={clsx('logo-picker-field relative group', className)}
        style={{ width: size, height: size }}
        onClick={handleClick}
      >
        <RoundImage src={value} size={size} text={t('common.logo')} retainLength={4} />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 transition-opacity cursor-pointer group-hover:opacity-100">
          <span className="text-xs text-white">{t('upload.upload')}</span>
        </div>
      </div>

      {/* Photo picker modal */}
      <PhotoPicker
        visible={visible}
        enableUnsplash={enableUnsplash}
        onClose={handleClose}
        onChange={handleChange}
        {...restProps}
      />
    </>
  )
}
