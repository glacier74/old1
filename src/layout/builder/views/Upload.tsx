import { IconUpload } from '@tabler/icons'
import { FC } from 'react'

interface UploadButtonProps {
  description1: string
  description2: string
  onClick: () => void
}

export const Upload: FC<UploadButtonProps> = ({ description1, description2, onClick }) => {
  return (
    <button className="block-upload" onClick={onClick}>
      <div className="flex flex-col justify-center w-full h-full space-y-1 text-center">
        <IconUpload className="mx-auto h-12 w-12 text-slate-400 non-scaling-stroke" />
        <p className="text-base text-slate-400">{description1}</p>
        <p className="text-base text-slate-400">{description2}</p>
      </div>
    </button>
  )
}
