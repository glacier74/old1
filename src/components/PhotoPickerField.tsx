import { IComponentProps } from '@heyforms/ui/types/typing'
import { IconUpload } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import { RoundImage } from '~/components'
import { cropImage, useVisible } from '~/utils'

import { PhotoPicker } from './PhotoPicker'

interface ImagePickerButtonProps extends IComponentProps {
  tip1: string
  tip2: string
  onClick: () => void
}

interface ImagePickerFieldProps extends Omit<IComponentProps, 'onChange'> {
  namespace: string
  value?: string
  width?: number
  height?: number
  enableUnsplash?: boolean
  tip1?: string
  tip2?: string
  onVisibilityChange?: (visible: boolean) => void
  onChange?: (value: string) => void
}

export const ImagePickerButton: FC<ImagePickerButtonProps> = ({
  className,
  tip1,
  tip2,
  onClick
}) => {
  return (
    <button className={clsx('bg-slate-50 w-full h-full', className)} onClick={onClick}>
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
  width = 0,
  height = 0,
  namespace,
  enableUnsplash,
  tip1,
  tip2,
  value,
  onVisibilityChange,
  onChange,
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
        className={clsx('relative group rounded overflow-hidden', className)}
        style={{ width: width, height: height }}
        onClick={handleClick}
      >
        {value ? (
          <>
            <img
              key={value}
              className="max-h-full object-cover"
              src={cropImage(value, width, height)}
              width={width}
              height={height}
              loading="eager"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity cursor-pointer group-hover:opacity-100">
              <span className="text-xs text-white">{t('common.upload')}</span>
            </div>
          </>
        ) : (
          <ImagePickerButton tip1={tip1!} tip2={tip2!} onClick={open} />
        )}
      </div>

      {/* Photo picker modal */}
      <PhotoPicker
        visible={visible}
        enableUnsplash={enableUnsplash}
        namespace={namespace}
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
  size = 64,
  imageSize = 120,
  text = 'common.logo',
  retainLength = 4,
  enableUnsplash,
  value,
  onVisibilityChange,
  onChange,
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
        className={clsx('relative group', className)}
        style={{ width: size, height: size }}
        onClick={handleClick}
      >
        <RoundImage
          key={value}
          src={value}
          imageSize={imageSize}
          size={size}
          text={t(text)}
          retainLength={retainLength}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 transition-opacity cursor-pointer group-hover:opacity-100">
          <span className="text-xs text-white">{t('common.upload')}</span>
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
