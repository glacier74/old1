import { Avatar, Button } from '@heyforms/ui'
import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import { useTranslation } from 'next-i18next'
import { PhotoPicker } from './photo-picker'
import { useVisible } from '@/utils'

interface PhotoPickerFieldProps extends Omit<ComponentProps, 'onChange'> {
  id?: string
  value?: string
  label?: ReactNode
  description?: ReactNode
  defaultIcon?: ReactNode
  changeLoading?: boolean
  removeLoading?: boolean
  onVisibilityChange?: (visible: boolean) => void
  onChange?: (value: string) => void
  onRemove?: () => void
}

export const PhotoPickerField: FC<PhotoPickerFieldProps> = ({
  id,
  className,
  label,
  description,
  defaultIcon,
  changeLoading,
  removeLoading,
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
      <div className={clsx('photo-picker-field', className)}>
        <label className="form-item-label" htmlFor={id}>
          {label}
        </label>
        <p className="form-item-description">{description}</p>
        <div className="mt-3 flex items-center">
          <Avatar src={value} size={48} defaultIcon={defaultIcon} circular rounded />
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
      <PhotoPicker visible={visible} onClose={handleClose} onChange={handleChange} {...restProps} />
    </>
  )
}
