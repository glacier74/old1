import { Button, stopEvent } from '@heyforms/ui'
import { bytes } from '@nily/utils'
import { IconFileUpload, IconUpload } from '@tabler/icons'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import type { ChangeEvent, DragEvent, FC, MouseEvent } from 'react'
import { useState } from 'react'

import { UploadService } from '~/service'

interface DragUploaderProps extends Omit<ComponentProps, 'onChange'> {
  value?: File
  loading?: boolean
  error?: Error | null
  accept?: string[]
  maxSize?: string
  selectText?: string
  reselectText?: string
  uploadingText?: string
  onChange?: (file: File) => void
}

interface FileUploaderProps extends Omit<DragUploaderProps, 'value' | 'onChange'> {
  value?: string
  onChange?: (src: string) => void
}

export const DragUploader: FC<DragUploaderProps> = ({
  className,
  value,
  loading = false,
  error,
  accept = [],
  maxSize = '5MB',
  selectText = 'common.selectText',
  reselectText = 'common.reselectText',
  uploadingText = 'common.uploading',
  onChange,
  ...restProps
}) => {
  const { t } = useTranslation('dashboard')

  const [file, setFile] = useState<File | undefined>(value)
  const [fileInputRef, setFileInputRef] = useState<any>()
  const [dragRef, setDragRef] = useState<any>()
  const [dragoverRef, setDragoverRef] = useState<any>()
  const [dragging, setDragging] = useState(false)
  const [internalError, setInternalError] = useState<Error | null>(null)

  function handleChange(f: File) {
    if (f.size > bytes.parse(maxSize)!) {
      return setInternalError(new Error(t('common.exceedsLimit', { maxSize })))
    }

    if (!accept.includes(f.type)) {
      return setInternalError(new Error(t('common.unsupported')))
    }

    setFile(f)
    onChange?.(f)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()

    if (event.type === 'dragenter') {
      setDragoverRef(event.target)
      setDragging(true)
      return
    }

    if (event.type === 'dragleave') {
      if (event.target === dragRef && event.target === dragoverRef) {
        setDragging(false)
      }
      return
    }

    if (event.type === 'dragover') {
      return
    }

    setDragoverRef(undefined)
    setDragging(false)

    handleChange(event.dataTransfer.files[0])
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (files && files.length > 0) {
      handleChange(files[0])
    }

    if (fileInputRef) {
      fileInputRef.value = null
    }
  }

  function handleOpen(event: MouseEvent) {
    fileInputRef?.click()
    stopEvent(event)
  }

  return (
    <div className={clsx('drag-uploader', className)} {...restProps}>
      <input
        className="hidden"
        type="file"
        ref={setFileInputRef}
        accept={accept.join(',')}
        onChange={handleFileChange}
      />
      {file ? (
        <div
          className="flex justify-center w-full h-full px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md"
          onClick={handleOpen}
        >
          <div className="flex flex-col justify-center space-y-1 text-center">
            <IconFileUpload className="mx-auto h-12 w-12 text-slate-400 non-scaling-stroke" />
            <p className="text-sm text-slate-500">
              {file!.name} <span>({bytes.stringify(file!.size)})</span>
            </p>
            <div className="flex items-center justify-center text-sm">
              <Button.Link type="success" loading={loading} loaderClassName="!bg-white">
                {t(loading ? uploadingText : reselectText)}
              </Button.Link>
            </div>
            {error && <p className="text-xs text-red-700">{error.message}</p>}
          </div>
        </div>
      ) : (
        <div
          className={clsx(
            'flex justify-center w-full h-full px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md cursor-pointer',
            {
              'border-emerald-500': dragging
            }
          )}
          ref={setDragRef}
          onDrop={handleDrop}
          onDragOver={handleDrop}
          onDragEnter={handleDrop}
          onDragLeave={handleDrop}
          onClick={handleOpen}
        >
          <div className="flex flex-col justify-center space-y-1 text-center">
            <IconUpload className="mx-auto h-12 w-12 text-slate-400 non-scaling-stroke" />
            <div className="flex items-center justify-center text-sm text-slate-500">
              <span className="font-medium text-emerald-500">{t(selectText)}</span>
              <span className="pl-1">{t('common.drag')}</span>
            </div>
            {error || internalError ? (
              <p className="text-xs text-red-700">{error?.message || internalError?.message}</p>
            ) : (
              <p className="text-xs text-slate-500">{t('common.sizeLimit', { maxSize })}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export const FileUploader: FC<FileUploaderProps> = ({ value, onChange, ...restProps }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>()

  async function handleChange(file: File) {
    if (loading) {
      return
    }

    setError(null)
    setLoading(true)

    try {
      const { downloadURL } = await UploadService.upload(file)

      onChange?.(downloadURL)
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return <DragUploader {...restProps} error={error} loading={loading} onChange={handleChange} />
}
