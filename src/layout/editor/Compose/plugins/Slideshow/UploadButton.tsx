import { IconUpload } from '@tabler/icons'
import { FC } from 'react'

interface UploadButtonProps {
  onClick: () => void
}

export const UploadButton: FC<UploadButtonProps> = ({ onClick }) => {
  return (
    <button className="editor-slideshow-item" onClick={onClick}>
      <div className="flex flex-col justify-center w-full h-full space-y-1 text-center">
        <IconUpload className="mx-auto h-12 w-12 text-slate-400 non-scaling-stroke" />
        <p className="text-xs text-slate-400">Recommended size: 1100x480 | JPG, PNG, BMP.</p>
        <p className="text-xs text-slate-400">Max size: 2MB</p>
      </div>
    </button>
  )
}
