import { FC } from 'react'

import { ImageItem } from './ImageItem'
import gradients from './gradients.json'

export const Gradient: FC<{ onChange?: (src: string, color?: string) => void }> = ({
  onChange
}) => {
  return (
    <div className="p-5">
      <div className="grid grid-cols-3 gap-5">
        {(gradients.results as unknown as GradientImage[]).map((row, index) => (
          <ImageItem key={index} image={row} onClick={onChange} />
        ))}
      </div>
    </div>
  )
}
