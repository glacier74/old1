import { FC } from 'react'

import { Rating } from '~/components'
import { useOptions } from '~/layout/builder3/context'

interface RatingSubOptionProps {
  title: string
  path: string
}

export const RatingSubOption: FC<RatingSubOptionProps> = ({ title, path }) => {
  const { value, update } = useOptions<number>(path)

  function handleChange(newValue: number) {
    update(newValue)
  }

  return (
    <div className="builder-option">
      <div className="builder-option__title">{title}</div>
      <div className="builder-option__content">
        <Rating value={value} onChange={handleChange} />
      </div>
    </div>
  )
}
