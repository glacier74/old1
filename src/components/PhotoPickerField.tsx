import { Button } from '@heyforms/ui'
import { IComponentProps } from '@heyforms/ui/types/typing'
import { isValid } from '@nily/utils'
import { IconUpload } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import type { FC } from 'react'

import { RoundImage } from '~/components'
import { useVisible } from '~/utils'

import { PhotoPicker } from './PhotoPicker'

interface ImagePickerButtonProps extends IComponentProps {
  tip1: string
  tip2: string
  disabled?: boolean
  onClick: () => void
}

interface ImagePickerFieldProps extends Omit<IComponentProps, 'onChange'> {
  pickerButtonClassName?: string
  value?: string
  width?: number
  height?: number
  enableUnsplash?: boolean
  tip1?: string
  tip2?: string
  disabled?: boolean
  onVisibilityChange?: (visible: boolean) => void
  onChange?: (value: string) => void
}

export const ImagePickerButton: FC<ImagePickerButtonProps> = ({
  className,
  tip1,
  tip2,
  disabled,
  onClick
}) => {
  return (
    <button
      className={clsx('bg-slate-50 w-full h-full', className)}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <div className="flex flex-col justify-center w-full h-full space-y-1 text-center">
        <IconUpload className="mx-auto h-12 w-12 text-slate-400 non-scaling-stroke" />
        <p className="text-slate-400">{tip1}</p>
        <p className="text-slate-400">{tip2}</p>
      </div>
    </button>
  )
}

export const ImagePickerField: FC<ImagePickerFieldProps> = ({
  className,
  pickerButtonClassName,
  width = 0,
  height = 0,
  enableUnsplash,
  tip1,
  tip2,
  value,
  disabled,
  onVisibilityChange,
  onChange,
  ...restProps
}) => {
  const [visible, open, close] = useVisible()
  const { t } = useTranslation('dashboard')

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
        className={clsx('relative group rounded overflow-hidden', className)}
        style={{ width: width, height: height }}
      >
        {value ? (
          <div onClick={handleClick}>
            <Image
              className="max-h-full object-cover"
              src={value}
              width={width}
              height={height}
              loading="eager"
              alt=""
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity cursor-pointer group-hover:opacity-100">
              <span className="text-xs text-white">{t('common.upload')}</span>
            </div>
          </div>
        ) : (
          <ImagePickerButton
            className={clsx('text-sm', pickerButtonClassName)}
            tip1={tip1!}
            tip2={tip2!}
            disabled={disabled}
            onClick={open}
          />
        )}
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

interface AvatarPickerFieldProps extends Omit<ImagePickerFieldProps, 'width' | 'height'> {
  text?: string
  retainLength?: number
  size?: number
  imageSize?: number
}

export const AvatarPickerField: FC<AvatarPickerFieldProps> = ({
  className,
  size = 48,
  imageSize = 48,
  text = 'common.logo',
  retainLength = 4,
  enableUnsplash,
  value,
  onVisibilityChange,
  onChange,
  ...restProps
}) => {
  const [visible, open, close] = useVisible()
  const { t } = useTranslation('dashboard')

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
      <div className="flex items-center gap-3">
        <RoundImage
          key={value}
          src={value}
          imageSize={imageSize}
          size={size}
          text={isValid(text) ? t(text) : undefined}
          retainLength={retainLength}
        />
        <Button className="!py-1 !px-1.5" onClick={handleClick}>
          Change
        </Button>
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
