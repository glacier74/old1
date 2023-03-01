import { Menus, Tabs, stopPropagation } from '@heyforms/ui'
import { IconVideo } from '@tabler/icons'
import { FC, useState } from 'react'

import { Embed } from '~/components/Embed'
import { FileUploader } from '~/components/FileUploader'

interface MediaPickerProps {
  allowed?: string[]
  onChange?: (type: string, value: string) => void
}

export const MediaPicker: FC<MediaPickerProps> = ({ allowed = ['image', 'video'], onChange }) => {
  const [activeName, setActiveName] = useState('image')

  function handleChange(value: string) {
    onChange?.(activeName, value)
  }

  function handleActiveNameChange(activeName: any) {
    setActiveName(activeName)
  }

  return (
    <Menus className="media-picker">
      <div onClick={stopPropagation}>
        <Tabs defaultActiveName={activeName} onChange={handleActiveNameChange}>
          {allowed.includes('image') && (
            <Tabs.Pane name="image" title="Image">
              <div className="file-uploader">
                <FileUploader
                  className="w-full h-full"
                  namespace=""
                  accept={['image/jpeg', 'image/png', 'image/bmp']}
                  onChange={handleChange}
                />
              </div>
            </Tabs.Pane>
          )}

          {allowed.includes('video') && (
            <Tabs.Pane name="video" title="Video">
              <div className="pt-20">
                <div className="mb-4">
                  <IconVideo className="mx-auto h-12 w-12 text-slate-400 non-scaling-stroke" />
                  <div className="mt-1 text-sm text-slate-600 text-center">
                    Works with YouTube, Vimeo, and more
                  </div>
                </div>

                <Embed
                  submitText="Embed"
                  placeholder="Paste the video link..."
                  onChange={handleChange}
                />
              </div>
            </Tabs.Pane>
          )}
        </Tabs>
      </div>
    </Menus>
  )
}
